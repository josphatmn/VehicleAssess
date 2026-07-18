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
  Plus,
  Trash2,
  CreditCard,
} from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { Navbar } from "@/components/navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { CURRENCY, formatCurrency } from "@/lib/currency";
import { uploadImages as supabaseUpload, deleteImage as supabaseDelete } from "@/lib/supabase";

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

type Step = "details" | "upload" | "analyze" | "confirm" | "payment" | "results";

const STEP_PARAM: Record<Step, string> = {
  details: "details",
  upload: "upload",
  analyze: "analyzing",
  confirm: "confirm",
  payment: "payment",
  results: "results",
};

const PARAM_TO_STEP: Record<string, Step> = {
  details: "details",
  upload: "upload",
  analyzing: "analyze",
  confirm: "confirm",
  payment: "payment",
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

  const [paymentAmount, setPaymentAmount] = useState<number>(500);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(true);

  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [structuralModalOpen, setStructuralModalOpen] = useState(false);
  const [recommendationsModalOpen, setRecommendationsModalOpen] = useState(false);

  const [customerForm, setCustomerForm] = useState({ fullName: "", phone: "", email: "", address: "" });
  const [vehicleForm, setVehicleForm] = useState<VehicleInfo>({ make: "", model: "", variant: "", year: "", body_type: "", color: "", registration: "", confidence: 0 });
  const [summaryForm, setSummaryForm] = useState({ summary: "", severity: "", structural_damage: false, rollover: false, possible_total_loss: false, estimated_total_cost: 0, estimated_total_labor_hours: 0 });
  const [structuralForm, setStructuralForm] = useState<string[]>([]);
  const [recommendationsForm, setRecommendationsForm] = useState<string[]>([]);
  const [savingModal, setSavingModal] = useState(false);
  const [savingParts, setSavingParts] = useState(false);

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
  const vehiclePhotoInputRef = useRef<HTMLInputElement>(null);
  const savePartsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const urlStep = searchParams.get("step") || "";
    if (id) {
      loadAssessment(id, urlStep);
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
      loadAssessment(urlId, searchParams.get("step") || "");
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => { if (s.report_price) setPaymentAmount(parseInt(s.report_price, 10)); })
      .catch(() => {})
      .finally(() => setLoadingPrice(false));
  }, []);

  const loadAssessment = async (id: string, requestedStep?: string) => {
    setLoadingAssessment(true);
    try {
      const res = await fetch(`/api/assessments/${id}`);
      if (!res.ok) return;
      const a = await res.json();

      setCustomerInfo({
        fullName: a.customerName || "",
        phone: a.customerPhone || "",
        email: a.customerEmail || "",
        address: a.customerAddress || "",
      });

      if (a.images?.length) {
        setPreviews(a.images.sort((a: { sortOrder: number }, b: { sortOrder: number }) => a.sortOrder - b.sortOrder).map((img: { path: string }) => img.path));
      }

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

        const rawParts = raw.replacement_parts || [];
        const savedParts = a.replacementParts || [];
        const partsForLookup = rawParts.length > 0
          ? rawParts
          : savedParts.map((p: { partName: string; quantity?: number }) => ({
              partName: p.partName,
              estimatedQuantity: p.quantity || 1,
              pricing_options: [],
            }));

        const parts = savedParts.length > 0
          ? savedParts
          : rawParts.map((p: DetectedPart) => ({
              partName: p.partName,
              quantity: p.estimatedQuantity || 1,
              unitPrice: 0,
              labourCost: 0,
            }));

        if (partsForLookup.length) {
          try {
            const pricesRes = await fetch("/api/parts/prices", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                parts: partsForLookup.map((p: { partName: string; estimatedQuantity?: number; pricing_options?: Array<{ supplier: string; price: number }> }) => ({
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
      if (a.paid) setPaid(true);
      if (requestedStep === "results" && !a.paid) {
        setStepInternal("payment");
        router.replace(`/analyze?step=payment&id=${id}`, { scroll: false });
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
    setPreviews((prev) => [...prev, ...arr.map((f) => URL.createObjectURL(f))]);
  }, []);

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[idx]);
      return prev.filter((_, i) => i !== idx);
    });
  };

  // Part editing functions
  const updateEditablePart = (idx: number, field: string, value: string | number) => {
    setEditableParts((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      if (field === "quantity" || field === "unitPrice" || field === "labourCost") {
        autoSaveParts(updated);
      }
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
      autoSaveParts(updated);
      return updated;
    });
  };

  const removeEditablePart = (idx: number) => {
    setEditableParts((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      autoSaveParts(updated);
      return updated;
    });
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
      const sessionRes = await fetch("/api/auth/me");
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

          const imageUrls = await supabaseUpload(files, saved.id);
          setPreviews(imageUrls);

          await fetch("/api/assessments/save", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: saved.id,
              images: imageUrls.map((url, i) => ({
                filename: `photo-${i + 1}`,
                originalName: files[i].name,
                path: url,
                mimeType: files[i].type,
                size: files[i].size,
                sortOrder: i,
              })),
            }),
          });
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

  const handlePayment = async () => {
    if (!assessmentId || !user?.email) return;
    setPaying(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);

      let res: Response;
      try {
        res = await fetch("/api/paystack/initialize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assessmentId, email: user.email }),
          signal: controller.signal,
        });
      } catch {
        throw new Error("Could not reach payment server. Please try again.");
      } finally {
        clearTimeout(timeout);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment init failed");

      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.onload = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = (window as any).PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_08605a5144f1f466bc203fd77282352535cc0699",
          email: user.email,
          amount: data.amount * 100,
          currency: "KES",
          ref: data.reference,
          onClose: () => { setPaying(false); },
          callback: async (response: { reference: string }) => {
            try {
              const verifyRes = await fetch(`/api/paystack/verify?reference=${response.reference}`);
              const verifyData = await verifyRes.json();
              if (verifyData.verified) {
                setPaid(true);
                toast.success("Payment successful!");
                goToResults();
              } else {
                toast.error("Payment verification failed");
              }
            } catch {
              toast.error("Could not verify payment");
            }
            setPaying(false);
          },
        });
        handler.openIframe();
      };
      document.body.appendChild(script);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment failed");
      setPaying(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!result) return;
    setDownloadingPdf(true);
    try {
      await savePartsNow();

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

  const patchAssessment = async (payload: Record<string, unknown>) => {
    if (!assessmentId) return false;
    const res = await fetch("/api/assessments/save", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: assessmentId, ...payload }),
    });
    return res.ok;
  };

  const saveParts = async () => {
    if (!assessmentId) return;
    setSavingParts(true);
    const ok = await patchAssessment({
      parts: editableParts.map((p) => ({
        partName: p.partName,
        quantity: p.quantity,
        unitPrice: p.unitPrice,
        labourCost: p.labourCost,
        subtotal: p.quantity * p.unitPrice,
        found: p.unitPrice > 0,
      })),
    });
    setSavingParts(false);
    toast[ok ? "success" : "error"](ok ? "Parts saved" : "Failed to save parts");
  };

  const autoSaveParts = (parts: typeof editableParts) => {
    if (!assessmentId) return;
    if (savePartsTimerRef.current) clearTimeout(savePartsTimerRef.current);
    savePartsTimerRef.current = setTimeout(async () => {
      await fetch("/api/assessments/save", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: assessmentId,
          parts: parts.map((p) => ({
            partName: p.partName,
            quantity: p.quantity,
            unitPrice: p.unitPrice,
            labourCost: p.labourCost,
            subtotal: p.quantity * p.unitPrice,
            found: p.unitPrice > 0,
          })),
        }),
      });
    }, 800);
  };

  const savePartsNow = async () => {
    if (!assessmentId) return;
    if (savePartsTimerRef.current) clearTimeout(savePartsTimerRef.current);
    await fetch("/api/assessments/save", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: assessmentId,
        parts: editableParts.map((p) => ({
          partName: p.partName,
          quantity: p.quantity,
          unitPrice: p.unitPrice,
          labourCost: p.labourCost,
          subtotal: p.quantity * p.unitPrice,
          found: p.unitPrice > 0,
        })),
      }),
    });
  };

  const openCustomerModal = () => {
    setCustomerForm({ ...customerInfo });
    setCustomerModalOpen(true);
  };

  const saveCustomer = async () => {
    setSavingModal(true);
    const ok = await patchAssessment({ customer: customerForm });
    setSavingModal(false);
    if (ok) {
      setCustomerInfo({ ...customerForm });
      setCustomerModalOpen(false);
      toast.success("Customer info updated");
    } else {
      toast.error("Failed to update customer info");
    }
  };

  const openVehicleModal = () => {
    setVehicleForm({ ...confirmedVehicle });
    setVehicleModalOpen(true);
  };

  const saveVehicle = async () => {
    setSavingModal(true);
    const ok = await patchAssessment({ vehicle: vehicleForm });
    setSavingModal(false);
    if (ok) {
      setConfirmedVehicle({ ...vehicleForm });
      setVehicleModalOpen(false);
      toast.success("Vehicle details updated");
    } else {
      toast.error("Failed to update vehicle details");
    }
  };

  const addVehiclePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (!newFiles?.length || !assessmentId) return;

    const arr = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
    if (!arr.length) return;

    try {
      const startIdx = previews.length;
      const imageUrls = await supabaseUpload(arr, assessmentId);

      for (let i = 0; i < imageUrls.length; i++) {
        await fetch("/api/assessments/save", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: assessmentId,
            addImage: { filename: `photo-${startIdx + i + 1}`, originalName: arr[i].name, path: imageUrls[i], mimeType: arr[i].type, size: arr[i].size, sortOrder: startIdx + i },
          }),
        });
      }

      setPreviews((prev) => [...prev, ...imageUrls]);
      toast.success(`${arr.length} photo${arr.length > 1 ? "s" : ""} added`);
    } catch {
      toast.error("Failed to upload photos");
    }
    if (vehiclePhotoInputRef.current) vehiclePhotoInputRef.current.value = "";
  };

  const removeVehiclePhoto = async (idx: number) => {
    const src = previews[idx];

    if (assessmentId && src) {
      try {
        await supabaseDelete(src);
      } catch { /* non-blocking */ }
      try {
        await fetch("/api/assessments/save", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: assessmentId, removeImage: src }),
        });
      } catch { /* non-blocking */ }
    }

    setPreviews((prev) => prev.filter((_, i) => i !== idx));
    toast.success("Photo removed");
  };

  const openSummaryModal = () => {
    if (result) {
      setSummaryForm({ ...result.damage });
    }
    setSummaryModalOpen(true);
  };

  const saveSummary = async () => {
    if (!result) return;
    setSavingModal(true);
    const ok = await patchAssessment({ damage: summaryForm });
    setSavingModal(false);
    if (ok) {
      setResult({ ...result, damage: summaryForm });
      setSummaryModalOpen(false);
      toast.success("Summary updated");
    } else {
      toast.error("Failed to update summary");
    }
  };

  const openStructuralModal = () => {
    setStructuralForm([...(result?.structural_concerns || [])]);
    setStructuralModalOpen(true);
  };

  const saveStructural = async () => {
    if (!result) return;
    setSavingModal(true);
    const ok = await patchAssessment({ structural_concerns: structuralForm });
    setSavingModal(false);
    if (ok) {
      setResult({ ...result, structural_concerns: structuralForm });
      setStructuralModalOpen(false);
      toast.success("Structural concerns updated");
    } else {
      toast.error("Failed to update structural concerns");
    }
  };

  const openRecommendationsModal = () => {
    setRecommendationsForm([...(result?.recommendations || [])]);
    setRecommendationsModalOpen(true);
  };

  const saveRecommendations = async () => {
    if (!result) return;
    setSavingModal(true);
    const ok = await patchAssessment({ recommendations: recommendationsForm });
    setSavingModal(false);
    if (ok) {
      setResult({ ...result, recommendations: recommendationsForm });
      setRecommendationsModalOpen(false);
      toast.success("Recommendations updated");
    } else {
      toast.error("Failed to update recommendations");
    }
  };

  const stepOrder: Step[] = ["details", "upload", "analyze", "confirm", "payment", "results"];
  const stepLabels: Record<Step, string> = {
    details: "Your Details", upload: "Upload Photos", analyze: "Analyzing", confirm: "Confirm Vehicle", payment: "Payment", results: "Results",
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
              <button onClick={() => setStep("payment")}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25">
                Confirm & Pay <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Payment */}
        {step === "payment" && (
          <div className="max-w-lg mx-auto text-center py-10">
            <button onClick={() => setStep("confirm")} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"><ChevronLeft className="w-4 h-4" /> Back</button>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-7 h-7 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Pay for Report</h1>
            <p className="mt-2 text-sm text-gray-500">A one-time fee to generate your detailed PDF report.</p>
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-8">
              <div className="text-4xl font-bold text-gray-900">KES {paymentAmount.toLocaleString()}</div>
              <p className="mt-2 text-xs text-gray-400">One-time payment via Paystack</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-600 text-left max-w-xs mx-auto">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> Detailed PDF report</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> Per-part cost breakdown</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> Supplier recommendations</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> Structural concerns &amp; advice</li>
              </ul>
              <button
                onClick={handlePayment}
                disabled={paying || loadingPrice}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl hover:from-emerald-700 hover:to-green-700 transition shadow-lg shadow-emerald-500/25 disabled:opacity-50"
              >
                {paying ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <>Pay KES {paymentAmount.toLocaleString()}</>}
              </button>
              <p className="mt-4 text-[11px] text-gray-400">Secure payment powered by Paystack</p>
            </div>
            <button
              onClick={goToResults}
              className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2 transition"
            >
              Skip for now (no PDF)
            </button>
          </div>
        )}

        {/* STEP 6: Results */}
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
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900">Customer</h2>
                <button onClick={openCustomerModal} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"><Pencil className="w-3 h-3" /> Edit</button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-400">Name:</span> <span className="font-medium text-gray-900 ml-1">{customerInfo.fullName}</span></div>
                <div><span className="text-gray-400">Phone:</span> <span className="font-medium text-gray-900 ml-1">{customerInfo.phone}</span></div>
                {customerInfo.email && <div><span className="text-gray-400">Email:</span> <span className="font-medium text-gray-900 ml-1">{customerInfo.email}</span></div>}
                {customerInfo.address && <div><span className="text-gray-400">Address:</span> <span className="font-medium text-gray-900 ml-1">{customerInfo.address}</span></div>}
              </div>
            </div>

            {/* Vehicle Details + Photos */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900">Vehicle Details</h2>
                <button onClick={openVehicleModal} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"><Pencil className="w-3 h-3" /> Edit</button>
              </div>
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
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Summary</h2>
                <button onClick={openSummaryModal} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"><Pencil className="w-3 h-3" /> Edit</button>
              </div>
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
                  {assessmentId && editableParts.length > 0 && (
                    <button onClick={saveParts} disabled={savingParts}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition disabled:opacity-50">
                      {savingParts ? <Loader2 className="w-3 h-3 animate-spin" /> : null} Save
                    </button>
                  )}
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
            <div className="mt-6 bg-amber-50 rounded-2xl border border-amber-100 p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-amber-800 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Structural Concerns</h2>
                <button onClick={openStructuralModal} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-600 hover:text-amber-800 hover:bg-amber-100 rounded-lg transition"><Pencil className="w-3 h-3" /> Edit</button>
              </div>
              {result.structural_concerns?.length > 0 ? (
                <ul className="mt-3 space-y-1.5">
                  {result.structural_concerns.map((c, i) => (
                    <li key={i} className="text-sm text-amber-700 flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{c}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-amber-600 italic">No structural concerns identified</p>
              )}
            </div>

            {/* Recommendations */}
            <div className="mt-6 bg-blue-50 rounded-2xl border border-blue-100 p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-blue-800 flex items-center gap-2"><FileText className="w-4 h-4" /> Recommendations</h2>
                <button onClick={openRecommendationsModal} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition"><Pencil className="w-3 h-3" /> Edit</button>
              </div>
              {result.recommendations?.length > 0 ? (
                <ul className="mt-3 space-y-1.5">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-sm text-blue-700 flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />{r}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-blue-600 italic">No recommendations</p>
              )}
            </div>

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

      {/* ===== EDIT MODALS ===== */}

      {/* Customer Info Modal */}
      <Dialog open={customerModalOpen} onOpenChange={setCustomerModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Customer Info</DialogTitle>
            <DialogDescription>Update the customer contact details for this assessment.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" value={customerForm.fullName} onChange={(e) => setCustomerForm({ ...customerForm, fullName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" value={customerForm.phone} onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={customerForm.email} onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" value={customerForm.address} onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setCustomerModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
            <button onClick={saveCustomer} disabled={savingModal || !customerForm.fullName.trim() || !customerForm.phone.trim()}
              className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 inline-flex items-center gap-2">
              {savingModal && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vehicle Details Modal */}
      <Dialog open={vehicleModalOpen} onOpenChange={setVehicleModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Vehicle Details</DialogTitle>
            <DialogDescription>Update the detected vehicle information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Make</label>
                <input type="text" value={vehicleForm.make} onChange={(e) => setVehicleForm({ ...vehicleForm, make: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Model</label>
                <input type="text" value={vehicleForm.model} onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Variant</label>
                <input type="text" value={vehicleForm.variant} onChange={(e) => setVehicleForm({ ...vehicleForm, variant: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Year</label>
                <input type="text" value={vehicleForm.year} onChange={(e) => setVehicleForm({ ...vehicleForm, year: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Body Type</label>
                <input type="text" value={vehicleForm.body_type} onChange={(e) => setVehicleForm({ ...vehicleForm, body_type: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Color</label>
                <input type="text" value={vehicleForm.color} onChange={(e) => setVehicleForm({ ...vehicleForm, color: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Registration</label>
                <input type="text" value={vehicleForm.registration} onChange={(e) => setVehicleForm({ ...vehicleForm, registration: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-500">Photos ({previews.length})</label>
                <button type="button" onClick={() => vehiclePhotoInputRef.current?.click()}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <Camera className="w-3 h-3" /> Add Photo
                </button>
                <input ref={vehiclePhotoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={addVehiclePhoto} />
              </div>
              {previews.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {previews.map((src, i) => (
                    <div key={i} className="relative group rounded-lg overflow-hidden aspect-square bg-gray-100">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeVehiclePhoto(i)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">No photos uploaded</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setVehicleModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
            <button onClick={saveVehicle} disabled={savingModal}
              className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 inline-flex items-center gap-2">
              {savingModal && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary / Damage Info Modal */}
      <Dialog open={summaryModalOpen} onOpenChange={setSummaryModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Damage Summary</DialogTitle>
            <DialogDescription>Update the damage assessment summary and severity.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Damage Summary</label>
              <textarea rows={4} value={summaryForm.summary} onChange={(e) => setSummaryForm({ ...summaryForm, summary: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                <select value={summaryForm.severity} onChange={(e) => setSummaryForm({ ...summaryForm, severity: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white">
                  {["Minor", "Moderate", "Severe", "Critical"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost ({CURRENCY})</label>
                <input type="number" min="0" step="0.01" value={summaryForm.estimated_total_cost || ""} onChange={(e) => setSummaryForm({ ...summaryForm, estimated_total_cost: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Est. Labor Hours</label>
                <input type="number" min="0" step="0.5" value={summaryForm.estimated_total_labor_hours || ""} onChange={(e) => setSummaryForm({ ...summaryForm, estimated_total_labor_hours: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" />
              </div>
              <div className="flex items-end gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={summaryForm.structural_damage} onChange={(e) => setSummaryForm({ ...summaryForm, structural_damage: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  Structural Damage
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={summaryForm.possible_total_loss} onChange={(e) => setSummaryForm({ ...summaryForm, possible_total_loss: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  Total Loss
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setSummaryModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
            <button onClick={saveSummary} disabled={savingModal}
              className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 inline-flex items-center gap-2">
              {savingModal && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Structural Concerns Modal */}
      <Dialog open={structuralModalOpen} onOpenChange={setStructuralModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Structural Concerns</DialogTitle>
            <DialogDescription>Add, remove, or modify structural concerns identified in the assessment.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {structuralForm.map((concern, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <input type="text" value={concern} onChange={(e) => { const updated = [...structuralForm]; updated[i] = e.target.value; setStructuralForm(updated); }}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" placeholder="Concern description" />
                <button onClick={() => setStructuralForm(structuralForm.filter((_, idx) => idx !== i))}
                  className="mt-1.5 p-1 text-gray-300 hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button onClick={() => setStructuralForm([...structuralForm, ""])}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 transition">
              <Plus className="w-3 h-3" /> Add Concern
            </button>
          </div>
          <DialogFooter>
            <button onClick={() => setStructuralModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
            <button onClick={saveStructural} disabled={savingModal}
              className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 inline-flex items-center gap-2">
              {savingModal && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Recommendations Modal */}
      <Dialog open={recommendationsModalOpen} onOpenChange={setRecommendationsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Recommendations</DialogTitle>
            <DialogDescription>Add, remove, or modify the recommendations for this assessment.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {recommendationsForm.map((rec, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <input type="text" value={rec} onChange={(e) => { const updated = [...recommendationsForm]; updated[i] = e.target.value; setRecommendationsForm(updated); }}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white" placeholder="Recommendation" />
                <button onClick={() => setRecommendationsForm(recommendationsForm.filter((_, idx) => idx !== i))}
                  className="mt-1.5 p-1 text-gray-300 hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button onClick={() => setRecommendationsForm([...recommendationsForm, ""])}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition">
              <Plus className="w-3 h-3" /> Add Recommendation
            </button>
          </div>
          <DialogFooter>
            <button onClick={() => setRecommendationsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
            <button onClick={saveRecommendations} disabled={savingModal}
              className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 inline-flex items-center gap-2">
              {savingModal && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
