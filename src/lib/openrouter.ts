const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are an expert automotive insurance assessor.

Analyze the uploaded accident vehicle images and provide a detailed assessment.

**Step 1 - Identify the vehicle from the images:**
- Make (e.g. Toyota, Nissan)
- Model (e.g. Hilux, Corolla)
- Variant (e.g. SR5, GX)
- Estimated Year (e.g. "2022")
- Body Type (e.g. "SUV", "Sedan", "Pickup", "Hatchback")
- Color
- Registration plate (if visible)

**Step 2 - Identify ALL damaged parts with details:**
For each damaged part provide:
- partName: specific name (e.g. "Front Bumper Assembly", "Left Headlight")
- damageType: one of "Scratch", "Dent", "Crack", "Broken", "Misaligned", "Crushed", "Torn", "Scraped"
- damageSeverity: one of "Minor", "Moderate", "Severe", "Critical"
- estimatedQuantity: number of units needed (always a number, default 1)
- estimatedLaborHours: hours of labor needed
- pricing_options: array of 2-4 pricing options from different Kenyan auto parts suppliers. Use your knowledge of the Kenyan auto parts market to suggest realistic KES prices from known suppliers (e.g. Toyota Kenya, Ng Auto Spares, AutoKenya, Car & General, Galaxy Auto, Avenge Auto, etc.). Each option should have:
  - supplier: supplier name
  - price: estimated price in KES (Kenyan Shillings)

**Step 3 - Overall assessment:**
- Overall damage severity
- Summary of findings
- Whether structural damage is present
- Whether the vehicle may have rolled over
- Whether this is a possible total loss
- List of structural concerns
- List of recommendations
- Estimated total repair cost (USD)
- Estimated total labor hours

Always return ONLY valid JSON matching this exact structure. Do not use markdown. Do not wrap in code blocks.

{
  "vehicle": {
    "make": "",
    "model": "",
    "variant": "",
    "year": "",
    "body_type": "",
    "color": "",
    "registration": "",
    "confidence": 0
  },
  "damage": {
    "severity": "",
    "summary": "",
    "structural_damage": false,
    "rollover": false,
    "possible_total_loss": false,
    "estimated_total_cost": 0,
    "estimated_total_labor_hours": 0
  },
  "replacement_parts": [
    {
      "partName": "",
      "damageType": "",
      "damageSeverity": "",
      "estimatedQuantity": 1,
      "estimatedLaborHours": 0,
      "pricing_options": [
        { "supplier": "", "price": 0 }
      ]
    }
  ],
  "structural_concerns": [],
  "recommendations": []
}`;

export interface AIAnalysisResult {
  vehicle: {
    make: string;
    model: string;
    variant: string;
    year: string;
    body_type: string;
    color: string;
    registration: string;
    confidence: number;
  };
  damage: {
    severity: string;
    summary: string;
    structural_damage: boolean;
    rollover: boolean;
    possible_total_loss: boolean;
    estimated_total_cost: number;
    estimated_total_labor_hours: number;
  };
  replacement_parts: {
    partName: string;
    damageType: string;
    damageSeverity: string;
    estimatedQuantity: number;
    estimatedLaborHours: number;
    pricing_options: {
      supplier: string;
      price: number;
    }[];
  }[];
  structural_concerns: string[];
  recommendations: string[];
}

export async function analyzeImages(
  imageBase64Strings: string[]
): Promise<AIAnalysisResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const content: Array<
    | { type: "text"; text: string }
    | { type: "image_url"; image_url: { url: string } }
  > = [
    {
      type: "text",
      text: "Analyze these accident vehicle images. Identify the vehicle details and all damage visible. Return ONLY the JSON response as specified.",
    },
  ];

  for (const base64 of imageBase64Strings) {
    content.push({
      type: "image_url",
      image_url: { url: `data:image/jpeg;base64,${base64}` },
    });
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
      "X-Title": "Vehicle Accident Analyzer",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content },
      ],
      max_tokens: 8192,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errorBody}`);
  }

  const data = await response.json();
  const rawContent = data.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error("No content returned from AI analysis");
  }

  const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("AI response did not contain valid JSON");
  }

  let jsonStr = jsonMatch[0];

  // Try parsing as-is first
  try {
    const result: AIAnalysisResult = JSON.parse(jsonStr);
    ensurePricingOptions(result);
    return result;
  } catch {
    // Fix common JSON issues from LLMs
    jsonStr = jsonStr
      .replace(/,\s*([\]}])/g, "$1")       // trailing commas
      .replace(/\n/g, " ")                   // newlines inside strings
      .replace(/:\s*""(\s*[,}\]])/g, ': ""$1'); // malformed empty strings
    const result: AIAnalysisResult = JSON.parse(jsonStr);
    ensurePricingOptions(result);
    return result;
  }
}

const KENYAN_SUPPLIERS = ["Toyota Kenya", "Ng Auto Spares", "Car & General", "Galaxy Auto", "Avenge Auto", "AutoKenya"];

function estimatePartPrice(partName: string): number {
  const lower = partName.toLowerCase();
  if (lower.includes("bumper")) return 25000;
  if (lower.includes("headlight") || lower.includes("head lamp")) return 18000;
  if (lower.includes("taillight") || lower.includes("tail lamp")) return 12000;
  if (lower.includes("fender")) return 15000;
  if (lower.includes("hood") || lower.includes("bonnet")) return 20000;
  if (lower.includes("grille") || lower.includes("grill")) return 10000;
  if (lower.includes("mirror")) return 8000;
  if (lower.includes("windshield") || lower.includes("windscreen")) return 30000;
  if (lower.includes("door")) return 22000;
  if (lower.includes("quarter panel")) return 18000;
  if (lower.includes("roof")) return 25000;
  if (lower.includes("splash") || lower.includes("liner")) return 5000;
  if (lower.includes("bracket")) return 4000;
  if (lower.includes("sensor")) return 15000;
  if (lower.includes("airbag")) return 35000;
  if (lower.includes("radiator")) return 15000;
  if (lower.includes("condenser")) return 12000;
  if (lower.includes("steering")) return 20000;
  if (lower.includes("suspension") || lower.includes("strut")) return 18000;
  if (lower.includes("exhaust")) return 15000;
  return 12000;
}

function ensurePricingOptions(result: AIAnalysisResult) {
  if (!result.replacement_parts?.length) return;

  for (const part of result.replacement_parts) {
    if (!part.pricing_options || !part.pricing_options.length) {
      const basePrice = estimatePartPrice(part.partName);
      const variance = [0.7, 0.85, 1.0, 1.15];
      part.pricing_options = KENYAN_SUPPLIERS.slice(0, 4).map((supplier, i) => ({
        supplier,
        price: Math.round(basePrice * variance[i]),
      }));
    }
  }
}
