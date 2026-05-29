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
import BatmanLogo from "@/components/BatmanLogo"

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
        <BatmanLogo size={56} animated />
      </div>
    )
  }

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px 110px", position: "relative", zIndex: 1 }}>

      {/* Header */}
      <header style={{ marginBottom: 28 }}>
        {/* Batman logo centered */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <BatmanLogo size={64} animated />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "0.12em",
                fontFamily: "var(--font-oswald), sans-serif",
                color: "var(--text)",
              }}
            >
              LIFE{" "}
              <span
                className="glow-text"
                style={{ color: "var(--red)" }}
              >
                OS
              </span>
            </h1>
            <div className="flex items-center gap-1.5" style={{ marginTop: 3 }}>
              <Calendar size={11} color="var(--text-muted)" />
              <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "capitalize" }}>
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
                  border: "1px solid var(--red-border)",
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
                background: "var(--red-dim)",
                border: "1px solid var(--red-border)",
                padding: "6px 12px",
                borderRadius: 8,
                boxShadow: "var(--red-glow-sm)",
              }}
            >
              <Flame size={13} color="var(--red)" />
              <span
                style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", fontFamily: "var(--font-oswald), sans-serif" }}
              >
                {totalStreak}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Score card */}
      <section
        className="card card-red animate-float-in flex items-center justify-between"
        style={{ padding: "24px 28px", marginBottom: 10 }}
      >
        <ScoreRing score={score} size={114} />
        <div className="flex flex-col items-end gap-4">
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, letterSpacing: "0.08em" }}>
              HABITUDES
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                fontFamily: "var(--font-oswald), sans-serif",
                color: "var(--text)",
              }}
            >
              {Object.values(checked).filter(Boolean).length}
              <span style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 400 }}>
                /{HABITS.length}
              </span>
            </div>
          </div>

          <button
            onClick={() => setResetOpen(true)}
            className="btn-reset flex items-center gap-2"
            style={{
              background: "var(--red-dim)",
              border: "1px solid var(--red-border)",
              color: "var(--red)",
              padding: "10px 16px",
              borderRadius: 10,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.12em",
              fontFamily: "var(--font-oswald), sans-serif",
            }}
          >
            <RefreshCw size={12} />
            RESET
          </button>
        </div>
      </section>

      {/* Progress bar */}
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-fill" style={{ width: `${score}%` }} />
      </div>

      {/* Habits */}
      <section className="animate-slide-up" style={{ marginBottom: 14, animationDelay: "0.05s" }}>
        <HabitTracker checked={checked} onChange={handleHabitChange} streaks={streaks} />
      </section>

      {/* Goals */}
      <section className="animate-slide-up" style={{ marginBottom: 14, animationDelay: "0.1s" }}>
        <GoalsTracker goals={goals} onChange={handleGoalsChange} />
      </section>

      {/* Domains */}
      <section className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
        <DomainCards data={domain} onChange={handleDomainChange} />
      </section>

      {/* Vision strip */}
      <div
        style={{
          marginTop: 28,
          padding: "18px 20px",
          background: "var(--red-dim)",
          border: "1px solid var(--red-border)",
          borderRadius: 12,
          fontSize: 12,
          color: "var(--text-muted)",
          lineHeight: 1.9,
          textAlign: "center",
          boxShadow: "var(--red-glow-sm)",
        }}
      >
        <span
          className="glow-text"
          style={{
            color: "var(--red)",
            fontWeight: 700,
            fontFamily: "var(--font-oswald), sans-serif",
            letterSpacing: "0.1em",
            fontSize: 14,
          }}
        >
          MULTIMILLIONNAIRE. ALICANTE 2028.
        </span>
        <br />
        Plaire à Allah seul — pas le regard des gens.
      </div>

      {resetOpen && (
        <ResetProtocol onClose={() => setResetOpen(false)} onSaveReset={handleSaveReset} />
      )}
    </main>
  )
}
