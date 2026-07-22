"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  X, Camera, FileText, CheckCircle, AlertCircle, Loader2,
  ChevronLeft, ChevronRight, ArrowLeft, Plus, Trash2,
  CreditCard, Download, PenTool, User, Car, Shield,
  Wrench, ClipboardList, MessageSquare, Stamp, AlertTriangle,
} from "lucide-react";
import { useWizardStore, STEP_PARAM, PARAM_TO_STEP, type Step } from "@/hooks/use-wizard-store";
import { useSession } from "@/hooks/use-session";
import { Navbar } from "@/components/navbar";
import { CURRENCY, formatCurrency } from "@/lib/currency";
import { uploadImages as supabaseUpload, deleteImage as supabaseDelete } from "@/lib/supabase";
import { toast } from "sonner";
import { DAMAGE_ACTIONS, PART_STATUSES, SERVICE_TYPES, TYRE_POSITIONS, computePartTotals, computeServiceTotals, type VehicleData } from "@/types";
import { DatePicker } from "@/components/date-picker";

const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
  { key: "upload", label: "Photos", icon: <Camera className="w-4 h-4" /> },
  { key: "analyze", label: "AI Analysis", icon: <PenTool className="w-4 h-4" /> },
  { key: "payment", label: "Payment", icon: <CreditCard className="w-4 h-4" /> },
  { key: "intake", label: "Fee Note & Claim", icon: <FileText className="w-4 h-4" /> },
  { key: "vehicle", label: "Vehicle Details", icon: <Car className="w-4 h-4" /> },
  { key: "condition", label: "Vehicle Condition", icon: <ClipboardList className="w-4 h-4" /> },
  { key: "damage", label: "Damage Assessment", icon: <AlertTriangle className="w-4 h-4" /> },
  { key: "estimate", label: "Parts & Cost", icon: <Wrench className="w-4 h-4" /> },
  { key: "remarks", label: "Remarks", icon: <MessageSquare className="w-4 h-4" /> },
  { key: "authorization", label: "Auth & Signatures", icon: <Stamp className="w-4 h-4" /> },
  { key: "results", label: "Results", icon: <CheckCircle className="w-4 h-4" /> },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1 ${className || ""}`}>
      <label className="text-xs font-medium text-gray-500">{label}</label>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition ${props.className || ""}`}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition ${props.className || ""}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={3}
      className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition resize-none ${props.className || ""}`}
    />
  );
}

export default function AnalyzeWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const store = useWizardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user: sessionUser, loading: sessionLoading } = useSession();
  const savingRef = useRef(false);

  // Auth guard
  useEffect(() => {
    if (!sessionLoading && !sessionUser) {
      router.replace("/login?callbackUrl=/analyze");
    }
  }, [sessionLoading, sessionUser, router]);

  const [vehicleCatalog, setVehicleCatalog] = useState<{
    makes: Array<{ id: string; name: string; models: Array<{ id: string; name: string; variants: Array<{ id: string; name: string }> }> }>;
  }>({ makes: [] });
  const [insuranceCompanies, setInsuranceCompanies] = useState<Array<{ id: string; name: string }>>([]);
  const [repairers, setRepairers] = useState<Array<{ id: string; name: string; contactPerson?: string; phone?: string; email?: string; address?: string }>>([]);
  const isAdmin = sessionUser?.role === "ADMIN";
  const visibleSteps = isAdmin
    ? STEPS.filter((s) => s.key !== "payment")
    : STEPS;

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ done: 0, total: 0 });
  const [loadingAssessment, setLoadingAssessment] = useState(false);
  const [newInstruction, setNewInstruction] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(500);
  const [loadingPrice, setLoadingPrice] = useState(true);

  const setStep = useCallback(
    (s: Step) => {
      store.setStep(s);
      const params = new URLSearchParams({ step: STEP_PARAM[s] });
      if (store.assessmentId) params.set("id", store.assessmentId);
      router.replace(`/analyze?${params.toString()}`, { scroll: false });
    },
    [router, store]
  );

  // Load catalogs
  useEffect(() => {
    fetch("/api/catalogs").then(r => r.json()).then(d => {
      if (d.makes) setVehicleCatalog({ makes: d.makes });
      if (d.insuranceCompanies) setInsuranceCompanies(d.insuranceCompanies);
      if (d.repairers) setRepairers(d.repairers);
    }).catch(() => {});
    fetch("/api/settings").then(r => r.json()).then(s => {
      if (s.report_price) setPaymentAmount(parseInt(s.report_price, 10));
    }).catch(() => {}).finally(() => setLoadingPrice(false));
  }, []);

  // Auto-mark paid for admin users
  useEffect(() => {
    if (isAdmin) store.setPaid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  // Load assessment on mount
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    const init = async () => {
      const id = searchParams.get("id");
      const urlStep = searchParams.get("step") || "";
      const reference = searchParams.get("reference");

      if (reference && id) {
        store.setPaying(true);
        try {
          const res = await fetch(`/api/paystack/verify?reference=${reference}`);
          const data = await res.json();
          if (data.verified) { store.setPaid(true); toast.success("Payment confirmed!"); }
        } catch {}
        store.setPaying(false);
        window.history.replaceState({}, "", `/analyze?step=results&id=${id}`);
      }

      if (id) {
        setLoadingAssessment(true);
        try {
          const res = await fetch(`/api/assessments/${id}`);
          if (res.ok) {
            const a = await res.json();
            store.setAssessmentId(id);
            store.loadAssessment(a);
            store.setPaid(a.paid || (isAdmin ? true : false));
          }
        } catch {}
        setLoadingAssessment(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-set step from URL
  useEffect(() => {
    const urlStep = PARAM_TO_STEP[searchParams.get("step") || ""];
    if (urlStep && urlStep !== store.step && !(isAdmin && urlStep === "payment")) store.setStep(urlStep);
    const urlId = searchParams.get("id");
    if (urlId && urlId !== store.assessmentId) store.setAssessmentId(urlId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isAdmin]);

  // Auto-compute fee note total
  useEffect(() => {
    const total = store.feeNote.professionalFee + store.feeNote.vat + store.feeNote.reimbursement;
    if (total !== store.feeNote.totalProfessionalFee) {
      store.updateFeeNote({ totalProfessionalFee: total });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.feeNote.professionalFee, store.feeNote.vat, store.feeNote.reimbursement]);

  // Auto-compute excess amount
  useEffect(() => {
    if (store.claim.excessPercentage && store.claim.excessPercentage > 0) {
      const summary = store.getCostSummary();
      const excess = summary.grandTotal * (store.claim.excessPercentage / 100);
      if (excess !== store.claim.excessAmount) {
        store.updateClaim({ excessAmount: Math.round(excess * 100) / 100 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.claim.excessPercentage, store.parts, store.services]);

  const saveAssessment = async (status?: string, silent = false) => {
    if (savingRef.current) return store.assessmentId;
    savingRef.current = true;
    store.setSaving(true);
    try {
      let id = store.assessmentId;
      if (!id) {
        const res = await fetch("/api/assessments/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        id = data.id;
        if (!id) throw new Error("No ID returned");
        store.setAssessmentId(id);
      }

      // Sync authorization.assessmentStatus → core Assessment.status
      const resolvedStatus = status || store.authorization.assessmentStatus || undefined;

      await fetch("/api/assessments/save", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: resolvedStatus,
          currentStep: STEP_PARAM[store.step],
          insuranceCompanyId: store.insuranceCompanyId,
          repairerId: store.repairerId,
          feeNote: store.feeNote,
          claim: store.claim,
          vehicle: store.vehicle,
          vehicleCondition: store.vehicleCondition,
          accidentDetail: store.accidentDetail,
          damageItems: store.damageItems,
          parts: store.parts,
          services: store.services,
          remark: store.remark,
          additionalObservations: store.additionalObservations,
          authorization: store.authorization,
          specialInstructions: store.specialInstructions,
          signatures: store.signatures,
          photos: store.photos,
          aiRawResponse: store.result ? JSON.stringify(store.result) : undefined,
        }),
      });
      if (!silent) toast.success("Assessment saved!");
      return id as string;
    } catch (e) {
      if (!silent) toast.error("Failed to save assessment");
      return null;
    } finally {
      store.setSaving(false);
      savingRef.current = false;
    }
  };

  const handleUpload = async () => {
    if (!store.files.length) return;

    // Auto-create assessment if needed
    let assessmentId = store.assessmentId;
    if (!assessmentId) {
      const id = await saveAssessment();
      if (!id) return;
      assessmentId = id;
    }

    setUploading(true);
    setUploadProgress({ done: 0, total: store.files.length });
    try {
      const urls = await supabaseUpload(store.files, assessmentId);
      for (let i = 0; i < urls.length; i++) {
        store.addPhoto({
          filename: urls[i].split("/").pop() || "",
          originalName: store.files[i]?.name || "",
          path: urls[i],
          mimeType: store.files[i]?.type || "image/jpeg",
          size: store.files[i]?.size || 0,
          sortOrder: i,
        });
        setUploadProgress((p) => ({ ...p, done: p.done + 1 }));
      }
      store.setFiles([]);
      store.setPreviews([]);

      // Persist photos to DB immediately so they survive page refresh
      await saveAssessment(undefined, true);

      toast.success("Photos uploaded!");
    } catch (e) {
      toast.error("Upload failed");
    }
    setUploading(false);
  };

  const handleDownloadPdf = async () => {
    if (!store.assessmentId) return;
    store.setDownloadingPdf(true);
    try {
      await saveAssessment();
      const res = await fetch("/api/reports/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId: store.assessmentId }),
      });
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `assessment-${store.assessmentId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error("Failed to generate PDF");
    }
    store.setDownloadingPdf(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    store.setFiles([...store.files, ...files]);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    store.setPreviews([...store.previews, ...newPreviews]);
  };

  const handlePayment = async () => {
    if (!store.assessmentId) {
      const id = await saveAssessment();
      if (!id) return;
    }
    store.setPaying(true);
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: store.assessmentId,
          amount: paymentAmount,
          email: store.claim.insuredEmail || "user@example.com",
        }),
      });
      const data = await res.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        toast.error(data.error || "Payment initialization failed");
      }
    } catch {
      toast.error("Payment failed");
    }
    store.setPaying(false);
  };

  const canAdvance = (): boolean => {
    switch (store.step) {
      case "upload": return true;
      case "analyze":
        // ASSESSOR must complete AI analysis before proceeding to payment
        if (!isAdmin && store.result === null) return false;
        return true;
      case "payment":
        // ASSESSOR must pay before proceeding to intake
        if (!isAdmin && !store.paid) return false;
        return true;
      case "intake": return !!store.claim.insuredName;
      case "vehicle": return true;
      case "condition": return true;
      case "damage": return true;
      case "estimate": return true;
      case "remarks": return true;
      case "authorization": return true;
      case "results": return true;
      default: return true;
    }
  };

  const advanceStep = async () => {
    // Always save current state before advancing
    const id = await saveAssessment(undefined, true);
    if (!id && !store.assessmentId) return;
    const idx = visibleSteps.findIndex((s) => s.key === store.step);
    if (idx < visibleSteps.length - 1) setStep(visibleSteps[idx + 1].key);
  };

  const prevStep = async () => {
    // Save current state before going back
    await saveAssessment(undefined, true);
    const idx = visibleSteps.findIndex((s) => s.key === store.step);
    if (idx > 0) setStep(visibleSteps[idx - 1].key);
  };

  if (loadingAssessment || sessionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!sessionUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Vehicle Assessment</h1>
            <p className="text-sm text-gray-500">
              {store.assessmentId ? `ID: ${store.assessmentId.slice(0, 8)}...` : "New Assessment"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => saveAssessment()}
              disabled={store.saving}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              {store.saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
              Save Draft
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
          {visibleSteps.map((s, i) => {
            const active = store.step === s.key;
            const completed = visibleSteps.findIndex((x) => x.key === store.step) > i;
            return (
              <button
                key={s.key}
                onClick={async () => {
                  await saveAssessment(undefined, true);
                  setStep(s.key);
                }}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                  active
                    ? "bg-gray-900 text-white"
                    : completed
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {completed ? <CheckCircle className="w-3.5 h-3.5" /> : s.icon}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: Intake (Fee Note + Insurance + Claim)                       */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "intake" && (
            <div className="space-y-6">
              <Section title="Assessment / Fee Note">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Reference Number">
                    <Input value={store.feeNote.referenceNumber || ""} onChange={(e) => store.updateFeeNote({ referenceNumber: e.target.value })} placeholder="e.g. REF-001" />
                  </Field>
                  <Field label="Assessment Date">
                    <DatePicker value={store.feeNote.assessmentDate || ""} onChange={(v) => store.updateFeeNote({ assessmentDate: v })} />
                  </Field>
                  <Field label={`Professional Fee (${CURRENCY})`}>
                    <Input type="number" min="0" step="0.01" value={store.feeNote.professionalFee || ""} onChange={(e) => store.updateFeeNote({ professionalFee: parseFloat(e.target.value) || 0 })} />
                  </Field>
                  <Field label={`VAT (${CURRENCY})`}>
                    <Input type="number" min="0" step="0.01" value={store.feeNote.vat || ""} onChange={(e) => store.updateFeeNote({ vat: parseFloat(e.target.value) || 0 })} />
                  </Field>
                  <Field label={`Reimbursement (${CURRENCY})`}>
                    <Input type="number" min="0" step="0.01" value={store.feeNote.reimbursement || ""} onChange={(e) => store.updateFeeNote({ reimbursement: parseFloat(e.target.value) || 0 })} />
                  </Field>
                  <Field label={`Total Professional Fee (${CURRENCY})`}>
                    <Input type="number" value={store.feeNote.totalProfessionalFee || ""} readOnly className="bg-gray-50 font-semibold" />
                  </Field>
                </div>
              </Section>

              <Section title="Insurance Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Insurance Company">
                    <Select value={store.insuranceCompanyId || ""} onChange={(e) => store.setInsuranceCompanyId(e.target.value || null)}>
                      <option value="">Select company...</option>
                      {insuranceCompanies.map((ic) => (
                        <option key={ic.id} value={ic.id}>{ic.name}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Policy Number">
                    <Input value={store.claim.policyNumber || ""} onChange={(e) => store.updateClaim({ policyNumber: e.target.value })} />
                  </Field>
                  <Field label={`Sum Insured (${CURRENCY})`}>
                    <Input type="number" min="0" step="0.01" value={store.claim.sumInsured || ""} onChange={(e) => store.updateClaim({ sumInsured: parseFloat(e.target.value) || undefined })} />
                  </Field>
                </div>
              </Section>

              <Section title="Claim Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Claim Number">
                    <Input value={store.claim.claimNumber || ""} onChange={(e) => store.updateClaim({ claimNumber: e.target.value })} />
                  </Field>
                  <Field label="Insured Name *">
                    <Input value={store.claim.insuredName || ""} onChange={(e) => store.updateClaim({ insuredName: e.target.value })} required />
                  </Field>
                  <Field label="Insured Phone">
                    <Input value={store.claim.insuredPhone || ""} onChange={(e) => store.updateClaim({ insuredPhone: e.target.value })} />
                  </Field>
                  <Field label="Insured Email">
                    <Input type="email" value={store.claim.insuredEmail || ""} onChange={(e) => store.updateClaim({ insuredEmail: e.target.value })} />
                  </Field>
                  <Field label="Insured Address" className="sm:col-span-2">
                    <Input value={store.claim.insuredAddress || ""} onChange={(e) => store.updateClaim({ insuredAddress: e.target.value })} />
                  </Field>
                  <Field label="Excess Percentage (%)">
                    <Input type="number" min="0" max="100" step="0.1" value={store.claim.excessPercentage || ""} onChange={(e) => store.updateClaim({ excessPercentage: parseFloat(e.target.value) || undefined })} />
                  </Field>
                  <Field label={`Excess Amount (${CURRENCY})`}>
                    <Input type="number" value={store.claim.excessAmount?.toFixed(2) || ""} readOnly className="bg-gray-50" />
                  </Field>
                  <Field label="Date of Instruction">
                    <DatePicker value={store.claim.dateOfInstruction || ""} onChange={(v) => store.updateClaim({ dateOfInstruction: v })} />
                  </Field>
                  <Field label="Date of Assessment">
                    <DatePicker value={store.claim.dateOfAssessment || ""} onChange={(v) => store.updateClaim({ dateOfAssessment: v })} />
                  </Field>
                </div>
              </Section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: Vehicle Details                                             */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "vehicle" && (
            <div className="space-y-6">
              <Section title="Vehicle Identification">
                {!!((store.result as Record<string, unknown>)?.vehicle) && (
                  <button
                    onClick={async () => {
                      const ai = (store.result as Record<string, unknown>).vehicle as Record<string, unknown>;
                      const updates: Record<string, unknown> = {};
                      if (ai.registration) updates.registrationNumber = ai.registration;
                      if (ai.color) updates.colour = ai.color;
                      if (ai.year) updates.yearOfManufacture = parseInt(ai.year as string, 10) || undefined;
                      if (ai.make) {
                        const makeName = (ai.make as string).trim();
                        const modelName = ai.model ? (ai.model as string).trim() : undefined;
                        const variantName = ai.variant ? (ai.variant as string).trim() : undefined;
                        const make = vehicleCatalog.makes.find(
                          (m) => m.name.toLowerCase() === makeName.toLowerCase()
                        );
                        if (make) {
                          updates.makeId = make.id;
                          if (modelName) {
                            const model = make.models.find(
                              (m) => m.name.toLowerCase() === modelName.toLowerCase()
                            );
                            if (model) {
                              updates.modelId = model.id;
                              if (variantName) {
                                const variant = model.variants.find(
                                  (v) => v.name.toLowerCase() === variantName.toLowerCase()
                                );
                                if (variant) updates.variantId = variant.id;
                              }
                            }
                          }
                        }
                        const needsCreation = !updates.makeId || (modelName && !updates.modelId) || (variantName && !updates.variantId);
                        if (needsCreation) {
                          const { resolveOrCreateVehicle } = await import("@/actions/vehicle-catalog");
                          const resolved = await resolveOrCreateVehicle(makeName, modelName, variantName);
                          if (resolved.makeId && !updates.makeId) updates.makeId = resolved.makeId;
                          if (resolved.modelId && !updates.modelId) updates.modelId = resolved.modelId;
                          if (resolved.variantId && !updates.variantId) updates.variantId = resolved.variantId;
                          fetch("/api/catalogs").then(r => r.json()).then(d => {
                            if (d.makes) setVehicleCatalog({ makes: d.makes });
                          }).catch(() => {});
                        }
                      }
                      store.updateVehicle(updates as Partial<VehicleData>);
                      toast.success("Vehicle details filled from AI analysis");
                    }}
                    className="mb-4 flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition"
                  >
                    <PenTool className="w-3.5 h-3.5" /> Auto-fill from AI Analysis
                  </button>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Registration Number">
                    <Input value={store.vehicle.registrationNumber || ""} onChange={(e) => store.updateVehicle({ registrationNumber: e.target.value })} placeholder="e.g. KAA 123A" />
                  </Field>
                  <Field label="Vehicle Make">
                    <Select value={store.vehicle.makeId || ""} onChange={(e) => store.updateVehicle({ makeId: e.target.value || undefined, modelId: undefined, variantId: undefined })}>
                      <option value="">Select make...</option>
                      {vehicleCatalog.makes.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Vehicle Model">
                    <Select value={store.vehicle.modelId || ""} onChange={(e) => store.updateVehicle({ modelId: e.target.value || undefined, variantId: undefined })}>
                      <option value="">Select model...</option>
                      {vehicleCatalog.makes.find((m) => m.id === store.vehicle.makeId)?.models.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Variant / Trim">
                    <Select value={store.vehicle.variantId || ""} onChange={(e) => store.updateVehicle({ variantId: e.target.value || undefined })}>
                      <option value="">Select variant...</option>
                      {vehicleCatalog.makes.find((m) => m.id === store.vehicle.makeId)?.models.find((m) => m.id === store.vehicle.modelId)?.variants.map((v) => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Colour">
                    <Input value={store.vehicle.colour || ""} onChange={(e) => store.updateVehicle({ colour: e.target.value })} />
                  </Field>
                  <Field label="Year of Manufacture">
                    <Input type="number" min="1900" max="2100" value={store.vehicle.yearOfManufacture || ""} onChange={(e) => store.updateVehicle({ yearOfManufacture: parseInt(e.target.value) || undefined })} />
                  </Field>
                </div>
              </Section>

              <Section title="Technical Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Engine Type">
                    <Input value={store.vehicle.engineType || ""} onChange={(e) => store.updateVehicle({ engineType: e.target.value })} placeholder="e.g. 2.4L Diesel" />
                  </Field>
                  <Field label="Engine Number">
                    <Input value={store.vehicle.engineNumber || ""} onChange={(e) => store.updateVehicle({ engineNumber: e.target.value })} />
                  </Field>
                  <Field label="Chassis Number / VIN">
                    <Input value={store.vehicle.chassisNumber || store.vehicle.vin || ""} onChange={(e) => store.updateVehicle({ chassisNumber: e.target.value, vin: e.target.value })} />
                  </Field>
                  <Field label="Mileage">
                    <Input value={store.vehicle.mileage || ""} onChange={(e) => store.updateVehicle({ mileage: e.target.value })} placeholder="e.g. 85,000 km" />
                  </Field>
                  <Field label="Mode of Transport">
                    <Input value={store.vehicle.modeOfTransport || ""} onChange={(e) => store.updateVehicle({ modeOfTransport: e.target.value })} placeholder="e.g. Driven" />
                  </Field>
                  <Field label="Vehicle Popularity">
                    <Input value={store.vehicle.vehiclePopularity || ""} onChange={(e) => store.updateVehicle({ vehiclePopularity: e.target.value })} placeholder="e.g. Popular" />
                  </Field>
                  <Field label="Repairer / Garage">
                    <Select value={store.repairerId || ""} onChange={(e) => store.setRepairerId(e.target.value || null)}>
                      <option value="">Select repairer...</option>
                      {repairers.map((r) => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </Select>
                  </Field>
                </div>
              </Section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: Vehicle Condition                                           */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "condition" && (
            <div className="space-y-6">
              <Section title="Vehicle Condition">
                {!!((store.result as Record<string, unknown>)?.damage) && (
                  <button
                    onClick={() => {
                      const d = (store.result as Record<string, unknown>).damage as Record<string, unknown>;
                      const sev = (d.severity as string || "").toLowerCase();
                      const map: Record<string, string> = { minor: "Good", moderate: "Fair", severe: "Poor", critical: "Very Poor" };
                      const mapCapped: Record<string, string> = { minor: "Good", moderate: "Fair", severe: "Poor", critical: "Poor" };
                      const updates: Record<string, unknown> = {};
                      updates.overallCondition = map[sev] || "";
                      let mech = mapCapped[sev] || "";
                      if (d.structural_damage) {
                        const bump: Record<string, string> = { Good: "Fair", Fair: "Poor", Poor: "Poor" };
                        mech = bump[mech] || mech;
                      }
                      updates.mechanicalCondition = mech;
                      let int = mapCapped[sev] || "";
                      if (d.rollover) {
                        const bump: Record<string, string> = { Good: "Fair", Fair: "Poor", Poor: "Poor" };
                        int = bump[int] || int;
                      }
                      updates.interiorCondition = int;
                      updates.exteriorCondition = mapCapped[sev] || "";
                      store.updateVehicleCondition(updates as Parameters<typeof store.updateVehicleCondition>[0]);
                      toast.success("Vehicle condition filled from AI analysis");
                    }}
                    className="mb-4 flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition"
                  >
                    <PenTool className="w-3.5 h-3.5" /> Auto-fill from AI Analysis
                  </button>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Overall Condition">
                    <Select value={store.vehicleCondition.overallCondition || ""} onChange={(e) => store.updateVehicleCondition({ overallCondition: e.target.value })}>
                      <option value="">Select...</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                      <option value="Very Poor">Very Poor</option>
                    </Select>
                  </Field>
                  <Field label="Spare Tyre Condition">
                    <Select value={store.vehicleCondition.spareTyreCondition || ""} onChange={(e) => store.updateVehicleCondition({ spareTyreCondition: e.target.value })}>
                      <option value="">Select...</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                      <option value="Missing">Missing</option>
                    </Select>
                  </Field>
                  <Field label="General Mechanical">
                    <Select value={store.vehicleCondition.mechanicalCondition || ""} onChange={(e) => store.updateVehicleCondition({ mechanicalCondition: e.target.value })}>
                      <option value="">Select...</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </Select>
                  </Field>
                  <Field label="Interior Condition">
                    <Select value={store.vehicleCondition.interiorCondition || ""} onChange={(e) => store.updateVehicleCondition({ interiorCondition: e.target.value })}>
                      <option value="">Select...</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </Select>
                  </Field>
                  <Field label="Exterior Condition">
                    <Select value={store.vehicleCondition.exteriorCondition || ""} onChange={(e) => store.updateVehicleCondition({ exteriorCondition: e.target.value })}>
                      <option value="">Select...</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </Select>
                  </Field>
                </div>
              </Section>

              <Section title="Tyre Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <Field label="Tyre Brand">
                    <Input value={store.vehicleCondition.tyreBrand || ""} onChange={(e) => store.updateVehicleCondition({ tyreBrand: e.target.value })} placeholder="e.g. Bridgestone" />
                  </Field>
                  <Field label="Tyre Size">
                    <Input value={store.vehicleCondition.tyreSize || ""} onChange={(e) => store.updateVehicleCondition({ tyreSize: e.target.value })} placeholder="e.g. 265/65R17" />
                  </Field>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {TYRE_POSITIONS.map((pos) => {
                    const tyre = store.vehicleCondition.tyres.find((t) => t.position === pos);
                    const pct = tyre?.percentage || 0;
                    return (
                      <div key={pos} className="rounded-lg border border-gray-200 p-3 text-center">
                        <div className="text-xs font-semibold text-gray-500 mb-2">{pos}</div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={pct}
                          onChange={(e) => {
                            const newTyres = store.vehicleCondition.tyres.map((t) =>
                              t.position === pos ? { ...t, percentage: parseInt(e.target.value) } : t
                            );
                            store.updateVehicleCondition({ tyres: newTyres });
                          }}
                          className="w-full"
                        />
                        <div className={`text-lg font-bold mt-1 ${pct <= 30 ? "text-red-600" : pct <= 60 ? "text-amber-600" : "text-emerald-600"}`}>
                          {pct}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>

              <Section title="Accident Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Accident Date">
                    <DatePicker value={store.accidentDetail.accidentDate || ""} onChange={(v) => store.updateAccidentDetail({ accidentDate: v })} />
                  </Field>
                  <Field label="Accident Location">
                    <Input value={store.accidentDetail.accidentLocation || ""} onChange={(e) => store.updateAccidentDetail({ accidentLocation: e.target.value })} />
                  </Field>
                  <Field label="Accident Description" className="sm:col-span-2">
                    <Textarea value={store.accidentDetail.accidentDescription || ""} onChange={(e) => store.updateAccidentDetail({ accidentDescription: e.target.value })} />
                  </Field>
                  <Field label="Accident Circumstances" className="sm:col-span-2">
                    <Textarea value={store.accidentDetail.accidentCircumstances || ""} onChange={(e) => store.updateAccidentDetail({ accidentCircumstances: e.target.value })} />
                  </Field>
                  <Field label="Damage Description" className="sm:col-span-2">
                    <Textarea value={store.accidentDetail.damageDescription || ""} onChange={(e) => store.updateAccidentDetail({ damageDescription: e.target.value })} />
                  </Field>
                  <Field label="Insured's Explanation" className="sm:col-span-2">
                    <Textarea value={store.accidentDetail.insuredExplanation || ""} onChange={(e) => store.updateAccidentDetail({ insuredExplanation: e.target.value })} />
                  </Field>
                  <Field label="Assessor's Observation" className="sm:col-span-2">
                    <Textarea value={store.accidentDetail.assessorObservation || ""} onChange={(e) => store.updateAccidentDetail({ assessorObservation: e.target.value })} />
                  </Field>
                  <Field label="Damage Consistent with Accident">
                    <div className="flex items-center gap-4 py-2">
                      <label className="flex items-center gap-1.5 text-sm">
                        <input type="radio" checked={store.accidentDetail.damageConsistentWithAccident === true} onChange={() => store.updateAccidentDetail({ damageConsistentWithAccident: true })} className="text-emerald-600" />
                        Yes
                      </label>
                      <label className="flex items-center gap-1.5 text-sm">
                        <input type="radio" checked={store.accidentDetail.damageConsistentWithAccident === false} onChange={() => store.updateAccidentDetail({ damageConsistentWithAccident: false })} className="text-red-600" />
                        No
                      </label>
                    </div>
                  </Field>
                  <Field label="Consistency Note">
                    <Input value={store.accidentDetail.damageConsistencyNote || ""} onChange={(e) => store.updateAccidentDetail({ damageConsistencyNote: e.target.value })} placeholder='e.g. "Damage consistent with moderate collision on LHR side."' />
                  </Field>
                </div>
              </Section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: Photo Upload                                                */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "upload" && (
            <div className="space-y-4">
              <Section title="Vehicle & Damage Photos">
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Camera className="w-3.5 h-3.5" /> Add Photos
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
                  {store.files.length > 0 && (
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 transition"
                    >
                      {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                      Upload {store.files.length} {store.files.length === 1 ? "file" : "files"}
                      {uploading && ` (${uploadProgress.done}/${uploadProgress.total})`}
                    </button>
                  )}
                </div>

                {/* Preview grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {store.previews.map((src, i) => (
                    <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                      <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => {
                          const newPreviews = store.previews.filter((_, j) => j !== i);
                          const newFiles = store.files.filter((_, j) => j !== i);
                          store.setPreviews(newPreviews);
                          store.setFiles(newFiles);
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {store.photos.map((photo, i) => (
                    <div key={`saved-${i}`} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                      <img src={photo.path} alt={photo.originalName} className="w-full h-full object-cover" />
                      <button
                        onClick={async () => {
                          if (photo.path.startsWith("http")) {
                            await supabaseDelete(photo.path).catch(() => {});
                          }
                          store.removePhoto(i);
                          if (store.assessmentId) await saveAssessment(undefined, true);
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {store.photos.length === 0 && store.previews.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No photos uploaded yet</p>
                  </div>
                )}
              </Section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: AI Analysis                                                 */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "analyze" && (
            <div className="space-y-4">
              <Section title="AI-Powered Analysis">
                <p className="text-sm text-gray-500 mb-4">
                  Upload photos and run AI analysis to automatically detect damage and identify parts. You can also skip this step and manually enter damage details in the next step.
                </p>
                {store.photos.length === 0 && store.previews.length === 0 ? (
                  <div className="text-center py-8 bg-amber-50 rounded-lg border border-amber-200">
                    <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="text-sm text-amber-700">Upload photos in the previous step before running AI analysis.</p>
                  </div>
                ) : (
                  <button
                    onClick={async () => {
                      store.setAnalyzing(true);
                      try {
                        const imageUrls = [
                          ...store.photos.map((p) => p.path),
                          ...store.previews.filter((p) => p.startsWith("data:")),
                        ];
                        const res = await fetch("/api/analyze", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ images: imageUrls, vin: store.vehicle.vin, registrationNumber: store.vehicle.registrationNumber }),
                        });
                        const data = await res.json();
                        if (data.error) throw new Error(data.error);
                        store.setResult(data);
                        toast.success("AI analysis complete!");
                      } catch (e) {
                        toast.error("AI analysis failed");
                      }
                      store.setAnalyzing(false);
                    }}
                    disabled={store.analyzing}
                    className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition"
                  >
                    {store.analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <PenTool className="w-4 h-4" />}
                    {store.analyzing ? "Analyzing..." : "Run AI Analysis"}
                  </button>
                )}
                {store.result !== null && (
                  <>
                    <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mb-2" />
                      <p className="text-sm text-emerald-700 font-medium">Analysis complete! Review results in the Damage Assessment step.</p>
                    </div>
                    {(() => {
                      const r = store.result as Record<string, unknown>;
                      const v = r?.vehicle as Record<string, unknown> | undefined;
                      const d = r?.damage as Record<string, unknown> | undefined;
                      const parts = (r?.replacement_parts as Array<Record<string, unknown>>) || [];
                      const concerns = (r?.structural_concerns as string[]) || [];
                      const recs = (r?.recommendations as string[]) || [];
                      return (
                        <div className="mt-4 space-y-3">
                          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Vehicle Detected</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-sm">
                              {!!v?.make && <div><span className="text-gray-500">Make:</span> <span className="font-medium">{v.make as string}</span></div>}
                              {!!v?.model && <div><span className="text-gray-500">Model:</span> <span className="font-medium">{v.model as string}</span></div>}
                              {!!v?.variant && <div><span className="text-gray-500">Variant:</span> <span className="font-medium">{v.variant as string}</span></div>}
                              {!!v?.year && <div><span className="text-gray-500">Year:</span> <span className="font-medium">{v.year as string}</span></div>}
                              {!!v?.color && <div><span className="text-gray-500">Color:</span> <span className="font-medium">{v.color as string}</span></div>}
                              {!!v?.registration && <div><span className="text-gray-500">Reg:</span> <span className="font-medium">{v.registration as string}</span></div>}
                              {!!v?.body_type && <div><span className="text-gray-500">Body:</span> <span className="font-medium">{v.body_type as string}</span></div>}
                              {v?.confidence != null && <div><span className="text-gray-500">Confidence:</span> <span className="font-medium">{(v.confidence as number * 100).toFixed(0)}%</span></div>}
                            </div>
                          </div>
                          {d && (
                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                              <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Damage Assessment</h4>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5 text-sm">
                                <div><span className="text-gray-500">Severity:</span> <span className="font-medium">{d.severity as string}</span></div>
                                <div><span className="text-gray-500">Est. Cost:</span> <span className="font-medium">KSh {(d.estimated_total_cost as number).toLocaleString()}</span></div>
                                <div><span className="text-gray-500">Labor Hours:</span> <span className="font-medium">{d.estimated_total_labor_hours as string}</span></div>
                                <div><span className="text-gray-500">Structural:</span> <span className="font-medium">{d.structural_damage ? "Yes" : "No"}</span></div>
                                <div><span className="text-gray-500">Rollover:</span> <span className="font-medium">{d.rollover ? "Yes" : "No"}</span></div>
                                <div><span className="text-gray-500">Total Loss:</span> <span className="font-medium">{d.possible_total_loss ? "Possible" : "No"}</span></div>
                              </div>
                              {!!d?.summary && <p className="mt-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{d.summary as string}</p>}
                            </div>
                          )}
                          {parts.length > 0 && (
                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                              <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Detected Parts ({parts.length})</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {parts.map((p, i) => (
                                  <div key={i} className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-sm">
                                    <p className="font-medium text-gray-900">{p.partName as string}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{p.damageType as string} · {p.damageSeverity as string} · Qty: {p.estimatedQuantity as number}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {concerns.length > 0 && (
                            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                              <h4 className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Structural Concerns</h4>
                              <ul className="space-y-1">
                                {concerns.map((c, i) => <li key={i} className="text-sm text-amber-700 flex items-start gap-2"><span className="text-amber-400 mt-0.5">•</span>{c}</li>)}
                              </ul>
                            </div>
                          )}
                          {recs.length > 0 && (
                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                              <h4 className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-2">Recommendations</h4>
                              <ul className="space-y-1">
                                {recs.map((r, i) => <li key={i} className="text-sm text-blue-700 flex items-start gap-2"><span className="text-blue-400 mt-0.5">•</span>{r}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </>
                )}
              </Section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: Damage Assessment Table                                     */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "damage" && (
            <div className="space-y-4">
              <Section title="Damage Assessment">
                {!!((store.result as Record<string, unknown>)?.replacement_parts as Array<unknown> | undefined)?.length && (
                  <button
                    onClick={() => {
                      const parts = (store.result as Record<string, unknown>).replacement_parts as Array<Record<string, unknown>>;
                      const items = parts.map((p, i) => ({
                        damageArea: p.damageArea as string || "",
                        partName: p.partName as string || "",
                        side: p.side as string || "",
                        damageDescription: [p.damageType as string, p.damageSeverity as string].filter(Boolean).join(" - "),
                        actionRequired: "Replace" as const,
                        accidentRelated: true,
                        preAccidentDamage: false,
                        remarks: "",
                        sortOrder: i,
                      }));
                      store.setDamageItems(items);
                      toast.success(`${items.length} damage items filled from AI analysis`);
                    }}
                    className="mb-4 flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition"
                  >
                    <PenTool className="w-3.5 h-3.5" /> Auto-fill from AI Analysis
                  </button>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Area</th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Part</th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Side</th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Action</th>
                        <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">Accident</th>
                        <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">Pre</th>
                        <th className="px-2 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {store.damageItems.map((item, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="px-1 py-1"><Input value={item.damageArea || ""} onChange={(e) => store.updateDamageItem(i, { damageArea: e.target.value })} className="text-xs" /></td>
                          <td className="px-1 py-1"><Input value={item.partName || ""} onChange={(e) => store.updateDamageItem(i, { partName: e.target.value })} className="text-xs" /></td>
                          <td className="px-1 py-1"><Input value={item.side || ""} onChange={(e) => store.updateDamageItem(i, { side: e.target.value })} className="text-xs" placeholder="LHR" /></td>
                          <td className="px-1 py-1"><Input value={item.damageDescription || ""} onChange={(e) => store.updateDamageItem(i, { damageDescription: e.target.value })} className="text-xs" /></td>
                          <td className="px-1 py-1">
                            <Select value={item.actionRequired || ""} onChange={(e) => store.updateDamageItem(i, { actionRequired: e.target.value as never })} className="text-xs">
                              <option value="">Select</option>
                              {DAMAGE_ACTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                            </Select>
                          </td>
                          <td className="px-1 py-1 text-center">
                            <input type="checkbox" checked={item.accidentRelated} onChange={(e) => store.updateDamageItem(i, { accidentRelated: e.target.checked })} className="rounded text-emerald-600" />
                          </td>
                          <td className="px-1 py-1 text-center">
                            <input type="checkbox" checked={item.preAccidentDamage} onChange={(e) => store.updateDamageItem(i, { preAccidentDamage: e.target.checked })} className="rounded text-amber-600" />
                          </td>
                          <td className="px-1 py-1">
                            <button onClick={() => store.removeDamageItem(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={store.addDamageItem} className="flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
                  <Plus className="w-3.5 h-3.5" /> Add Damage Item
                </button>
              </Section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: Parts + Services + Cost Summary                             */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "estimate" && (
            <div className="space-y-6">
              {!!((store.result as Record<string, unknown>)?.replacement_parts as Array<unknown> | undefined)?.length && (
                <button
                  onClick={() => {
                    const r = store.result as Record<string, unknown>;
                    const parts = (r.replacement_parts as Array<Record<string, unknown>>) || [];
                    const d = r.damage as Record<string, unknown> | undefined;
                    store.setParts(parts.map((p, i) => computePartTotals({
                      partName: p.partName as string || "",
                      partNumber: p.partNumber as string || "",
                      vehicleMake: "",
                      vehicleModel: "",
                      quantity: (p.estimatedQuantity as number) || 1,
                      unitPrice: 0,
                      discountPercent: 0,
                      discountAmount: 0,
                      netPrice: 0,
                      vatPercent: 16,
                      vatAmount: 0,
                      totalPrice: 0,
                      partStatus: "Replace",
                      remarks: "",
                      sortOrder: i,
                    })));
                    const hours = d?.estimated_total_labor_hours as number | undefined;
                    if (hours && hours > 0) {
                      store.setServices([computeServiceTotals({
                        description: `Body & paint labour (${hours} hrs)`,
                        quantity: hours,
                        unitCost: 0,
                        discount: 0,
                        vat: 0,
                        totalCost: 0,
                        serviceType: "Labour",
                        remarks: "",
                        sortOrder: 0,
                      })]);
                    }
                    toast.success(`Parts and services filled from AI analysis`);
                  }}
                  className="mb-4 flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition"
                >
                  <PenTool className="w-3.5 h-3.5" /> Auto-fill Parts & Services from AI Analysis
                </button>
              )}
              {/* Parts */}
              <Section title="Parts Required">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Part Name</th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Part No.</th>
                        <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">Qty</th>
                        <th className="px-2 py-2 text-right text-xs font-medium text-gray-500">Unit Price</th>
                        <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">Disc %</th>
                        <th className="px-2 py-2 text-right text-xs font-medium text-gray-500">Disc Amt</th>
                        <th className="px-2 py-2 text-right text-xs font-medium text-gray-500">Net</th>
                        <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">VAT %</th>
                        <th className="px-2 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                        <th className="px-2 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {store.parts.map((part, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="px-1 py-1"><Input value={part.partName} onChange={(e) => store.updatePart(i, { partName: e.target.value })} className="text-xs" /></td>
                          <td className="px-1 py-1"><Input value={part.partNumber || ""} onChange={(e) => store.updatePart(i, { partNumber: e.target.value })} className="text-xs" /></td>
                          <td className="px-1 py-1"><Input type="number" min="1" value={part.quantity} onChange={(e) => store.updatePart(i, { quantity: parseInt(e.target.value) || 1 })} className="text-xs text-center" /></td>
                          <td className="px-1 py-1"><Input type="number" min="0" step="0.01" value={part.unitPrice} onChange={(e) => store.updatePart(i, { unitPrice: parseFloat(e.target.value) || 0 })} className="text-xs text-right" /></td>
                          <td className="px-1 py-1"><Input type="number" min="0" max="100" value={part.discountPercent} onChange={(e) => store.updatePart(i, { discountPercent: parseFloat(e.target.value) || 0 })} className="text-xs text-center" /></td>
                          <td className="px-1 py-1 text-xs text-right text-gray-500">{CURRENCY} {part.discountAmount.toLocaleString()}</td>
                          <td className="px-1 py-1 text-xs text-right">{CURRENCY} {part.netPrice.toLocaleString()}</td>
                          <td className="px-1 py-1"><Input type="number" min="0" max="100" value={part.vatPercent} onChange={(e) => store.updatePart(i, { vatPercent: parseFloat(e.target.value) || 0 })} className="text-xs text-center" /></td>
                          <td className="px-1 py-1 text-xs text-right font-medium">{CURRENCY} {part.totalPrice.toLocaleString()}</td>
                          <td className="px-1 py-1">
                            <Select value={part.partStatus || ""} onChange={(e) => store.updatePart(i, { partStatus: e.target.value as never })} className="text-xs">
                              <option value="">-</option>
                              {PART_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </Select>
                          </td>
                          <td className="px-1 py-1">
                            <button onClick={() => store.removePart(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={store.addPart} className="flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
                  <Plus className="w-3.5 h-3.5" /> Add Part
                </button>
              </Section>

              {/* Services */}
              <Section title="Labour & Services">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                        <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">Qty</th>
                        <th className="px-2 py-2 text-right text-xs font-medium text-gray-500">Unit Cost</th>
                        <th className="px-2 py-2 text-right text-xs font-medium text-gray-500">Discount</th>
                        <th className="px-2 py-2 text-right text-xs font-medium text-gray-500">VAT</th>
                        <th className="px-2 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                        <th className="px-2 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {store.services.map((svc, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="px-1 py-1"><Input value={svc.description} onChange={(e) => store.updateService(i, { description: e.target.value })} className="text-xs" /></td>
                          <td className="px-1 py-1"><Input type="number" min="1" value={svc.quantity} onChange={(e) => store.updateService(i, { quantity: parseInt(e.target.value) || 1 })} className="text-xs text-center" /></td>
                          <td className="px-1 py-1"><Input type="number" min="0" step="0.01" value={svc.unitCost} onChange={(e) => store.updateService(i, { unitCost: parseFloat(e.target.value) || 0 })} className="text-xs text-right" /></td>
                          <td className="px-1 py-1"><Input type="number" min="0" step="0.01" value={svc.discount} onChange={(e) => store.updateService(i, { discount: parseFloat(e.target.value) || 0 })} className="text-xs text-right" /></td>
                          <td className="px-1 py-1 text-xs text-right">{CURRENCY} {svc.vat.toLocaleString()}</td>
                          <td className="px-1 py-1 text-xs text-right font-medium">{CURRENCY} {svc.totalCost.toLocaleString()}</td>
                          <td className="px-1 py-1">
                            <Select value={svc.serviceType || ""} onChange={(e) => store.updateService(i, { serviceType: e.target.value as never })} className="text-xs">
                              <option value="">-</option>
                              {SERVICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </Select>
                          </td>
                          <td className="px-1 py-1">
                            <button onClick={() => store.removeService(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={store.addService} className="flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
                  <Plus className="w-3.5 h-3.5" /> Add Service
                </button>
              </Section>

              {/* Cost Summary */}
              {(() => {
                const cs = store.getCostSummary();
                return (
                  <Section title="Repair Cost Estimate">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2 text-sm">
                        <h4 className="font-semibold text-gray-700">Parts</h4>
                        <div className="flex justify-between"><span className="text-gray-500">Gross Total:</span><span>{CURRENCY} {cs.partsGrossTotal.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Less Discount:</span><span className="text-red-600">-{CURRENCY} {cs.partsDiscount.toLocaleString()}</span></div>
                        <div className="flex justify-between font-medium"><span>Net Parts Total:</span><span>{CURRENCY} {cs.partsNetTotal.toLocaleString()}</span></div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <h4 className="font-semibold text-gray-700">Services</h4>
                        <div className="flex justify-between"><span className="text-gray-500">Labour:</span><span>{CURRENCY} {cs.labourTotal.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Paint:</span><span>{CURRENCY} {cs.paintTotal.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Miscellaneous:</span><span>{CURRENCY} {cs.miscellaneousTotal.toLocaleString()}</span></div>
                        <div className="flex justify-between font-medium"><span>Services Subtotal:</span><span>{CURRENCY} {cs.servicesSubtotal.toLocaleString()}</span></div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Subtotal Before VAT:</span><span>{CURRENCY} {cs.subtotalBeforeVat.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">VAT (16%):</span><span>{CURRENCY} {cs.vatAmount.toLocaleString()}</span></div>
                      <div className="flex justify-between text-lg font-bold"><span>Grand Total:</span><span className="text-emerald-700">{CURRENCY} {cs.grandTotal.toLocaleString()}</span></div>
                    </div>
                  </Section>
                );
              })()}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: Remarks                                                     */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "remarks" && (
            <div className="space-y-6">
              <Section title="General Remarks">
                {!!store.result && (
                  <button
                    onClick={() => {
                      const r = store.result as Record<string, unknown>;
                      const d = r.damage as Record<string, unknown> | undefined;
                      const concerns = (r.structural_concerns as string[]) || [];
                      const recs = (r.recommendations as string[]) || [];
                      const parts = (r.replacement_parts as Array<Record<string, unknown>>) || [];
                      const lines: string[] = [];
                      if (d?.summary) lines.push(`Damage Assessment: ${d.summary}`);
                      if (concerns.length) lines.push(`Structural Concerns: ${concerns.join("; ")}`);
                      if (recs.length) lines.push(`Recommendations: ${recs.join("; ")}`);
                      store.updateRemark({ generalRemarks: lines.join("\n\n") });
                      if (parts.length) {
                        store.updateRemark({ partsToBeReplaced: parts.map((p) => `• ${p.partName}${p.damageType ? ` (${p.damageType})` : ""}`).join("\n") });
                      }
                      if (concerns.length) {
                        store.updateRemark({ preAccidentDamage: concerns.map((c) => `• ${c}`).join("\n") });
                      }
                      toast.success("Remarks generated from AI analysis");
                    }}
                    className="mb-4 flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition"
                  >
                    <PenTool className="w-3.5 h-3.5" /> Generate from AI Analysis
                  </button>
                )}
                <div className="space-y-3">
                  <Field label="General Remarks"><Textarea value={store.remark.generalRemarks || ""} onChange={(e) => store.updateRemark({ generalRemarks: e.target.value })} /></Field>
                  <Field label="Parts To Be Replaced"><Textarea value={store.remark.partsToBeReplaced || ""} onChange={(e) => store.updateRemark({ partsToBeReplaced: e.target.value })} /></Field>
                  <Field label="Parts To Be Painted"><Textarea value={store.remark.partsToBePainted || ""} onChange={(e) => store.updateRemark({ partsToBePainted: e.target.value })} /></Field>
                  <Field label="Parts Requiring Repair"><Textarea value={store.remark.partsRequiringRepair || ""} onChange={(e) => store.updateRemark({ partsRequiringRepair: e.target.value })} /></Field>
                  <Field label="Pre-Accident Damage"><Textarea value={store.remark.preAccidentDamage || ""} onChange={(e) => store.updateRemark({ preAccidentDamage: e.target.value })} /></Field>
                  <Field label="Additional Observations"><Textarea value={store.remark.additionalObservations || ""} onChange={(e) => store.updateRemark({ additionalObservations: e.target.value })} /></Field>
                </div>
              </Section>

              <Section title="Additional Damage Observations">
                {store.additionalObservations.map((obs, i) => (
                  <div key={i} className="rounded-lg border border-gray-200 p-4 mb-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">Observation {i + 1}</span>
                      <button onClick={() => store.removeAdditionalObservation(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Description"><Textarea value={obs.damageDescription || ""} onChange={(e) => { const n = [...store.additionalObservations]; n[i] = { ...n[i], damageDescription: e.target.value }; store.setAdditionalObservations(n); }} /></Field>
                      <Field label="Insured's Explanation"><Textarea value={obs.insuredExplanation || ""} onChange={(e) => { const n = [...store.additionalObservations]; n[i] = { ...n[i], insuredExplanation: e.target.value }; store.setAdditionalObservations(n); }} /></Field>
                      <Field label="Assessor's Opinion"><Textarea value={obs.assessorOpinion || ""} onChange={(e) => { const n = [...store.additionalObservations]; n[i] = { ...n[i], assessorOpinion: e.target.value }; store.setAdditionalObservations(n); }} /></Field>
                      <div className="space-y-3">
                        <Field label={`Est. Repair Cost (${CURRENCY})`}><Input type="number" min="0" value={obs.estimatedRepairCost} onChange={(e) => { const n = [...store.additionalObservations]; n[i] = { ...n[i], estimatedRepairCost: parseFloat(e.target.value) || 0, estimatedTotalCost: (parseFloat(e.target.value) || 0) + (n[i].estimatedPaintingCost || 0) }; store.setAdditionalObservations(n); }} /></Field>
                        <Field label={`Est. Painting Cost (${CURRENCY})`}><Input type="number" min="0" value={obs.estimatedPaintingCost} onChange={(e) => { const n = [...store.additionalObservations]; n[i] = { ...n[i], estimatedPaintingCost: parseFloat(e.target.value) || 0, estimatedTotalCost: (n[i].estimatedRepairCost || 0) + (parseFloat(e.target.value) || 0) }; store.setAdditionalObservations(n); }} /></Field>
                        <Field label={`Est. Total (${CURRENCY})`}><Input type="number" value={obs.estimatedTotalCost} readOnly className="bg-gray-50 font-semibold" /></Field>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={store.addAdditionalObservation} className="flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
                  <Plus className="w-3.5 h-3.5" /> Add Observation
                </button>
              </Section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: Authorization + Instructions + Signatures                   */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "authorization" && (
            <div className="space-y-6">
              <Section title="Assessment Status">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Assessment Status">
                    <Select value={store.authorization.assessmentStatus || "DRAFT"} onChange={(e) => store.updateAuthorization({ assessmentStatus: e.target.value as never })}>
                      <option value="DRAFT">Draft</option>
                      <option value="SUBMITTED">Submitted</option>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="SUPPLEMENT_REQUIRED">Supplement Required</option>
                      <option value="COMPLETED">Completed</option>
                    </Select>
                  </Field>
                  <Field label="Authorization Status">
                    <Select value={store.authorization.authorizationStatus || ""} onChange={(e) => store.updateAuthorization({ authorizationStatus: e.target.value as never })}>
                      <option value="">Select...</option>
                      <option value="Authorized">Authorized</option>
                      <option value="Not Authorized">Not Authorized</option>
                      <option value="Pending Authorization">Pending Authorization</option>
                    </Select>
                  </Field>
                  <Field label="Authorized">
                    <div className="flex items-center gap-4 py-2">
                      <label className="flex items-center gap-1.5 text-sm">
                        <input type="radio" checked={store.authorization.authorized === true} onChange={() => store.updateAuthorization({ authorized: true })} /> Yes
                      </label>
                      <label className="flex items-center gap-1.5 text-sm">
                        <input type="radio" checked={store.authorization.authorized === false} onChange={() => store.updateAuthorization({ authorized: false })} /> No
                      </label>
                    </div>
                  </Field>
                  <Field label="Copy to Repairer">
                    <div className="flex items-center gap-4 py-2">
                      <label className="flex items-center gap-1.5 text-sm">
                        <input type="radio" checked={store.authorization.copyToRepairer === true} onChange={() => store.updateAuthorization({ copyToRepairer: true })} /> Yes
                      </label>
                      <label className="flex items-center gap-1.5 text-sm">
                        <input type="radio" checked={store.authorization.copyToRepairer === false} onChange={() => store.updateAuthorization({ copyToRepairer: false })} /> No
                      </label>
                    </div>
                  </Field>
                  <Field label={`Salvage Value (${CURRENCY})`}>
                    <Input type="number" min="0" step="0.01" value={store.authorization.salvageValue || ""} onChange={(e) => store.updateAuthorization({ salvageValue: parseFloat(e.target.value) || undefined })} />
                  </Field>
                  <Field label={`Pre-Accident Value (${CURRENCY})`}>
                    <Input type="number" min="0" step="0.01" value={store.authorization.preAccidentValue || ""} onChange={(e) => store.updateAuthorization({ preAccidentValue: parseFloat(e.target.value) || undefined })} />
                  </Field>
                </div>
              </Section>

              <Section title="Special Repair Instructions">
                <div className="space-y-2">
                  {store.specialInstructions.map((si, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-xs text-gray-400 mt-2.5">{i + 1}.</span>
                      <Input value={si.instruction} onChange={(e) => {
                        const n = [...store.specialInstructions];
                        n[i] = { ...n[i], instruction: e.target.value };
                        store.setSpecialInstructions(n);
                      }} className="flex-1" />
                      <button onClick={() => store.removeSpecialInstruction(i)} className="mt-1 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input value={newInstruction} onChange={(e) => setNewInstruction(e.target.value)} placeholder="Add instruction..." className="flex-1" />
                    <button
                      onClick={() => { if (newInstruction.trim()) { store.addSpecialInstruction(newInstruction.trim()); setNewInstruction(""); } }}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Section>

              <Section title="Signatures">
                {store.signatures.map((sig, i) => (
                  <div key={i} className="rounded-lg border border-gray-200 p-4 mb-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">{sig.role} Signature</span>
                      <button onClick={() => store.removeSignature(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Name"><Input value={sig.name || ""} onChange={(e) => store.updateSignature(i, { name: e.target.value })} /></Field>
                      <Field label="License No."><Input value={sig.licenseNumber || ""} onChange={(e) => store.updateSignature(i, { licenseNumber: e.target.value })} /></Field>
                      <Field label="Organization"><Input value={sig.organization || ""} onChange={(e) => store.updateSignature(i, { organization: e.target.value })} /></Field>
                      <Field label="Phone"><Input value={sig.phone || ""} onChange={(e) => store.updateSignature(i, { phone: e.target.value })} /></Field>
                      <Field label="Date"><DatePicker value={sig.signatureDate || ""} onChange={(v) => store.updateSignature(i, { signatureDate: v })} /></Field>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2">
                  <button onClick={() => store.addSignature("ASSESSOR")} className="flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
                    <Plus className="w-3.5 h-3.5" /> Assessor Signature
                  </button>
                  <button onClick={() => store.addSignature("REPAIRER")} className="flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
                    <Plus className="w-3.5 h-3.5" /> Repairer Signature
                  </button>
                </div>
              </Section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: Payment                                                     */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "payment" && !isAdmin && (
            <div className="space-y-4">
              <Section title="Assessment Payment">
                {store.paid ? (
                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-emerald-800">Payment Confirmed</h3>
                    <p className="text-sm text-emerald-600 mt-1">Your assessment has been paid. You can now view the full results.</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Fee</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-4">
                      {loadingPrice ? "..." : `${CURRENCY} ${paymentAmount.toLocaleString()}`}
                    </p>
                    <p className="text-sm text-gray-500 mb-6">Pay to access the full assessment report and PDF download.</p>
                    <button
                      onClick={handlePayment}
                      disabled={store.paying}
                      className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
                    >
                      {store.paying ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> : null}
                      {store.paying ? "Processing..." : `Pay ${CURRENCY} ${paymentAmount.toLocaleString()}`}
                    </button>
                  </div>
                )}
              </Section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* STEP: Results                                                     */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {store.step === "results" && (
            <div className="space-y-8">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">ASSESSMENT REPORT</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                  <div><span className="text-gray-500">Assessment No:</span> <span className="font-medium">{store.assessmentId?.slice(0, 8)}...</span></div>
                  <div><span className="text-gray-500">Insured:</span> <span className="font-medium">{store.claim.insuredName || "N/A"}</span></div>
                  <div><span className="text-gray-500">Policy No:</span> <span className="font-medium">{store.claim.policyNumber || "N/A"}</span></div>
                  <div><span className="text-gray-500">Registration:</span> <span className="font-medium">{store.vehicle.registrationNumber || "N/A"}</span></div>
                  <div><span className="text-gray-500">Claim No:</span> <span className="font-medium">{store.claim.claimNumber || "N/A"}</span></div>
                  <div><span className="text-gray-500">Assessment Date:</span> <span className="font-medium">{store.feeNote.assessmentDate || "N/A"}</span></div>
                  <div><span className="text-gray-500">Status:</span> <span className="font-medium">{store.authorization.assessmentStatus || "DRAFT"}</span></div>
                  <div><span className="text-gray-500">Grand Total:</span> <span className="font-bold text-emerald-700">{formatCurrency(store.getCostSummary().grandTotal)}</span></div>
                </div>
              </div>

              {/* 1. Fee Note */}
              <Section title="1. Assessment / Fee Note">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Reference Number:</span> <span className="font-medium">{store.feeNote.referenceNumber || "N/A"}</span></div>
                  <div><span className="text-gray-500">Assessment Date:</span> <span className="font-medium">{store.feeNote.assessmentDate || "N/A"}</span></div>
                  <div><span className="text-gray-500">Professional Fee:</span> <span className="font-medium">{formatCurrency(store.feeNote.professionalFee)}</span></div>
                  <div><span className="text-gray-500">VAT:</span> <span className="font-medium">{formatCurrency(store.feeNote.vat)}</span></div>
                  <div><span className="text-gray-500">Reimbursement:</span> <span className="font-medium">{formatCurrency(store.feeNote.reimbursement)}</span></div>
                  <div><span className="text-gray-500">Total Professional Fee:</span> <span className="font-medium">{formatCurrency(store.feeNote.totalProfessionalFee)}</span></div>
                </div>
              </Section>

              {/* 2. Insurance & 3. Claim Details */}
              <Section title="2. Claim Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Claim Number:</span> <span className="font-medium">{store.claim.claimNumber || "N/A"}</span></div>
                  <div><span className="text-gray-500">Insured Name:</span> <span className="font-medium">{store.claim.insuredName || "N/A"}</span></div>
                  <div><span className="text-gray-500">Insured Phone:</span> <span className="font-medium">{store.claim.insuredPhone || "N/A"}</span></div>
                  <div><span className="text-gray-500">Insured Email:</span> <span className="font-medium">{store.claim.insuredEmail || "N/A"}</span></div>
                  <div><span className="text-gray-500">Insured Address:</span> <span className="font-medium">{store.claim.insuredAddress || "N/A"}</span></div>
                  <div><span className="text-gray-500">Policy Number:</span> <span className="font-medium">{store.claim.policyNumber || "N/A"}</span></div>
                  <div><span className="text-gray-500">Sum Insured:</span> <span className="font-medium">{store.claim.sumInsured ? formatCurrency(store.claim.sumInsured) : "N/A"}</span></div>
                  <div><span className="text-gray-500">Excess:</span> <span className="font-medium">{store.claim.excessPercentage ? `${store.claim.excessPercentage}%` : "N/A"}</span></div>
                  <div><span className="text-gray-500">Date of Instruction:</span> <span className="font-medium">{store.claim.dateOfInstruction || "N/A"}</span></div>
                  <div><span className="text-gray-500">Date of Assessment:</span> <span className="font-medium">{store.claim.dateOfAssessment || "N/A"}</span></div>
                </div>
              </Section>

              {/* 4. Vehicle Details */}
              <Section title="3. Vehicle Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Registration:</span> <span className="font-medium">{store.vehicle.registrationNumber || "N/A"}</span></div>
                  <div><span className="text-gray-500">Colour:</span> <span className="font-medium">{store.vehicle.colour || "N/A"}</span></div>
                  <div><span className="text-gray-500">Year of Manufacture:</span> <span className="font-medium">{store.vehicle.yearOfManufacture || "N/A"}</span></div>
                  <div><span className="text-gray-500">Engine Number:</span> <span className="font-medium">{store.vehicle.engineNumber || "N/A"}</span></div>
                  <div><span className="text-gray-500">Chassis / VIN:</span> <span className="font-medium">{store.vehicle.chassisNumber || store.vehicle.vin || "N/A"}</span></div>
                  <div><span className="text-gray-500">Mileage:</span> <span className="font-medium">{store.vehicle.mileage || "N/A"}</span></div>
                  <div><span className="text-gray-500">Engine Type:</span> <span className="font-medium">{store.vehicle.engineType || "N/A"}</span></div>
                  <div><span className="text-gray-500">Mode of Transport:</span> <span className="font-medium">{store.vehicle.modeOfTransport || "N/A"}</span></div>
                </div>
              </Section>

              {/* 5. Vehicle Condition */}
              <Section title="4. Vehicle Condition">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Overall Condition:</span> <span className="font-medium">{store.vehicleCondition.overallCondition || "N/A"}</span></div>
                  <div><span className="text-gray-500">Tyre Brand:</span> <span className="font-medium">{store.vehicleCondition.tyreBrand || "N/A"}</span></div>
                  <div><span className="text-gray-500">Tyre Size:</span> <span className="font-medium">{store.vehicleCondition.tyreSize || "N/A"}</span></div>
                  <div><span className="text-gray-500">Spare Tyre:</span> <span className="font-medium">{store.vehicleCondition.spareTyreCondition || "N/A"}</span></div>
                  <div><span className="text-gray-500">Mechanical:</span> <span className="font-medium">{store.vehicleCondition.mechanicalCondition || "N/A"}</span></div>
                  <div><span className="text-gray-500">Interior:</span> <span className="font-medium">{store.vehicleCondition.interiorCondition || "N/A"}</span></div>
                  <div><span className="text-gray-500">Exterior:</span> <span className="font-medium">{store.vehicleCondition.exteriorCondition || "N/A"}</span></div>
                </div>
                {store.vehicleCondition.tyres.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-2">Tyre Conditions:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {store.vehicleCondition.tyres.map((t, i) => (
                        <div key={i} className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2 text-xs">
                          <span className="font-medium text-gray-700">{t.position}:</span> <span className="text-gray-500">{t.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Section>

              {/* 6. Accident Details */}
              <Section title="5. Accident Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Accident Date:</span> <span className="font-medium">{store.accidentDetail.accidentDate || "N/A"}</span></div>
                  <div><span className="text-gray-500">Location:</span> <span className="font-medium">{store.accidentDetail.accidentLocation || "N/A"}</span></div>
                  <div><span className="text-gray-500">Damage Consistent:</span> <span className="font-medium">{store.accidentDetail.damageConsistentWithAccident ? "Yes" : "No"}</span></div>
                </div>
                {store.accidentDetail.accidentDescription && <p className="mt-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3"><span className="font-medium text-gray-500">Description:</span> {store.accidentDetail.accidentDescription}</p>}
                {store.accidentDetail.insuredExplanation && <p className="mt-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3"><span className="font-medium text-gray-500">Insured's Explanation:</span> {store.accidentDetail.insuredExplanation}</p>}
                {store.accidentDetail.assessorObservation && <p className="mt-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3"><span className="font-medium text-gray-500">Assessor's Observation:</span> {store.accidentDetail.assessorObservation}</p>}
              </Section>

              {/* 7. Damage Assessment */}
              {store.damageItems.length > 0 && (
                <Section title="6. Damage Assessment">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-3 py-2 font-medium text-gray-600">Area</th>
                          <th className="text-left px-3 py-2 font-medium text-gray-600">Part</th>
                          <th className="text-left px-3 py-2 font-medium text-gray-600">Side</th>
                          <th className="text-left px-3 py-2 font-medium text-gray-600">Description</th>
                          <th className="text-left px-3 py-2 font-medium text-gray-600">Action</th>
                          <th className="text-center px-3 py-2 font-medium text-gray-600">Accident</th>
                          <th className="text-center px-3 py-2 font-medium text-gray-600">Pre-Accident</th>
                        </tr>
                      </thead>
                      <tbody>
                        {store.damageItems.map((d, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                            <td className="px-3 py-2 text-gray-900">{d.damageArea || "-"}</td>
                            <td className="px-3 py-2 text-gray-900">{d.partName || "-"}</td>
                            <td className="px-3 py-2 text-gray-900">{d.side || "-"}</td>
                            <td className="px-3 py-2 text-gray-900 max-w-[200px] truncate">{d.damageDescription || "-"}</td>
                            <td className="px-3 py-2"><span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{d.actionRequired || "-"}</span></td>
                            <td className="px-3 py-2 text-center">{d.accidentRelated ? <span className="text-emerald-600">Yes</span> : <span className="text-red-500">No</span>}</td>
                            <td className="px-3 py-2 text-center">{d.preAccidentDamage ? <span className="text-amber-600">Yes</span> : <span className="text-gray-400">No</span>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>
              )}

              {/* 8. Parts Required */}
              {store.parts.length > 0 && (
                <Section title="7. Parts Required">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-2 py-2 font-medium text-gray-600">Part</th>
                          <th className="text-left px-2 py-2 font-medium text-gray-600">Part No.</th>
                          <th className="text-center px-2 py-2 font-medium text-gray-600">Qty</th>
                          <th className="text-right px-2 py-2 font-medium text-gray-600">Unit Price</th>
                          <th className="text-right px-2 py-2 font-medium text-gray-600">Disc. %</th>
                          <th className="text-right px-2 py-2 font-medium text-gray-600">Discount</th>
                          <th className="text-right px-2 py-2 font-medium text-gray-600">Net Price</th>
                          <th className="text-right px-2 py-2 font-medium text-gray-600">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {store.parts.map((p, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                            <td className="px-2 py-2 text-gray-900">{p.partName || "-"}</td>
                            <td className="px-2 py-2 text-gray-500">{p.partNumber || "-"}</td>
                            <td className="px-2 py-2 text-center">{p.quantity}</td>
                            <td className="px-2 py-2 text-right">{formatCurrency(p.unitPrice)}</td>
                            <td className="px-2 py-2 text-right">{p.discountPercent}%</td>
                            <td className="px-2 py-2 text-right text-red-600">{formatCurrency(p.discountAmount)}</td>
                            <td className="px-2 py-2 text-right">{formatCurrency(p.netPrice)}</td>
                            <td className="px-2 py-2 text-right font-medium">{formatCurrency(p.totalPrice)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>
              )}

              {/* 9. Services */}
              {store.services.length > 0 && (
                <Section title="8. Labour & Services">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-2 py-2 font-medium text-gray-600">Description</th>
                          <th className="text-center px-2 py-2 font-medium text-gray-600">Qty</th>
                          <th className="text-right px-2 py-2 font-medium text-gray-600">Unit Cost</th>
                          <th className="text-right px-2 py-2 font-medium text-gray-600">Discount</th>
                          <th className="text-right px-2 py-2 font-medium text-gray-600">Total</th>
                          <th className="text-left px-2 py-2 font-medium text-gray-600">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {store.services.map((s, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                            <td className="px-2 py-2 text-gray-900">{s.description || "-"}</td>
                            <td className="px-2 py-2 text-center">{s.quantity}</td>
                            <td className="px-2 py-2 text-right">{formatCurrency(s.unitCost)}</td>
                            <td className="px-2 py-2 text-right text-red-600">{formatCurrency(s.discount)}</td>
                            <td className="px-2 py-2 text-right font-medium">{formatCurrency(s.totalCost)}</td>
                            <td className="px-2 py-2"><span className="rounded-full bg-gray-100 px-2 py-0.5">{s.serviceType || "-"}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>
              )}

              {/* 10. Cost Summary */}
              <Section title="9. Repair Cost Estimate">
                {(() => { const cs = store.getCostSummary(); return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-700">Parts</p>
                      <div className="space-y-1 text-gray-600">
                        <p>Gross Total: <span className="font-medium">{formatCurrency(cs.partsGrossTotal)}</span></p>
                        <p>Less Discount: <span className="font-medium text-red-600">{formatCurrency(cs.partsDiscount)}</span></p>
                        <p>Net Parts Total: <span className="font-medium">{formatCurrency(cs.partsNetTotal)}</span></p>
                      </div>
                      <p className="font-semibold text-gray-700 mt-3">Services</p>
                      <div className="space-y-1 text-gray-600">
                        <p>Labour: <span className="font-medium">{formatCurrency(cs.labourTotal)}</span></p>
                        <p>Paint: <span className="font-medium">{formatCurrency(cs.paintTotal)}</span></p>
                        <p>Miscellaneous: <span className="font-medium">{formatCurrency(cs.miscellaneousTotal)}</span></p>
                        <p>Services Subtotal: <span className="font-medium">{formatCurrency(cs.servicesSubtotal)}</span></p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-700">Final Estimate</p>
                      <div className="space-y-1 text-gray-600">
                        <p>Parts Subtotal: <span className="font-medium">{formatCurrency(cs.partsSubtotal)}</span></p>
                        <p>Services Subtotal: <span className="font-medium">{formatCurrency(cs.servicesSubtotal)}</span></p>
                        <p>Subtotal Before VAT: <span className="font-medium">{formatCurrency(cs.subtotalBeforeVat)}</span></p>
                        <p>VAT (16%): <span className="font-medium">{formatCurrency(cs.vatAmount)}</span></p>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-base font-bold text-emerald-700">Grand Total: {formatCurrency(cs.grandTotal)}</p>
                      </div>
                    </div>
                  </div>
                ); })()}
              </Section>

              {/* 11. Remarks */}
              {(store.remark.generalRemarks || store.remark.partsToBeReplaced || store.remark.partsToBePainted || store.remark.partsRequiringRepair || store.remark.preAccidentDamage || store.remark.additionalObservations) && (
                <Section title="10. General Remarks">
                  <div className="space-y-2 text-sm">
                    {store.remark.generalRemarks && <p><span className="font-medium text-gray-500">General:</span> {store.remark.generalRemarks}</p>}
                    {store.remark.partsToBeReplaced && <p><span className="font-medium text-gray-500">Parts To Be Replaced:</span> {store.remark.partsToBeReplaced}</p>}
                    {store.remark.partsToBePainted && <p><span className="font-medium text-gray-500">Parts To Be Painted:</span> {store.remark.partsToBePainted}</p>}
                    {store.remark.partsRequiringRepair && <p><span className="font-medium text-gray-500">Parts Requiring Repair:</span> {store.remark.partsRequiringRepair}</p>}
                    {store.remark.preAccidentDamage && <p><span className="font-medium text-gray-500">Pre-Accident Damage:</span> {store.remark.preAccidentDamage}</p>}
                    {store.remark.additionalObservations && <p><span className="font-medium text-gray-500">Additional Observations:</span> {store.remark.additionalObservations}</p>}
                  </div>
                </Section>
              )}

              {/* 12. Additional Observations */}
              {store.additionalObservations.length > 0 && (
                <Section title="11. Additional Damage Observations">
                  {store.additionalObservations.map((o, i) => (
                    <div key={i} className="rounded-lg bg-gray-50 border border-gray-100 p-3 mb-2 last:mb-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div><span className="text-gray-500">Description:</span> <span className="font-medium">{o.damageDescription || "N/A"}</span></div>
                        <div><span className="text-gray-500">Accident Related:</span> <span className="font-medium">{o.accidentRelated ? "Yes" : "No"}</span></div>
                        {o.insuredExplanation && <div className="sm:col-span-2"><span className="text-gray-500">Insured's Explanation:</span> <span className="font-medium">{o.insuredExplanation}</span></div>}
                        {o.assessorOpinion && <div className="sm:col-span-2"><span className="text-gray-500">Assessor's Opinion:</span> <span className="font-medium">{o.assessorOpinion}</span></div>}
                        <div><span className="text-gray-500">Est. Repair Cost:</span> <span className="font-medium">{formatCurrency(o.estimatedRepairCost)}</span></div>
                        <div><span className="text-gray-500">Est. Painting Cost:</span> <span className="font-medium">{formatCurrency(o.estimatedPaintingCost)}</span></div>
                        <div><span className="text-gray-500">Est. Total:</span> <span className="font-medium">{formatCurrency(o.estimatedTotalCost)}</span></div>
                      </div>
                    </div>
                  ))}
                </Section>
              )}

              {/* 13. Authorization */}
              <Section title="12. Assessment Authorization">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Authorized:</span> <span className="font-medium">{store.authorization.authorized ? "Yes" : "No"}</span></div>
                  <div><span className="text-gray-500">Status:</span> <span className="font-medium">{store.authorization.authorizationStatus}</span></div>
                  <div><span className="text-gray-500">Copy To Repairer:</span> <span className="font-medium">{store.authorization.copyToRepairer ? "Yes" : "No"}</span></div>
                  <div><span className="text-gray-500">Salvage Value:</span> <span className="font-medium">{store.authorization.salvageValue ? formatCurrency(store.authorization.salvageValue) : "N/A"}</span></div>
                  <div><span className="text-gray-500">Pre-Accident Value:</span> <span className="font-medium">{store.authorization.preAccidentValue ? formatCurrency(store.authorization.preAccidentValue) : "N/A"}</span></div>
                </div>
              </Section>

              {/* 14. Special Instructions */}
              {store.specialInstructions.length > 0 && (
                <Section title="13. Special Repair Instructions">
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {store.specialInstructions.map((si, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{si.instruction}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* 15. Signatures */}
              {store.signatures.length > 0 && (
                <Section title="14. Signatures">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {store.signatures.map((sig, i) => (
                      <div key={i} className="rounded-xl border border-gray-200 p-4">
                        <p className="text-sm font-semibold text-gray-900 mb-2">{sig.role}</p>
                        <div className="space-y-1 text-xs text-gray-600">
                          <p>Name: <span className="font-medium text-gray-800">{sig.name || "N/A"}</span></p>
                          <p>License: <span className="font-medium text-gray-800">{sig.licenseNumber || "N/A"}</span></p>
                          <p>Organization: <span className="font-medium text-gray-800">{sig.organization || "N/A"}</span></p>
                          <p>Date: <span className="font-medium text-gray-800">{sig.signatureDate || "N/A"}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* AI Analysis Result */}
              {store.result != null && (
                <Section title="AI Analysis Result">
                  <pre className="text-xs text-gray-700 bg-gray-50 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
                    {JSON.stringify(store.result, null, 2)}
                  </pre>
                </Section>
              )}

              {/* Photos — always at the bottom */}
              {store.photos.length > 0 && (
                <Section title="Uploaded Vehicle / Damage Images">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {store.photos.map((p, i) => (
                      <a key={p.id || i} href={p.path} target="_blank" rel="noopener noreferrer" className="group relative block rounded-lg overflow-hidden border border-gray-200 bg-gray-50 hover:border-gray-400 transition">
                        <div className="aspect-[4/3]">
                          <img
                            src={p.path}
                            alt={p.caption || `Photo ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <p className="text-xs text-white truncate">{p.caption || `Image ${i + 1}`}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </Section>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleDownloadPdf}
                  disabled={store.downloadingPdf || !store.assessmentId}
                  className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {store.downloadingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  {store.downloadingPdf ? "Generating..." : "Download PDF Report"}
                </button>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={visibleSteps.findIndex((s) => s.key === store.step) === 0}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={advanceStep}
            disabled={!canAdvance() || store.step === "results" || store.saving}
            className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition disabled:opacity-40"
          >
            {store.saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {store.saving ? "Saving..." : "Save & Next"} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
