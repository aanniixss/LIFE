"use client"

import { HABITS, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types"

interface HabitTrackerProps {
  checked: Record<string, boolean>
  onChange: (id: string, value: boolean) => void
  streaks: Record<string, number>
}

export default function HabitTracker({ checked, onChange, streaks }: HabitTrackerProps) {
  const categories = ["spiritual", "body", "mind", "discipline"] as const

  return (
    <div className="card p-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: "var(--text-muted)" }}>
          HABITUDES DU JOUR
        </h2>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          {Object.values(checked).filter(Boolean).length} / {HABITS.length}
        </span>
      </div>

      {categories.map((cat) => {
        const habits = HABITS.filter((h) => h.category === cat)
        const color = CATEGORY_COLORS[cat]
        const doneInCat = habits.filter((h) => checked[h.id]).length

        return (
          <div key={cat} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color }}>
                {CATEGORY_LABELS[cat]}
              </span>
              <span style={{ fontSize: 11, color: "var(--text-dim)", marginLeft: "auto" }}>
                {doneInCat}/{habits.length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {habits.map((habit) => {
                const streak = streaks[habit.id] || 0
                return (
                  <label
                    key={habit.id}
                    className="flex items-center gap-3 cursor-pointer group"
                    style={{ padding: "8px 10px", borderRadius: 8, transition: "background 0.15s" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "var(--surface-2)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "transparent")
                    }
                  >
                    <input
                      type="checkbox"
                      className="habit-check"
                      checked={!!checked[habit.id]}
                      onChange={(e) => onChange(habit.id, e.target.checked)}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        color: checked[habit.id] ? "var(--text-muted)" : "var(--text)",
                        textDecoration: checked[habit.id] ? "line-through" : "none",
                        flex: 1,
                        transition: "color 0.15s",
                      }}
                    >
                      {habit.label}
                    </span>
                    {streak > 1 && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: color,
                          background: `${color}18`,
                          padding: "2px 6px",
                          borderRadius: 4,
                          letterSpacing: "0.05em",
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
