"use client";

import Link from "next/link";
import { Camera, BarChart3, FileText, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";

const features = [
  {
    icon: Camera,
    title: "Upload Photos",
    desc: "Snap and upload photos of the damaged vehicle from any angle.",
  },
  {
    icon: BarChart3,
    title: "AI Analysis",
    desc: "Our AI instantly analyzes damage severity and affected parts.",
  },
  {
    icon: FileText,
    title: "Detailed Report",
    desc: "Get a comprehensive repair estimate with verified line items.",
  },
  {
    icon: CheckCircle,
    title: "Verify & Save",
    desc: "Review and confirm the AI results before finalizing the report.",
  },
];

const steps = [
  { num: "01", title: "Enter Details", desc: "Provide basic customer and vehicle information." },
  { num: "02", title: "Upload Images", desc: "Take or upload photos of the damaged areas." },
  { num: "03", title: "AI Scans Damage", desc: "Our model identifies every damaged part instantly." },
  { num: "04", title: "Verify & Report", desc: "Review results, make edits, and save the report." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
            alt="Car on road"
            className="w-full h-full object-cover opacity-[0.06]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 rounded-full mb-6">
              AI-Powered Assessments
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Instantly analyze
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                vehicle damage
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 max-w-lg leading-relaxed">
              Upload vehicle photos and let our AI identify damaged parts, estimate repair costs,
              and generate professional reports in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25"
              >
                Analyze Now <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80"
                alt="Vehicle on road"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 backdrop-blur rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Damage Detected</p>
                    <p className="text-xs text-gray-500">3 parts identified in 2.1s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Trust bar */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm font-medium text-gray-400">
          <span>Trusted by</span>
          {["Toyota", "Nissan", "Mazda", "Ford", "Isuzu", "Mitsubishi"].map((m) => (
            <span key={m} className="text-gray-300 tracking-wider uppercase text-xs">{m}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600">Features</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Everything you need
            </h2>
            <p className="mt-4 text-gray-500">
              A complete toolkit for vehicle damage assessment — from photo upload to final report.
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
                  <f.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image showcase */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 group">
              <img
                src="https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=600&q=80"
                alt="Car repair"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-semibold text-sm">Damage Identification</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 group md:row-span-2">
              <img
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80"
                alt="Vehicle inspection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-semibold text-sm">Professional Reports</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 group">
              <img
                src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=600&q=80"
                alt="Mechanic at work"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-semibold text-sm">Instant Estimates</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600">How It Works</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Four simple steps
            </h2>
            <p className="mt-4 text-gray-500">
              From photo to report in under a minute.
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="relative">
                <span className="text-5xl font-extrabold text-gray-100">{s.num}</span>
                <h3 className="mt-3 font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Ready to get started?
              </h2>
              <p className="mt-4 text-blue-100 max-w-md mx-auto">
                Analyze your first vehicle in seconds. No sign-up required for quick assessments.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-700 bg-white rounded-lg hover:bg-blue-50 transition shadow-lg"
                >
                  Start Free Analysis <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {}}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/30 rounded-lg hover:bg-white/10 transition"
                >
                  Staff Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2 font-semibold text-gray-600">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">VA</div>
            VehicleAssess
          </div>
          <p>&copy; {new Date().getFullYear()} VehicleAssess. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600 transition">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
