"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  X,
  Camera,
  BarChart3,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  User,
  Car,
  Pencil,
  Download,
  Package,
} from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { Navbar } from "@/components/navbar";
import { toast } from "sonner";
import { CURRENCY, formatCurrency } from "@/lib/currency";

interface DetectedPart {
  partName: string;
  damageType: string;
  damageSeverity: string;
  estimatedQuantity: number;
  estimatedLaborHours: number;
  pricing_options: { supplier: string; price: number }[];
}

interface VehicleInfo {
  make: string;
  model: string;
  variant: string;
  year: string;
  body_type: string;
  color: string;
  registration: string;
  confidence: number;
}

interface DamageInfo {
  severity: string;
  summary: string;
  structural_damage: boolean;
  rollover: boolean;
  possible_total_loss: boolean;
  estimated_total_cost: number;
  estimated_total_labor_hours: number;
}

interface AnalysisResult {
  vehicle: VehicleInfo;
  damage: DamageInfo;
  replacement_parts: DetectedPart[];
  structural_concerns: string[];
  recommendations: string[];
}

interface CataloguePart {
  partName: string;
  found: boolean;
  vehiclePartId: string;
  partNumber: string;
  unitPrice: number;
  labourCost: number;
  subtotal: number;
  category: string;
  catalogueMake: string | null;
  catalogueModel: string | null;
  catalogueVariant: string | null;
}

type Step = "details" | "upload" | "analyze" | "confirm" | "results";

const STEP_PARAM: Record<Step, string> = {
  details: "details",
  upload: "upload",
  analyze: "analyzing",
  confirm: "confirm",
  results: "results",
};

const PARAM_TO_STEP: Record<string, Step> = {
  details: "details",
  upload: "upload",
  analyzing: "analyze",
  confirm: "confirm",
  results: "results",
};

export default function AnalyzeWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useSession();

  const initialStep = PARAM_TO_STEP[searchParams.get("step") || ""] || "details";
  const [step, setStepInternal] = useState<Step>(initialStep);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [catalogueParts, setCatalogueParts] = useState<CataloguePart[]>([]);
  const [catalogueLoading, setCatalogueLoading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [assessmentId, setAssessmentId] = useState<string | null>(searchParams.get("id") || null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [loadingAssessment, setLoadingAssessment] = useState(false);

  const [editableParts, setEditableParts] = useState<Array<{
    partName: string;
    damageType: string;
    damageSeverity: string;
    quantity: number;
    unitPrice: number;
    labourCost: number;
    selectedSupplier: string;
  }>>([]);

  const [supplierPrices, setSupplierPrices] = useState<Record<string, { supplier: string; price: number; supplierPriceId: string }[]>>({});

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [confirmedVehicle, setConfirmedVehicle] = useState<VehicleInfo>({
    make: "", model: "", variant: "", year: "", body_type: "", color: "", registration: "", confidence: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const setStep = useCallback(
    (s: Step, id?: string | null) => {
      setStepInternal(s);
      const params = new URLSearchParams({ step: STEP_PARAM[s] });
      const idParam = id ?? assessmentId;
      if (idParam) params.set("id", idParam);
      router.replace(`/analyze?${params.toString()}`, { scroll: false });
    },
    [router, assessmentId]
  );

  // Load assessment on direct URL access (e.g. /analyze?step=confirm&id=xxx)
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    const id = searchParams.get("id");
    if (id) {
      loadAssessment(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const urlStep = PARAM_TO_STEP[searchParams.get("step") || ""];
    if (urlStep && urlStep !== step) {
      setStepInternal(urlStep);
    }
    const urlId = searchParams.get("id");
    if (urlId && urlId !== assessmentId) {
      setAssessmentId(urlId);
      loadAssessment(urlId);
    }
  }, [searchParams]);

  const loadAssessment = async (id: string) => {
    setLoadingAssessment(true);
    try {
      const res = await fetch(`/api/assessments/${id}`);
      if (!res.ok) return;
      const a = await res.json();

      setCustomerInfo({
        fullName: a.customerName || "",
        phone: a.customerPhone || "",
        email: a.customerEmail || "",
        address: "",
      });

      if (a.registrationNumber || a.vehicleNotes) {
        const vJson = a.verifiedVehicleJson ? JSON.parse(a.verifiedVehicleJson) : {};
        setConfirmedVehicle({
          make: vJson.make || a.vehicleNotes?.split(" ")[0] || "",
          model: vJson.model || a.vehicleNotes?.split(" ")[1] || "",
          variant: vJson.variant || "",
          year: vJson.year || "",
          body_type: vJson.body_type || "",
          color: vJson.color || "",
          registration: vJson.registration || a.registrationNumber || "",
          confidence: vJson.confidence || 0,
        });
      }

      if (a.aiRawResponse) {
        const raw = typeof a.aiRawResponse === "string" ? JSON.parse(a.aiRawResponse) : a.aiRawResponse;
        const aiResult: AnalysisResult = {
          vehicle: raw.vehicle || {},
          damage: raw.damage || { severity: "Unknown", summary: "", structural_damage: false, rollover: false, possible_total_loss: false, estimated_total_cost: 0, estimated_total_labor_hours: 0 },
          replacement_parts: raw.replacement_parts || [],
          structural_concerns: raw.structural_concerns || [],
          recommendations: raw.recommendations || [],
        };
        setResult(aiResult);

        const vJson = a.verifiedVehicleJson ? JSON.parse(a.verifiedVehicleJson) : {};
        const vehicleMake = vJson.make || confirmedVehicle.make;
        const vehicleModel = vJson.model || confirmedVehicle.model;

        const parts = (a.replacementParts || []).length > 0
          ? a.replacementParts
          : (raw.replacement_parts || []).map((p: DetectedPart) => ({
              partName: p.partName,
              quantity: p.estimatedQuantity || 1,
              unitPrice: 0,
              labourCost: 0,
            }));

        if (parts.length) {
          try {
            const pricesRes = await fetch("/api/parts/prices", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                parts: (raw.replacement_parts || []).map((p: DetectedPart) => ({
                  partName: p.partName,
                  vehicleMake: vehicleMake || undefined,
                  vehicleModel: vehicleModel || undefined,
                  pricing_options: p.pricing_options || [],
                })),
              }),
            });
            if (pricesRes.ok) {
              const supplierData = await pricesRes.json();
              setSupplierPrices(supplierData);

              setEditableParts(parts.map((p: { partName: string; quantity?: number; unitPrice?: number; labourCost?: number }) => {
                const sp = supplierData[p.partName] || [];
                const cheapest = sp.length ? sp.reduce((min: { price: number }, cur: { price: number }) => cur.price < min.price ? cur : min) : null;
                return {
                  partName: p.partName,
                  damageType: "Dent",
                  damageSeverity: "Moderate",
                  quantity: p.quantity || 1,
                  unitPrice: cheapest?.price || p.unitPrice || 0,
                  labourCost: p.labourCost || 0,
                  selectedSupplier: cheapest?.supplier || "",
                };
              }));
            }
          } catch {
            setEditableParts(parts.map((p: { partName: string; quantity?: number; unitPrice?: number; labourCost?: number }) => ({
              partName: p.partName,
              damageType: "Dent",
              damageSeverity: "Moderate",
              quantity: p.quantity || 1,
              unitPrice: p.unitPrice || 0,
              labourCost: p.labourCost || 0,
              selectedSupplier: "",
            })));
          }
        }
      }
    } catch {
      // Silent fail
    } finally {
      setLoadingAssessment(false);
    }
  };

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const arr = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...arr]);
    arr.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (e) => setPreviews((prev) => [...prev, e.target?.result as string]);
      reader.readAsDataURL(f);
    });
  }, []);

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  // Part editing functions
  const updateEditablePart = (idx: number, field: string, value: string | number) => {
    setEditableParts((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const selectSupplier = (idx: number, supplierName: string) => {
    setEditableParts((prev) => {
      const updated = [...prev];
      const part = updated[idx];
      const prices = supplierPrices[part.partName] || [];
      const match = prices.find((p) => p.supplier === supplierName);
      updated[idx] = {
        ...part,
        selectedSupplier: supplierName,
        unitPrice: match?.price || 0,
      };
      return updated;
    });
  };

  const removeEditablePart = (idx: number) => {
    setEditableParts((prev) => prev.filter((_, i) => i !== idx));
  };

  const addEditablePart = () => {
    setEditableParts((prev) => [
      ...prev,
      { partName: "", damageType: "Dent", damageSeverity: "Moderate", quantity: 1, unitPrice: 0, labourCost: 0, selectedSupplier: "" },
    ]);
  };

  const handleAnalyze = async () => {
    if (files.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      if (!session?.user) {
        toast.error("Please log in to analyze images");
        router.push(`/login?callbackUrl=${encodeURIComponent("/analyze?step=upload")}`);
        return;
      }
    } catch {
      toast.error("Please log in to analyze images");
      router.push(`/login?callbackUrl=${encodeURIComponent("/analyze?step=upload")}`);
      return;
    }

    setStep("analyze");
    setAnalyzing(true);

    try {
      const imageData = await Promise.all(
        files.map(async (file) => {
          const b64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              const raw = result.includes(",") ? result.split(",")[1] : result;
              resolve(raw);
            };
            reader.readAsDataURL(file);
          });
          return b64;
        })
      );

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: imageData }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Analysis failed");
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
      setConfirmedVehicle(data.vehicle);

      // Auto-save assessment to DB
      let savedId: string | null = null;
      try {
        const saveRes = await fetch("/api/assessments/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: customerInfo,
            vehicle: data.vehicle,
            damage: data.damage,
            parts: (data.replacement_parts || []).map((p) => ({
              partName: p.partName,
              quantity: typeof p.estimatedQuantity === "number" ? p.estimatedQuantity : 1,
              unitPrice: 0,
              labourCost: 0,
              subtotal: 0,
              found: false,
            })),
            structural_concerns: data.structural_concerns,
            recommendations: data.recommendations,
          }),
        });
        if (saveRes.ok) {
          const saved = await saveRes.json();
          savedId = saved.id;
          setAssessmentId(saved.id);
        }
      } catch {
        // Non-blocking — user can still proceed
      }

      setStep("confirm", savedId);
      toast.success("Vehicle detected! Please confirm the details.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Analysis failed";
      toast.error(msg);
      setStep("upload");
    } finally {
      setAnalyzing(false);
    }
  };

  const goToResults = async () => {
    if (result?.replacement_parts?.length) {
      setCatalogueLoading(true);
      try {
        // Save supplier prices to DB
        const pricingParts = result.replacement_parts
          .filter((p) => p.pricing_options?.length)
          .map((p) => ({
            partName: p.partName,
            vehicleMake: result.vehicle.make || undefined,
            vehicleModel: result.vehicle.model || undefined,
            pricing_options: p.pricing_options,
          }));

        let supplierData: Record<string, { supplier: string; price: number; supplierPriceId: string }[]> = {};
        if (pricingParts.length) {
          try {
            const pricesRes = await fetch("/api/parts/prices", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ parts: pricingParts }),
            });
            if (pricesRes.ok) {
              supplierData = await pricesRes.json();
            }
          } catch {
            // Non-blocking — use AI pricing directly
            for (const p of pricingParts) {
              supplierData[p.partName] = p.pricing_options.map((opt, i) => ({
                supplier: opt.supplier,
                price: opt.price,
                supplierPriceId: `ai-${i}`,
              }));
            }
          }
        } else {
          // Use AI pricing directly if no DB save needed
          for (const p of result.replacement_parts) {
            if (p.pricing_options?.length) {
              supplierData[p.partName] = p.pricing_options.map((opt, i) => ({
                supplier: opt.supplier,
                price: opt.price,
                supplierPriceId: `ai-${i}`,
              }));
            }
          }
        }
        setSupplierPrices(supplierData);

        // Fetch catalogue parts
        const res = await fetch("/api/parts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parts: result.replacement_parts.map((p) => ({
              partName: p.partName,
              quantity: typeof p.estimatedQuantity === "number" ? p.estimatedQuantity : 1,
            })),
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setCatalogueParts(data.parts);
          setEditableParts(
            result.replacement_parts.map((p) => {
              const cp = data.parts.find((c: CataloguePart) => c.partName === p.partName);
              const prices = supplierData[p.partName] || [];
              const cheapest = prices.length ? prices.reduce((min, cur) => cur.price < min.price ? cur : min) : null;
              return {
                partName: p.partName,
                damageType: p.damageType || "Dent",
                damageSeverity: p.damageSeverity || "Moderate",
                quantity: typeof p.estimatedQuantity === "number" ? p.estimatedQuantity : 1,
                unitPrice: cheapest?.price || cp?.unitPrice || 0,
                labourCost: cp?.labourCost || 0,
                selectedSupplier: cheapest?.supplier || "",
              };
            })
          );
        } else {
          setEditableParts(
            result.replacement_parts.map((p) => {
              const prices = supplierData[p.partName] || [];
              const cheapest = prices.length ? prices.reduce((min, cur) => cur.price < min.price ? cur : min) : null;
              return {
                partName: p.partName,
                damageType: p.damageType || "Dent",
                damageSeverity: p.damageSeverity || "Moderate",
                quantity: typeof p.estimatedQuantity === "number" ? p.estimatedQuantity : 1,
                unitPrice: cheapest?.price || 0,
                labourCost: 0,
                selectedSupplier: cheapest?.supplier || "",
              };
            })
          );
        }
      } catch {
        setEditableParts(
          result.replacement_parts.map((p) => ({
            partName: p.partName,
            damageType: p.damageType || "Dent",
            damageSeverity: p.damageSeverity || "Moderate",
            quantity: typeof p.estimatedQuantity === "number" ? p.estimatedQuantity : 1,
            unitPrice: 0,
            labourCost: 0,
            selectedSupplier: "",
          }))
        );
      } finally {
        setCatalogueLoading(false);
      }
    }
    setStep("results", assessmentId);

    // Update saved assessment with confirmed vehicle and parts
    if (assessmentId) {
      try {
        await fetch("/api/assessments/save", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: assessmentId,
            vehicle: confirmedVehicle,
            damage: result?.damage,
            parts: editableParts.map((p) => ({
              partName: p.partName,
              quantity: p.quantity,
              unitPrice: p.unitPrice,
              labourCost: p.labourCost,
              subtotal: p.quantity * p.unitPrice,
              found: p.unitPrice > 0,
            })),
            structural_concerns: result?.structural_concerns,
            recommendations: result?.recommendations,
          }),
        });
      } catch {
        // Non-blocking
      }
    }
  };

  const handleDownloadPdf = async () => {
    if (!result) return;
    setDownloadingPdf(true);
    try {
      const res = await fetch("/api/reports/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: customerInfo,
          vehicle: confirmedVehicle,
          damage: result.damage,
          parts: editableParts.map((p) => ({
                partName: p.partName,
                quantity: p.quantity,
                unitPrice: p.unitPrice,
                labourCost: p.labourCost,
                subtotal: p.quantity * p.unitPrice,
                found: p.unitPrice > 0,
                selectedSupplier: p.selectedSupplier || undefined,
              })),
          structural_concerns: result.structural_concerns,
          recommendations: result.recommendations,
          images: previews,
        }),
      });

      if (!res.ok) throw new Error("PDF generation failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vehicle-report-${confirmedVehicle.make}-${confirmedVehicle.model}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to download PDF");
    } finally {
      setDownloadingPdf(false);
    }
  };

  const reset = () => {
    setStepInternal("details");
    router.replace("/analyze?step=details", { scroll: false });
    setFiles([]);
    setPreviews([]);
    setResult(null);
    setCatalogueParts([]);
    setEditableParts([]);
    setSupplierPrices({});
    setCustomerInfo({ fullName: "", phone: "", email: "", address: "" });
    setConfirmedVehicle({ make: "", model: "", variant: "", year: "", body_type: "", color: "", registration: "", confidence: 0 });
    setAssessmentId(null);
  };

  const stepOrder: Step[] = ["details", "upload", "analyze", "confirm", "results"];
  const stepLabels: Record<Step, string> = {
    details: "Your Details", upload: "Upload Photos", analyze: "Analyzing", confirm: "Confirm Vehicle", results: "Results",
  };
  const currentIdx = stepOrder.indexOf(step);

  const partsTotal = editableParts.reduce((sum, p) => sum + (p.quantity * p.unitPrice), 0);
  const labourTotal = editableParts.reduce((sum, p) => sum + p.labourCost, 0);
  const foundCount = editableParts.filter((p) => p.unitPrice > 0).length;
  const notFoundCount = editableParts.filter((p) => p.unitPrice === 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showNewAnalysis={step === "results"} onNewAnalysis={reset} />

      {/* Progress bar — clickable */}
      <div className="bg-white border-b border-gray-100 pt-[72px]">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between text-xs font-medium">
            {stepOrder.map((s, i) => {
              const active = s === step;
              const done = currentIdx > i;
              const clickable = done && s !== "analyze";
              return (
                <button
                  key={s}
                  onClick={() => clickable && setStep(s)}
                  disabled={!clickable}
                  className={`flex items-center gap-2 ${clickable ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition ${
                    active ? "bg-blue-600 text-white" : done ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                  }`}>
                    {done ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`hidden sm:block ${active ? "text-gray-900" : "text-gray-400"}`}>{stepLabels[s]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">

        {loadingAssessment && (
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>
            <h2 className="mt-6 text-xl font-bold">Loading assessment...</h2>
            <p className="mt-2 text-sm text-gray-500">Fetching report data from the database.</p>
          </div>
        )}

        {/* STEP 1: Customer Details */}
        {step === "details" && (
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><User className="w-5 h-5 text-blue-600" /></div>
              <h1 className="text-2xl font-bold tracking-tight">Your Details</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 ml-[52px]">Enter your contact information to get started.</p>
            <div className="mt-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" placeholder="e.g. John Smith" value={customerInfo.fullName} onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input type="tel" placeholder="e.g. 0412 345 678" value={customerInfo.phone} onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" placeholder="e.g. john@email.com" value={customerInfo.email} onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" placeholder="e.g. 123 Main St, Sydney NSW" value={customerInfo.address} onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
              <div className="pt-4 flex justify-end">
                <button onClick={() => {
                  if (!customerInfo.fullName.trim() || !customerInfo.phone.trim()) { toast.error("Please enter your name and phone number"); return; }
                  setStep("upload");
                }} className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Upload Photos */}
        {step === "upload" && (
          <div className="max-w-lg mx-auto">
            <button onClick={() => setStep("details")} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"><ChevronLeft className="w-4 h-4" /> Back</button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Camera className="w-5 h-5 text-blue-600" /></div>
              <h1 className="text-2xl font-bold tracking-tight">Upload Photos</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 ml-[52px]">Upload clear photos of the damaged vehicle. Our AI will detect the vehicle and assess the damage.</p>
            <div className="mt-8 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-300 hover:bg-blue-50/30 transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}>
              <Camera className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="mt-3 text-sm font-medium text-gray-600">Click to upload or drag and drop</p>
              <p className="mt-1 text-xs text-gray-400">PNG, JPG up to 10MB each</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
            {previews.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removeFile(i)} className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep("details")} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Back</button>
              <button onClick={handleAnalyze} disabled={files.length === 0}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25 disabled:opacity-40 disabled:cursor-not-allowed">
                <BarChart3 className="w-4 h-4" /> Analyze Vehicle
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Analyzing */}
        {step === "analyze" && (
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>
            <h2 className="mt-6 text-xl font-bold">Analyzing vehicle...</h2>
            <p className="mt-2 text-sm text-gray-500">Our AI is scanning {files.length} image{files.length !== 1 ? "s" : ""} to detect the vehicle and assess damage.</p>
            <p className="mt-1 text-xs text-gray-400">This usually takes 5-15 seconds.</p>
          </div>
        )}

        {/* STEP 4: Confirm Vehicle */}
        {step === "confirm" && result && (
          <div className="max-w-lg mx-auto">
            <button onClick={() => setStep("upload")} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"><ChevronLeft className="w-4 h-4" /> Back</button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Car className="w-5 h-5 text-blue-600" /></div>
              <h1 className="text-2xl font-bold tracking-tight">Confirm Vehicle</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 ml-[52px]">Our AI detected the following vehicle. Please review and correct if needed.</p>
            {confirmedVehicle.confidence > 0 && (
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-medium">{confirmedVehicle.confidence}% confidence</span>
                <span>AI detection confidence</span>
              </div>
            )}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Make</label>
                  <input type="text" value={confirmedVehicle.make} onChange={(e) => setConfirmedVehicle({ ...confirmedVehicle, make: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Model</label>
                  <input type="text" value={confirmedVehicle.model} onChange={(e) => setConfirmedVehicle({ ...confirmedVehicle, model: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Variant</label>
                  <input type="text" value={confirmedVehicle.variant} onChange={(e) => setConfirmedVehicle({ ...confirmedVehicle, variant: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Year</label>
                  <input type="text" value={confirmedVehicle.year} onChange={(e) => setConfirmedVehicle({ ...confirmedVehicle, year: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Body Type</label>
                  <input type="text" value={confirmedVehicle.body_type} onChange={(e) => setConfirmedVehicle({ ...confirmedVehicle, body_type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Color</label>
                  <input type="text" value={confirmedVehicle.color} onChange={(e) => setConfirmedVehicle({ ...confirmedVehicle, color: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Registration</label>
                  <input type="text" value={confirmedVehicle.registration} onChange={(e) => setConfirmedVehicle({ ...confirmedVehicle, registration: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400"><Pencil className="w-3.5 h-3.5" /> Edit any field to correct the AI detection</div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep("upload")} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Back</button>
              <button onClick={goToResults}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25">
                Confirm & View Results <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Results */}
        {step === "results" && result && (
          <div>
            <button onClick={reset} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"><ArrowLeft className="w-4 h-4" /> New Analysis</button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Analysis Results</h1>
                <p className="mt-1 text-sm text-gray-500">{customerInfo.fullName} &middot; {confirmedVehicle.year} {confirmedVehicle.make} {confirmedVehicle.model} {confirmedVehicle.variant}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  result.damage.severity === "Severe" || result.damage.severity === "Critical" ? "bg-red-50 text-red-700"
                    : result.damage.severity === "Moderate" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"
                }`}>
                  <AlertCircle className="w-3.5 h-3.5" /> {result.damage.severity} Damage
                </span>
                <button onClick={handleDownloadPdf} disabled={downloadingPdf}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition disabled:opacity-50">
                  {downloadingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Download PDF
                </button>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-3">Customer</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-400">Name:</span> <span className="font-medium text-gray-900 ml-1">{customerInfo.fullName}</span></div>
                <div><span className="text-gray-400">Phone:</span> <span className="font-medium text-gray-900 ml-1">{customerInfo.phone}</span></div>
                {customerInfo.email && <div><span className="text-gray-400">Email:</span> <span className="font-medium text-gray-900 ml-1">{customerInfo.email}</span></div>}
                {customerInfo.address && <div><span className="text-gray-400">Address:</span> <span className="font-medium text-gray-900 ml-1">{customerInfo.address}</span></div>}
              </div>
            </div>

            {/* Vehicle Details + Photos */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-3">Vehicle Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                {confirmedVehicle.make && <div><span className="text-gray-400">Make:</span> <span className="font-medium text-gray-900 ml-1">{confirmedVehicle.make}</span></div>}
                {confirmedVehicle.model && <div><span className="text-gray-400">Model:</span> <span className="font-medium text-gray-900 ml-1">{confirmedVehicle.model}</span></div>}
                {confirmedVehicle.variant && <div><span className="text-gray-400">Variant:</span> <span className="font-medium text-gray-900 ml-1">{confirmedVehicle.variant}</span></div>}
                {confirmedVehicle.year && <div><span className="text-gray-400">Year:</span> <span className="font-medium text-gray-900 ml-1">{confirmedVehicle.year}</span></div>}
                {confirmedVehicle.body_type && <div><span className="text-gray-400">Body Type:</span> <span className="font-medium text-gray-900 ml-1">{confirmedVehicle.body_type}</span></div>}
                {confirmedVehicle.color && <div><span className="text-gray-400">Color:</span> <span className="font-medium text-gray-900 ml-1">{confirmedVehicle.color}</span></div>}
                {confirmedVehicle.registration && <div><span className="text-gray-400">Registration:</span> <span className="font-medium text-gray-900 ml-1">{confirmedVehicle.registration}</span></div>}
                <div><span className="text-gray-400">AI Confidence:</span> <span className="font-medium text-gray-900 ml-1">{Math.round(confirmedVehicle.confidence * 100)}%</span></div>
              </div>

              {previews.length > 0 && (
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Uploaded Photos ({previews.length})</h3>
                  <div className="flex flex-wrap gap-3">
                    {previews.map((src, i) => (
                      <button key={i} onClick={() => setLightboxImage(src)}
                        className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 hover:shadow-md transition group">
                        <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition text-white text-xs font-medium opacity-0 group-hover:opacity-100">#{i + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900">Summary</h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{result.damage.summary}</p>
              {/*<div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-medium">Vehicle</p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-900">{confirmedVehicle.make} {confirmedVehicle.model}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-medium">Est. Labor</p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-900">{result.damage.estimated_total_labor_hours} hrs</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-medium">Est. Cost</p>
                   <p className="mt-0.5 text-sm font-semibold text-gray-900">{formatCurrency(result.damage.estimated_total_cost)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-medium">Total Loss</p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-900">{result.damage.possible_total_loss ? "Yes" : "No"}</p>
                </div>
              </div>*/}
            </div>

            {/* Parts with Cost Breakdown — Editable */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  Parts & Cost ({editableParts.length})
                </h2>
                <div className="flex items-center gap-2">
                  {catalogueLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                  <button onClick={addEditablePart}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                    + Add Part
                  </button>
                </div>
              </div>

              {editableParts.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <Package className="w-8 h-8 text-gray-300 mx-auto" />
                  <p className="mt-2 text-sm text-gray-400">No parts detected. Click &quot;Add Part&quot; to add one.</p>
                </div>
              )}

              {editableParts.length > 0 && (
                <>
                  {/* Desktop table */}
                  <div className="hidden sm:block">
                  <div className="px-6 py-2 bg-gray-50 grid grid-cols-[3fr_2fr_2fr_1fr_2fr_2fr_1fr_1fr_auto] gap-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    <div>Part Name</div>
                    <div>Type</div>
                    <div>Severity</div>
                    <div className="text-center">Qty</div>
                    <div>Supplier</div>
                    <div className="text-right">Unit Price</div>
                    <div className="text-right">Labour</div>
                    <div className="text-right">Subtotal</div>
                    <div className="w-8"></div>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {editableParts.map((part, i) => (
                        <div key={i} className="px-6 py-2 grid grid-cols-[3fr_2fr_2fr_1fr_2fr_2fr_1fr_1fr_auto] gap-1 items-center text-sm">
                          <div>
                            <input type="text" value={part.partName} onChange={(e) => updateEditablePart(i, "partName", e.target.value)}
                              className="w-full px-2 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-400 transition bg-white" placeholder="Part name" />
                          </div>
                          <div>
                            <select value={part.damageType} onChange={(e) => updateEditablePart(i, "damageType", e.target.value)}
                              className="w-full px-2 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-400 transition bg-white">
                              {["Scratch", "Dent", "Crack", "Broken", "Misaligned", "Crushed", "Torn", "Scraped"].map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          <div>
                            <select value={part.damageSeverity} onChange={(e) => updateEditablePart(i, "damageSeverity", e.target.value)}
                              className="w-full px-2 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-400 transition bg-white">
                              {["Minor", "Moderate", "Severe", "Critical"].map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                          <div>
                            <input type="number" min="1" value={part.quantity} onChange={(e) => updateEditablePart(i, "quantity", Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-full px-2 py-1.5 rounded border border-gray-200 text-xs text-center focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-400 transition bg-white" />
                          </div>
                          <div>
                            {supplierPrices[part.partName]?.length ? (
                              <select value={part.selectedSupplier} onChange={(e) => selectSupplier(i, e.target.value)}
                                className="w-full px-2 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-400 transition bg-white">
                                <option value="">Select supplier</option>
                                {supplierPrices[part.partName].map((sp) => (
                                  <option key={sp.supplier} value={sp.supplier}>{sp.supplier} ({CURRENCY} {sp.price.toLocaleString()})</option>
                                ))}
                              </select>
                            ) : (
                              <span className="text-xs text-gray-400 italic">No suppliers found</span>
                            )}
                          </div>
                          <div>
                            <input type="number" min="0" step="0.01" value={part.unitPrice || ""} onChange={(e) => updateEditablePart(i, "unitPrice", parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1.5 rounded border border-gray-200 text-xs text-right focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-400 transition bg-white" placeholder="0.00" />
                          </div>
                          <div>
                            <input type="number" min="0" step="0.01" value={part.labourCost || ""} onChange={(e) => updateEditablePart(i, "labourCost", parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1.5 rounded border border-gray-200 text-xs text-right focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-400 transition bg-white" placeholder="0" />
                          </div>
                          <div className="text-right text-xs font-medium text-gray-900">
                            {part.quantity * part.unitPrice > 0 ? `${CURRENCY} ${(part.quantity * part.unitPrice).toLocaleString()}` : <span className="text-gray-300">&mdash;</span>}
                          </div>
                          <div className="text-center w-8">
                            <button onClick={() => removeEditablePart(i)}
                              className="p-1 text-gray-300 hover:text-red-500 transition rounded hover:bg-red-50">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile cards */}
                  <div className="sm:hidden divide-y divide-gray-50">
                    {editableParts.map((part, i) => (
                      <div key={i} className="px-4 py-3 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input type="text" value={part.partName} onChange={(e) => updateEditablePart(i, "partName", e.target.value)}
                            className="flex-1 px-2 py-1.5 rounded border border-gray-200 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-400 transition bg-white" placeholder="Part name" />
                          <button onClick={() => removeEditablePart(i)} className="p-1 text-gray-300 hover:text-red-500 transition"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <select value={part.damageType} onChange={(e) => updateEditablePart(i, "damageType", e.target.value)}
                            className="px-2 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition bg-white">
                            {["Scratch", "Dent", "Crack", "Broken", "Misaligned", "Crushed", "Torn", "Scraped"].map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <select value={part.damageSeverity} onChange={(e) => updateEditablePart(i, "damageSeverity", e.target.value)}
                            className="px-2 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition bg-white">
                            {["Minor", "Moderate", "Severe", "Critical"].map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <input type="number" min="1" value={part.quantity} onChange={(e) => updateEditablePart(i, "quantity", Math.max(1, parseInt(e.target.value) || 1))}
                            className="px-2 py-1.5 rounded border border-gray-200 text-xs text-center focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition bg-white" placeholder="Qty" />
                        </div>
                        {supplierPrices[part.partName]?.length ? (
                          <div>
                            <label className="text-[10px] text-gray-400">Supplier</label>
                            <select value={part.selectedSupplier} onChange={(e) => selectSupplier(i, e.target.value)}
                              className="w-full px-2 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition bg-white">
                              <option value="">Select supplier</option>
                              {supplierPrices[part.partName].map((sp) => (
                                <option key={sp.supplier} value={sp.supplier}>{sp.supplier} ({CURRENCY} {sp.price.toLocaleString()})</option>
                              ))}
                            </select>
                          </div>
                        ) : null}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-gray-400">Unit Price</label>
                            <input type="number" min="0" step="0.01" value={part.unitPrice || ""} onChange={(e) => updateEditablePart(i, "unitPrice", parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition bg-white" placeholder="0.00" />
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-400">Labour</label>
                            <input type="number" min="0" step="0.01" value={part.labourCost || ""} onChange={(e) => updateEditablePart(i, "labourCost", parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition bg-white" placeholder="0" />
                          </div>
                        </div>
                        <div className="text-right text-xs font-medium text-gray-900">
                          Subtotal: {part.quantity * part.unitPrice > 0 ? `${CURRENCY} ${(part.quantity * part.unitPrice).toLocaleString()}` : <span className="text-gray-300 font-normal">—</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-end flex-col items-end space-y-1">
                      {foundCount > 0 && (
                        <span className="text-xs text-gray-500">{foundCount} part{foundCount !== 1 ? "s" : ""} with pricing</span>
                      )}
                      {notFoundCount > 0 && (
                        <span className="text-xs text-amber-500">{notFoundCount} part{notFoundCount !== 1 ? "s" : ""} without pricing</span>
                      )}
                      <div className="w-48 border-t border-gray-200 pt-2 mt-1" />
                      {partsTotal > 0 && (
                        <div className="flex justify-between w-48 text-sm">
                          <span className="text-gray-500">Parts Total</span>
                          <span className="font-medium text-gray-900">{CURRENCY} {partsTotal.toLocaleString()}</span>
                        </div>
                      )}
                      {labourTotal > 0 && (
                        <div className="flex justify-between w-48 text-sm">
                          <span className="text-gray-500">Labour Total</span>
                          <span className="font-medium text-gray-900">{CURRENCY} {labourTotal.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between w-48 text-base font-bold pt-1">
                        <span className="text-gray-900">Grand Total</span>
                        <span className="text-gray-900">{CURRENCY} {(partsTotal + labourTotal).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Structural Concerns */}
            {result.structural_concerns?.length > 0 && (
              <div className="mt-6 bg-amber-50 rounded-2xl border border-amber-100 p-6">
                <h2 className="font-semibold text-amber-800 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Structural Concerns</h2>
                <ul className="mt-3 space-y-1.5">
                  {result.structural_concerns.map((c, i) => (
                    <li key={i} className="text-sm text-amber-700 flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {result.recommendations?.length > 0 && (
              <div className="mt-6 bg-blue-50 rounded-2xl border border-blue-100 p-6">
                <h2 className="font-semibold text-blue-800 flex items-center gap-2"><FileText className="w-4 h-4" /> Recommendations</h2>
                <ul className="mt-3 space-y-1.5">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-sm text-blue-700 flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Notice */}
            <div className="mt-8 bg-gray-100 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-500 leading-relaxed">
                This analysis is AI-generated and should be treated as an estimate only. Results may not be 100% accurate. Please verify all findings with a qualified professional before making any decisions.
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button onClick={handleDownloadPdf} disabled={downloadingPdf}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition disabled:opacity-50">
                {downloadingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Download PDF Report
              </button>
              <button onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25">
                <Camera className="w-4 h-4" /> Analyze Another
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setLightboxImage(null)}>
          <button onClick={() => setLightboxImage(null)} className="absolute top-4 right-4 text-white/80 hover:text-white transition">
            <X className="w-8 h-8" />
          </button>
          <img src={lightboxImage} alt="Enlarged view" className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
