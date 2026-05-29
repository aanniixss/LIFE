"use client"

import { useEffect, useState } from "react"
import { HABITS, CATEGORY_LABELS, CATEGORY_COLORS, type Habit } from "@/lib/types"
import { getStorage } from "@/lib/utils"
import { CheckCircle2, Circle, RefreshCw } from "lucide-react"
import BatmanLogo from "@/components/BatmanLogo"

const TOTAL_WEIGHT = HABITS.reduce((s, h) => s + h.weight, 0)
function computeScore(checked: Record<string, boolean>): number {
  const earned = HABITS.filter((h) => checked[h.id]).reduce((s, h) => s + h.weight, 0)
  return Math.round((earned / TOTAL_WEIGHT) * 100)
}
function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split("T")[0]
  })
}
function scoreColor(s: number) {
  if (s >= 80) return "var(--red)"
  if (s >= 60) return "#C41E3A"
  if (s >= 40) return "#8B0000"
  if (s > 0)   return "#4a0a0a"
  return "rgba(255,255,255,0.06)"
}
function scoreLabel(s: number) {
  if (s >= 90) return "ELITE"
  if (s >= 70) return "Bon"
  if (s >= 50) return "Correct"
  if (s >= 25) return "Faible"
  if (s > 0)   return "Critique"
  return "—"
}

interface DayData { key: string; score: number; checked: Record<string, boolean>; resets: number }

export default function HistoryPage() {
  const [days, setDays] = useState<DayData[]>([])
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const keys = getLast7Days()
    const data = keys.map((key) => {
      const checked = getStorage<Record<string, boolean>>(`habits-${key}`, {})
      return { key, score: computeScore(checked), checked, resets: getStorage<number>(`resets-${key}`, 0) }
    })
    setDays(data)
    setSelectedDay(keys[keys.length - 1])
    setMounted(true)
  }, [])

  const selected = days.find((d) => d.key === selectedDay)
  const categories = ["spiritual", "body", "mind", "discipline"] as const
  const weekScore = days.length ? Math.round(days.reduce((s, d) => s + d.score, 0) / days.length) : 0

  if (!mounted) return null

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px 110px", position: "relative", zIndex: 1 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 6 }}>
          <BatmanLogo size={36} animated={false} />
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.1em", fontFamily: "var(--font-oswald), sans-serif" }}>
            HISTORIQUE <span style={{ color: "var(--red)", textShadow: "0 0 15px rgba(220,20,60,0.6)" }}>7 JOURS</span>
          </h1>
        </div>
        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
          Score moyen :{" "}
          <span style={{ color: scoreColor(weekScore), fontWeight: 700 }}>{weekScore}%</span>
        </p>
      </div>

      {/* Heatmap */}
      <div className="card" style={{ padding: "18px 14px", marginBottom: 14, display: "flex", gap: 6, borderColor: "rgba(220,20,60,0.1)" }}>
        {days.map((d) => {
          const date = new Date(d.key + "T00:00:00")
          const day = date.getDate().toString()
          const weekday = date.toLocaleDateString("fr-FR", { weekday: "short" }).slice(0, 3)
          const isSelected = d.key === selectedDay
          const isToday = d.key === new Date().toISOString().split("T")[0]
          const color = scoreColor(d.score)

          return (
            <button
              key={d.key}
              onClick={() => setSelectedDay(d.key)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "10px 3px",
                borderRadius: 10,
                border: isSelected ? `1px solid rgba(220,20,60,0.35)` : "1px solid transparent",
                background: isSelected ? "rgba(220,20,60,0.07)" : "transparent",
                cursor: "pointer",
                transition: "all 0.18s",
                boxShadow: isSelected ? "0 0 14px rgba(220,20,60,0.15)" : "none",
              }}
            >
              <span style={{ fontSize: 9.5, fontWeight: 600, color: isToday ? "var(--red)" : "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {weekday}
              </span>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: d.score > 0 ? `${color}22` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${d.score > 0 ? color + "45" : "rgba(255,255,255,0.05)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isSelected && d.score > 0 ? `0 0 10px ${color}40` : "none",
                }}
              >
                <span style={{ fontSize: 10.5, fontWeight: 700, color: d.score > 0 ? color : "rgba(255,255,255,0.15)", fontFamily: "var(--font-oswald), sans-serif" }}>
                  {d.score > 0 ? d.score : "—"}
                </span>
              </div>
              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{day}</span>
            </button>
          )
        })}
      </div>

      {/* Day detail */}
      {selected && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="animate-slide-up">
          {/* Summary card */}
          <div className="card" style={{ padding: "18px", borderColor: "rgba(220,20,60,0.12)" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>
                  {new Date(selected.key + "T00:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
                  {scoreLabel(selected.score)} — {Object.values(selected.checked).filter(Boolean).length}/{HABITS.length} habitudes
                </div>
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, color: scoreColor(selected.score), fontFamily: "var(--font-oswald), sans-serif", textShadow: selected.score >= 80 ? "0 0 20px rgba(220,20,60,0.7)" : "none" }}>
                {selected.score > 0 ? `${selected.score}%` : "—"}
              </div>
            </div>

            <div style={{ height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${selected.score}%`, background: `linear-gradient(90deg, #8B0000, var(--red))`, borderRadius: 2, boxShadow: "0 0 8px rgba(220,20,60,0.5)", transition: "width 0.6s ease" }} />
            </div>

            {selected.resets > 0 && (
              <div className="flex items-center gap-2" style={{ marginTop: 10, padding: "5px 10px", background: "var(--red-dim)", border: "1px solid var(--red-border)", borderRadius: 6, width: "fit-content" }}>
                <RefreshCw size={10} color="var(--red)" />
                <span style={{ fontSize: 11, color: "var(--red)", fontWeight: 600 }}>{selected.resets} reset{selected.resets > 1 ? "s" : ""}</span>
              </div>
            )}
          </div>

          {/* Category breakdown */}
          {categories.map((cat) => {
            const habits = HABITS.filter((h) => h.category === cat)
            const done = habits.filter((h) => selected.checked[h.id])
            const color = CATEGORY_COLORS[cat]
            const pct = Math.round((done.length / habits.length) * 100)

            return (
              <div key={cat} className="card" style={{ padding: "14px 16px", borderColor: `${color}18` }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <div className="flex items-center gap-2">
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}80` }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color, fontFamily: "var(--font-oswald), sans-serif" }}>
                      {CATEGORY_LABELS[cat]}
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {done.length}/{habits.length}{" "}
                    <span style={{ color, fontWeight: 700 }}>{pct}%</span>
                  </span>
                </div>

                <div style={{ height: 2.5, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden", marginBottom: 10 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}60`, borderRadius: 2 }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {habits.map((h: Habit) => {
                    const isDone = !!selected.checked[h.id]
                    return (
                      <div key={h.id} className="flex items-center gap-2">
                        {isDone
                          ? <CheckCircle2 size={12} color={color} style={{ flexShrink: 0, filter: `drop-shadow(0 0 4px ${color}80)` }} />
                          : <Circle size={12} color="var(--text-dim)" style={{ flexShrink: 0 }} />
                        }
                        <span style={{ fontSize: 12.5, color: isDone ? "var(--text-muted)" : "var(--text)", textDecoration: isDone ? "line-through" : "none" }}>
                          {h.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
