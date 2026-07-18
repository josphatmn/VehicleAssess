"use client";

import Link from "next/link";
import {
  Camera,
  BarChart3,
  FileText,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { VantaBg } from "@/components/vanta-bg";

const features = [
  {
    icon: Camera,
    title: "Upload Photos",
    desc: "Snap and upload photos of the damaged vehicle from any angle. Supports drag-and-drop for quick workflow.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: BarChart3,
    title: "AI Analysis",
    desc: "Our AI instantly analyzes damage severity, identifies affected parts, and estimates repair costs.",
    gradient: "from-indigo-500 to-purple-400",
  },
  {
    icon: FileText,
    title: "Detailed Report",
    desc: "Get a comprehensive repair estimate with part-by-part pricing from verified suppliers.",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: CheckCircle,
    title: "Verify & Save",
    desc: "Review and confirm AI results before finalizing. Full control over every line item.",
    gradient: "from-amber-500 to-orange-400",
  },
];

const steps = [
  { num: "01", title: "Enter Details", desc: "Provide basic customer and vehicle information." },
  { num: "02", title: "Upload Images", desc: "Take or upload photos of the damaged areas." },
  { num: "03", title: "AI Scans Damage", desc: "Our model identifies every damaged part instantly." },
  { num: "04", title: "Verify & Report", desc: "Review results, make edits, and save the report." },
];

const stats = [
  { value: "2.1s", label: "Avg Analysis Time", icon: Clock },
  { value: "97%", label: "Accuracy Rate", icon: Zap },
  { value: "50+", label: "Parts Detected", icon: Shield },
  { value: "10K+", label: "Reports Generated", icon: Star },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          HERO — Dark background with Vanta NET effect
          ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <VantaBg
          effect="net"
          options={{ color: 0x3b82f6, backgroundColor: 0x0f172a, points: 11.0, maxDistance: 24.0, spacing: 16.0 }}
        />

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-[1]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-8">
              <Zap className="w-3 h-3" />
              AI-Powered Assessments
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Instantly
              <br />
              analyze
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                vehicle damage
              </span>
            </h1>
            <p className="mt-8 text-lg text-slate-400 max-w-lg leading-relaxed">
              Upload vehicle photos and let our AI identify damaged parts, estimate repair costs,
              and generate professional reports in seconds.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/analyze"
                className="animate-pulse-glow inline-flex items-center gap-2.5 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:scale-105"
              >
                Analyze Now <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur"
              >
                Learn More
              </a>
            </div>

            {/* Floating stat badges */}
            <div className="mt-14 flex flex-wrap gap-6">
              {[
                { label: "Analysis Time", value: "2.1s" },
                { label: "Accuracy", value: "97%" },
                { label: "Parts Detected", value: "50+" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`animate-fade-in-up animate-delay-${(i + 2) * 100} animate-float`}
                  style={{ animationDelay: `${(i + 2) * 200}ms`, animationDuration: `${3 + i * 0.5}s` }}
                >
                  <p className="text-2xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual — car image with overlay */}
          <div className="relative hidden lg:block animate-fade-in-right animate-delay-300">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80"
                alt="Vehicle on road"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Damage Detected</p>
                    <p className="text-xs text-slate-300">3 parts identified in 2.1s</p>
                  </div>
                  <div className="ml-auto flex gap-1.5">
                    {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                      <div key={i} className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: c, animationDelay: `${i * 300}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-200">AI Confidence</p>
                  <p className="text-lg font-black text-white">97%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRUST BAR
          ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <span className="text-sm font-medium text-gray-400 mr-4">Trusted by industry leaders</span>
          {["Toyota", "Nissan", "Mazda", "Ford", "Isuzu", "Mitsubishi"].map((m, i) => (
            <span
              key={m}
              className="px-5 py-2 rounded-full border border-gray-200 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 cursor-default"
            >
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURES — Glassmorphism cards
          ═══════════════════════════════════════════════════════ */}
      <section id="features" className="relative py-28 md:py-36 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600">Features</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-gray-900">
              Everything you need
            </h2>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              A complete toolkit for vehicle damage assessment — from photo upload to final report.
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`animate-fade-in-up animate-delay-${(i + 1) * 100} group relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 transition-all duration-500`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS — Dark section with Vanta GLOBE
          ═══════════════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <VantaBg
          effect="globe"
          options={{ color: 0x3b82f6, backgroundColor: 0x0f172a, points: 10.0, maxDistance: 20.0, spacing: 14.0 }}
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Built for speed & accuracy
            </h2>
            <p className="mt-5 text-lg text-slate-400">
              Trusted by assessors across the country
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`animate-fade-in-up animate-delay-${(i + 1) * 100} text-center p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300`}
              >
                <s.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-black text-white">{s.value}</p>
                <p className="mt-2 text-sm text-slate-400 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          IMAGE SHOWCASE — Consistent grid
          ═══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-in-up">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600">Gallery</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-gray-900">
              See it in action
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=700&q=80", label: "Damage Identification" },
              { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=80", label: "Professional Reports" },
              { src: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=700&q=80", label: "Instant Estimates" },
            ].map((img, i) => (
              <div
                key={img.label}
                className={`animate-fade-in-up animate-delay-${(i + 1) * 200} relative rounded-3xl overflow-hidden h-72 md:h-96 group cursor-pointer`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold">
                    {img.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS — Connected steps
          ═══════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-28 md:py-36 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600">How It Works</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-gray-900">
              Four simple steps
            </h2>
            <p className="mt-5 text-lg text-gray-500">
              From photo to report in under a minute.
            </p>
          </div>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Connection line */}
            <div className="absolute top-16 left-[12%] right-[12%] h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 hidden lg:block" />

            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`animate-fade-in-up animate-delay-${(i + 1) * 100} relative text-center`}
              >
                <div className="relative z-10 w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  {s.num}
                </div>
                <h3 className="mt-6 text-lg font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA — Dark section with Vanta WAVES
          ═══════════════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <VantaBg
          effect="waves"
          options={{ color: 0x1e40af, backgroundColor: 0x0f172a, shininess: 40, waveHeight: 20.0, waveSpeed: 0.8, zoom: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-indigo-900/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight animate-fade-in-up">
            Ready to get started?
          </h2>
          <p className="mt-6 text-xl text-blue-200 max-w-lg mx-auto animate-fade-in-up animate-delay-200">
            Analyze your first vehicle in seconds. No sign-up required for quick assessments.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up animate-delay-400">
            <Link
              href="/analyze"
              className="animate-pulse-glow inline-flex items-center gap-2.5 px-10 py-4 text-sm font-bold text-blue-900 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl shadow-white/20 hover:scale-105"
            >
              Start Free Analysis <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-10 py-4 text-sm font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════ */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-blue-500/30">
                VA
              </div>
              <span className="text-lg font-bold text-white">VehicleAssess</span>
            </div>
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} VehicleAssess. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-slate-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
