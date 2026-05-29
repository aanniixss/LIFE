"use client"

import { HABITS, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types"

interface HabitTrackerProps {
  checked: Record<string, boolean>
  onChange: (id: string, value: boolean) => void
  streaks: Record<string, number>
}

export default function HabitTracker({ checked, onChange, streaks }: HabitTrackerProps) {
  const categories = ["spiritual", "body", "mind", "discipline"] as const
  const doneTotal = Object.values(checked).filter(Boolean).length

  return (
    <div
      className="card"
      style={{
        padding: "20px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        borderColor: "rgba(220,20,60,0.1)",
      }}
    >
      <div className="flex items-center justify-between">
        <h2
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: "var(--text-muted)",
            fontFamily: "var(--font-oswald), sans-serif",
          }}
        >
          HABITUDES DU JOUR
        </h2>
        <span
          style={{
            fontSize: 12,
            color: "var(--red)",
            fontWeight: 700,
            fontFamily: "var(--font-oswald), sans-serif",
          }}
        >
          {doneTotal}/{HABITS.length}
        </span>
      </div>

      {categories.map((cat) => {
        const habits = HABITS.filter((h) => h.category === cat)
        const color = CATEGORY_COLORS[cat]
        const doneInCat = habits.filter((h) => checked[h.id]).length
        const pct = Math.round((doneInCat / habits.length) * 100)

        return (
          <div key={cat} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Category header */}
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: `0 0 6px ${color}80`,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color, fontFamily: "var(--font-oswald), sans-serif" }}>
                {CATEGORY_LABELS[cat]}
              </span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}30, transparent)` }} />
              <span style={{ fontSize: 10, color: "var(--text-dim)" }}>
                {pct}%
              </span>
            </div>

            {/* Mini progress */}
            <div style={{ height: 2, background: "rgba(255,255,255,0.04)", borderRadius: 1, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: color,
                  boxShadow: `0 0 6px ${color}80`,
                  borderRadius: 1,
                  transition: "width 0.4s ease",
                }}
              />
            </div>

            {/* Habits list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {habits.map((habit) => {
                const streak = streaks[habit.id] || 0
                const isDone = !!checked[habit.id]
                return (
                  <label
                    key={habit.id}
                    className="flex items-center gap-3 cursor-pointer"
                    style={{
                      padding: "9px 10px",
                      borderRadius: 9,
                      transition: "background 0.15s",
                      background: isDone ? `${color}08` : "transparent",
                      border: isDone ? `1px solid ${color}20` : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isDone) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"
                    }}
                    onMouseLeave={(e) => {
                      if (!isDone) (e.currentTarget as HTMLElement).style.background = "transparent"
                    }}
                  >
                    <input
                      type="checkbox"
                      className="habit-check"
                      style={isDone ? { borderColor: color, boxShadow: `0 0 8px ${color}50` } : undefined}
                      checked={isDone}
                      onChange={(e) => onChange(habit.id, e.target.checked)}
                    />
                    <span
                      style={{
                        fontSize: 13.5,
                        color: isDone ? "var(--text-muted)" : "var(--text)",
                        textDecoration: isDone ? "line-through" : "none",
                        flex: 1,
                        transition: "color 0.18s",
                      }}
                    >
                      {habit.label}
                    </span>
                    {streak > 1 && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color,
                          background: `${color}15`,
                          border: `1px solid ${color}30`,
                          padding: "2px 6px",
                          borderRadius: 5,
                          letterSpacing: "0.05em",
                          fontFamily: "var(--font-oswald), sans-serif",
                        }}
                      >
                        {streak}j
                      </span>
                    )}
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
