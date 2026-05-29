"use client"

import { useEffect, useState } from "react"
import { HABITS, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types"
import { getStorage } from "@/lib/utils"
import { TrendingUp, Zap, Award, RefreshCw } from "lucide-react"
import BatmanLogo from "@/components/BatmanLogo"

const TOTAL_WEIGHT = HABITS.reduce((s, h) => s + h.weight, 0)
function computeScore(c: Record<string, boolean>) {
  return Math.round(HABITS.filter((h) => c[h.id]).reduce((s, h) => s + h.weight, 0) / TOTAL_WEIGHT * 100)
}
function getDays(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (n - 1 - i))
    return d.toISOString().split("T")[0]
  })
}

const WDAY = ["D","L","M","M","J","V","S"]

interface DS { key: string; score: number; checked: Record<string, boolean>; resets: number }

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="card" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 10, borderColor: `${color}18` }}>
      <div className="flex items-center gap-2">
        {icon}
        <span style={{ fontSize: 10.5, color: "var(--text-muted)", fontWeight: 500 }}>{label}</span>
      </div>
      <div>
        <span style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: "-0.02em", fontFamily: "var(--font-oswald), sans-serif", textShadow: `0 0 20px ${color}60` }}>
          {value}
        </span>
        {sub && <span style={{ fontSize: 11, color: "var(--text-dim)", marginLeft: 4 }}>{sub}</span>}
      </div>
    </div>
  )
}

export default function StatsPage() {
  const [s30, setS30] = useState<DS[]>([])
  const [s7, setS7] = useState<DS[]>([])
  const [streaks, setStreaks] = useState<Record<string, number>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const make = (keys: string[]): DS[] =>
      keys.map((key) => {
        const checked = getStorage<Record<string, boolean>>(`habits-${key}`, {})
        return { key, score: computeScore(checked), checked, resets: getStorage<number>(`resets-${key}`, 0) }
      })
    setS30(make(getDays(30)))
    setS7(make(getDays(7)))
    setStreaks(getStorage<Record<string, number>>("streaks", {}))
    setMounted(true)
  }, [])

  if (!mounted) return null

  const active = s30.filter((d) => d.score > 0)
  const avg = active.length ? Math.round(active.reduce((s, d) => s + d.score, 0) / active.length) : 0
  const best = s30.reduce((m, d) => Math.max(m, d.score), 0)
  const resets = s30.reduce((s, d) => s + d.resets, 0)
  const perfect = s30.filter((d) => d.score >= 90).length
  const totalStreak = Object.values(streaks).reduce((a, b) => a + b, 0)
  const max7 = Math.max(...s7.map((d) => d.score), 1)
  const categories = ["spiritual", "body", "mind", "discipline"] as const

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px 110px", position: "relative", zIndex: 1 }}>

      <div style={{ marginBottom: 24 }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 6 }}>
          <BatmanLogo size={36} animated={false} />
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.1em", fontFamily: "var(--font-oswald), sans-serif" }}>
            STATS <span style={{ color: "var(--red)", textShadow: "0 0 15px rgba(220,20,60,0.6)" }}>30 JOURS</span>
          </h1>
        </div>
        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{active.length} jours actifs</p>
      </div>

      {/* KPI grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <StatCard icon={<TrendingUp size={14} color="var(--red)" style={{ filter: "drop-shadow(0 0 4px rgba(220,20,60,0.7))" }} />} label="Score moyen" value={`${avg}%`} color="var(--red)" />
        <StatCard icon={<Award size={14} color="#FF4757" style={{ filter: "drop-shadow(0 0 4px rgba(255,71,87,0.7))" }} />} label="Meilleur jour" value={`${best}%`} color="#FF4757" />
        <StatCard icon={<Zap size={14} color="#C41E3A" style={{ filter: "drop-shadow(0 0 4px rgba(196,30,58,0.7))" }} />} label="Streak total" value={totalStreak.toString()} sub="habitudes" color="#C41E3A" />
        <StatCard icon={<RefreshCw size={14} color="#8B0000" />} label="Resets 30j" value={resets.toString()} color={resets > 5 ? "var(--red)" : "var(--text-muted)"} />
      </div>

      {/* Perfect days */}
      <div className="card" style={{ padding: "16px 18px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", borderColor: "rgba(220,20,60,0.18)", background: "linear-gradient(135deg, rgba(220,20,60,0.06) 0%, rgba(8,8,8,0.5) 100%)", boxShadow: "var(--red-glow-sm)" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Jours parfaits ≥90%</div>
          <div style={{ fontSize: 10, color: "var(--text-dim)" }}>sur 30 jours</div>
        </div>
        <div style={{ fontSize: 36, fontWeight: 800, color: "var(--red)", fontFamily: "var(--font-oswald), sans-serif", textShadow: "0 0 25px rgba(220,20,60,0.7)" }}>{perfect}</div>
      </div>

      {/* Weekly bar chart */}
      <div className="card" style={{ padding: "18px 16px", marginBottom: 14, borderColor: "rgba(220,20,60,0.08)" }}>
        <h2 style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em", color: "var(--text-muted)", marginBottom: 16, fontFamily: "var(--font-oswald), sans-serif" }}>
          PERFORMANCE — 7 JOURS
        </h2>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 88 }}>
          {s7.map((d) => {
            const barH = d.score > 0 ? Math.max((d.score / max7) * 72, 4) : 3
            const col = d.score >= 80 ? "var(--red)" : d.score >= 50 ? "#C41E3A" : d.score > 0 ? "#8B0000" : "rgba(255,255,255,0.06)"
            const wday = WDAY[new Date(d.key + "T00:00:00").getDay()]
            const isToday = d.key === new Date().toISOString().split("T")[0]

            return (
              <div key={d.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 9, color: col, fontWeight: 700, fontFamily: "var(--font-oswald), sans-serif" }}>
                  {d.score > 0 ? d.score : ""}
                </span>
                <div
                  style={{
                    width: "100%",
                    height: barH,
                    background: d.score > 0 ? `linear-gradient(180deg, ${col}, ${col}88)` : col,
                    borderRadius: "3px 3px 0 0",
                    boxShadow: d.score >= 50 ? `0 0 8px ${col}60` : "none",
                    transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
                <span style={{ fontSize: 10, color: isToday ? "var(--red)" : "var(--text-muted)", fontWeight: isToday ? 700 : 400, textShadow: isToday ? "0 0 8px rgba(220,20,60,0.6)" : "none" }}>
                  {wday}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Category performance */}
      <div className="card" style={{ padding: "18px 16px", marginBottom: 14, borderColor: "rgba(220,20,60,0.08)" }}>
        <h2 style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em", color: "var(--text-muted)", marginBottom: 14, fontFamily: "var(--font-oswald), sans-serif" }}>
          PAR CATÉGORIE — 7J
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {categories.map((cat) => {
            const habits = HABITS.filter((h) => h.category === cat)
            const total = s7.length * habits.length
            const done = s7.reduce((s, d) => s + habits.filter((h) => d.checked[h.id]).length, 0)
            const pct = total > 0 ? Math.round((done / total) * 100) : 0
            const color = CATEGORY_COLORS[cat]
            return (
              <div key={cat}>
                <div className="flex items-center justify-between" style={{ marginBottom: 5 }}>
                  <div className="flex items-center gap-2">
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: color, boxShadow: `0 0 5px ${color}80` }} />
                    <span style={{ fontSize: 11, color, fontWeight: 600, fontFamily: "var(--font-oswald), sans-serif" }}>{CATEGORY_LABELS[cat]}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{pct}%</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})`, boxShadow: `0 0 6px ${color}60`, borderRadius: 2 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top streaks */}
      <div className="card" style={{ padding: "18px 16px", marginBottom: 14, borderColor: "rgba(220,20,60,0.08)" }}>
        <h2 style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em", color: "var(--text-muted)", marginBottom: 12, fontFamily: "var(--font-oswald), sans-serif" }}>
          TOP STREAKS
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {HABITS.filter((h) => (streaks[h.id] || 0) > 0)
            .sort((a, b) => (streaks[b.id] || 0) - (streaks[a.id] || 0))
            .slice(0, 8)
            .map((h) => {
              const s = streaks[h.id] || 0
              const color = CATEGORY_COLORS[h.category]
              return (
                <div key={h.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: color, boxShadow: `0 0 4px ${color}80` }} />
                    <span style={{ fontSize: 13, color: "var(--text)" }}>{h.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color, background: `${color}12`, border: `1px solid ${color}28`, padding: "2px 8px", borderRadius: 5, fontFamily: "var(--font-oswald), sans-serif" }}>
                    {s}j
                  </span>
                </div>
              )
            })}
          {Object.values(streaks).every((v) => v === 0) && (
            <p style={{ fontSize: 13, color: "var(--text-dim)" }}>Lance-toi pour voir tes streaks.</p>
          )}
        </div>
      </div>

      {/* 30d heatmap */}
      <div className="card" style={{ padding: "18px 16px", borderColor: "rgba(220,20,60,0.08)" }}>
        <h2 style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em", color: "var(--text-muted)", marginBottom: 12, fontFamily: "var(--font-oswald), sans-serif" }}>
          CALENDRIER 30 JOURS
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {s30.map((d) => {
            const col = d.score >= 80 ? "var(--red)" : d.score >= 60 ? "#C41E3A" : d.score >= 40 ? "#8B0000" : d.score > 0 ? "#4a0a0a" : "rgba(255,255,255,0.05)"
            return (
              <div
                key={d.key}
                title={`${d.key}: ${d.score}%`}
                style={{ width: 22, height: 22, borderRadius: 4, background: col, boxShadow: d.score >= 80 ? "0 0 6px rgba(220,20,60,0.5)" : "none" }}
              />
            )
          })}
        </div>
        <div className="flex items-center gap-2" style={{ marginTop: 10 }}>
          <span style={{ fontSize: 9.5, color: "var(--text-dim)" }}>Moins</span>
          {["rgba(255,255,255,0.05)", "#4a0a0a", "#8B0000", "#C41E3A", "var(--red)"].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: c }} />
          ))}
          <span style={{ fontSize: 9.5, color: "var(--text-dim)" }}>Plus</span>
        </div>
      </div>
    </main>
  )
}
