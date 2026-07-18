"use client";

import { ClipboardCheck, Clock, CheckCircle, CreditCard, TrendingUp } from "lucide-react";
import type { DashboardStats } from "@/types";

interface StatsCardsProps {
  stats: DashboardStats;
}

const cards = [
  {
    key: "totalAssessments" as const,
    title: "Total Assessments",
    icon: ClipboardCheck,
    description: "All assessments in system",
    gradient: "from-blue-500 to-blue-600",
    ring: "ring-blue-500/20",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    key: "pendingVerification" as const,
    title: "Pending Review",
    icon: Clock,
    description: "Awaiting manual verification",
    gradient: "from-amber-500 to-orange-500",
    ring: "ring-amber-500/20",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    key: "completedAssessments" as const,
    title: "Completed",
    icon: CheckCircle,
    description: "Fully completed assessments",
    gradient: "from-emerald-500 to-green-600",
    ring: "ring-emerald-500/20",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    key: "totalRevenue" as const,
    title: "Total Revenue",
    icon: CreditCard,
    description: "From report payments",
    gradient: "from-violet-500 to-purple-600",
    ring: "ring-violet-500/20",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    isCurrency: true,
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <div
          key={card.key}
          className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 animate-fade-in-up animate-delay-${(i + 1) * 100}`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-3xl font-bold tracking-tight text-gray-900">
                {card.isCurrency
                  ? `KES ${stats[card.key].toLocaleString()}`
                  : stats[card.key].toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">{card.description}</p>
            </div>
            <div className={`rounded-xl ${card.bg} p-2.5 ring-1 ${card.ring} transition-transform duration-300 group-hover:scale-110`}>
              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
            </div>
          </div>
          <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${card.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
        </div>
      ))}
    </div>
  );
}
