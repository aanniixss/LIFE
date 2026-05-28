"use client"

import { useState, useEffect, useCallback } from "react"
import { RefreshCw, Flame, Calendar } from "lucide-react"
import { HABITS, Goal } from "@/lib/types"
import { getTodayKey, getStorage, setStorage, formatDate } from "@/lib/utils"
import ScoreRing from "@/components/ScoreRing"
import HabitTracker from "@/components/HabitTracker"
import ResetProtocol from "@/components/ResetProtocol"
import GoalsTracker from "@/components/GoalsTracker"
import DomainCards from "@/components/DomainCards"

const TOTAL_WEIGHT = HABITS.reduce((s, h) => s + h.weight, 0)

function computeScore(checked: Record<string, boolean>): number {
  const earned = HABITS.filter((h) => checked[h.id]).reduce((s, h) => s + h.weight, 0)
  return Math.round((earned / TOTAL_WEIGHT) * 100)
}

interface DomainData {
  tradingSetup: boolean | null
  tradingNote: string
  workoutDone: boolean
  workoutNote: string
  prayerStreak: number
  quranPages: number
  langCurrent: string
  langMinutes: number
}

const DEFAULT_DOMAIN: DomainData = {
  tradingSetup: null,
  tradingNote: "",
  workoutDone: false,
  workoutNote: "",
  prayerStreak: 0,
  quranPages: 0,
  langCurrent: "Espagnol",
  langMinutes: 0,
}

export default function HomePage() {
  const today = getTodayKey()

  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [streaks, setStreaks] = useState<Record<string, number>>({})
  const [goals, setGoals] = useState<Goal[]>([])
  const [domain, setDomain] = useState<DomainData>(DEFAULT_DOMAIN)
  const [resetOpen, setResetOpen] = useState(false)
  const [resetCount, setResetCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setChecked(getStorage<Record<string, boolean>>(`habits-${today}`, {}))
    setStreaks(getStorage<Record<string, number>>("streaks", {}))
    setGoals(getStorage<Goal[]>("goals", []))
    setDomain(getStorage<DomainData>(`domain-${today}`, DEFAULT_DOMAIN))
    setResetCount(getStorage<number>(`resets-${today}`, 0))
    setMounted(true)
  }, [today])

  const handleHabitChange = useCallback(
    (id: string, value: boolean) => {
      const next = { ...checked, [id]: value }
      setChecked(next)
      setStorage(`habits-${today}`, next)
      if (value) {
        const nextStreaks = { ...streaks, [id]: (streaks[id] || 0) + 1 }
        setStreaks(nextStreaks)
        setStorage("streaks", nextStreaks)
      }
    },
    [checked, streaks, today]
  )

  const handleGoalsChange = useCallback((g: Goal[]) => {
    setGoals(g)
    setStorage("goals", g)
  }, [])

  const handleDomainChange = useCallback(
    (d: DomainData) => {
      setDomain(d)
      setStorage(`domain-${today}`, d)
    },
    [today]
  )

  const handleSaveReset = useCallback(
    (reason: string) => {
      const next = resetCount + 1
      setResetCount(next)
      setStorage(`resets-${today}`, next)
      const history = getStorage<Array<{ date: string; reason: string }>>("reset-history", [])
      setStorage("reset-history", [...history, { date: today, reason }])
    },
    [resetCount, today]
  )

  const score = computeScore(checked)
  const totalStreak = Object.values(streaks).reduce((a, b) => a + b, 0)

  if (!mounted) {
    return (
      <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "2px solid var(--gold)",
            borderTopColor: "transparent",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px 100px" }}>
      {/* Header */}
      <header className="flex items-center justify-between" style={{ marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>
            LIFE <span style={{ color: "var(--gold)" }}>OS</span>
          </h1>
          <div className="flex items-center gap-1.5" style={{ marginTop: 3 }}>
            <Calendar size={11} color="var(--text-muted)" />
            <span style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "capitalize" }}>
              {formatDate()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {resetCount > 0 && (
            <span
              style={{
                fontSize: 11,
                color: "var(--red)",
                background: "var(--red-dim)",
                border: "1px solid rgba(239,68,68,0.2)",
                padding: "3px 8px",
                borderRadius: 6,
              }}
            >
              {resetCount} reset{resetCount > 1 ? "s" : ""}
            </span>
          )}
          <div
            className="flex items-center gap-1.5"
            style={{
              background: "var(--gold-dim)",
              border: "1px solid var(--gold-border)",
              padding: "5px 10px",
              borderRadius: 8,
            }}
          >
            <Flame size={13} color="var(--gold)" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)" }}>{totalStreak}</span>
          </div>
        </div>
      </header>

      {/* Score card */}
      <section
        className="card card-gold flex items-center justify-between"
        style={{ padding: "24px 28px", marginBottom: 12 }}
      >
        <ScoreRing score={score} size={110} />
        <div className="flex flex-col items-end gap-4">
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>Habitudes cochées</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>
              {Object.values(checked).filter(Boolean).length}
              <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 400 }}>
                /{HABITS.length}
              </span>
            </div>
          </div>

          <button
            onClick={() => setResetOpen(true)}
            className="btn-reset flex items-center gap-2"
            style={{
              background: "var(--red-dim)",
              border: "1px solid rgba(239,68,68,0.35)",
              color: "var(--red)",
              padding: "10px 16px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.08em",
            }}
          >
            <RefreshCw size={13} />
            RESET
          </button>
        </div>
      </section>

      {/* Progress bar */}
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-fill" style={{ width: `${score}%` }} />
      </div>

      {/* Habits */}
      <section style={{ marginBottom: 14 }}>
        <HabitTracker checked={checked} onChange={handleHabitChange} streaks={streaks} />
      </section>

      {/* Goals */}
      <section style={{ marginBottom: 14 }}>
        <GoalsTracker goals={goals} onChange={handleGoalsChange} />
      </section>

      {/* Domains */}
      <section>
        <DomainCards data={domain} onChange={handleDomainChange} />
      </section>

      {/* Vision strip */}
      <div
        style={{
          marginTop: 28,
          padding: "16px",
          background: "var(--gold-dim)",
          border: "1px solid var(--gold-border)",
          borderRadius: 10,
          fontSize: 12,
          color: "var(--text-muted)",
          lineHeight: 1.8,
          textAlign: "center",
        }}
      >
        <span style={{ color: "var(--gold)", fontWeight: 600 }}>Multimillionnaire. Alicante 2028.</span>
        <br />
        Plaire à Allah seul — pas le regard des gens.
      </div>

      {resetOpen && (
        <ResetProtocol onClose={() => setResetOpen(false)} onSaveReset={handleSaveReset} />
      )}
    </main>
  )
}
