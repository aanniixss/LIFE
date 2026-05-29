"use client"

import { useState } from "react"
import { Plus, Trash2, Target } from "lucide-react"
import { Goal } from "@/lib/types"

interface GoalsTrackerProps {
  goals: Goal[]
  onChange: (goals: Goal[]) => void
}

const TAB_LABELS: Record<Goal["deadline"], string> = {
  week: "Semaine",
  month: "Mois",
  year: "Année",
}

export default function GoalsTracker({ goals, onChange }: GoalsTrackerProps) {
  const [tab, setTab] = useState<Goal["deadline"]>("week")
  const [input, setInput] = useState("")

  const visible = goals.filter((g) => g.deadline === tab)
  const doneCount = visible.filter((g) => g.done).length

  const addGoal = () => {
    if (!input.trim()) return
    onChange([...goals, { id: Date.now().toString(), text: input.trim(), done: false, deadline: tab }])
    setInput("")
  }

  const toggleGoal = (id: string) =>
    onChange(goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)))

  const deleteGoal = (id: string) => onChange(goals.filter((g) => g.id !== id))

  return (
    <div
      className="card"
      style={{ padding: "20px 18px", display: "flex", flexDirection: "column", gap: 16, borderColor: "rgba(220,20,60,0.08)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Target size={14} color="var(--red)" style={{ filter: "drop-shadow(0 0 5px rgba(220,20,60,0.6))" }} />
        <h2 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", color: "var(--text-muted)", fontFamily: "var(--font-oswald), sans-serif" }}>
          OBJECTIFS
        </h2>
        {visible.length > 0 && (
          <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--red)", fontWeight: 600 }}>
            {doneCount}/{visible.length}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 3,
          background: "rgba(255,255,255,0.03)",
          borderRadius: 9,
          padding: 3,
          border: "1px solid var(--border)",
        }}
      >
        {(["week", "month", "year"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "7px 8px",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: t === tab ? 700 : 500,
              cursor: "pointer",
              border: "none",
              background: t === tab ? "var(--red-dim)" : "transparent",
              color: t === tab ? "var(--red)" : "var(--text-muted)",
              transition: "all 0.18s ease",
              letterSpacing: "0.04em",
              boxShadow: t === tab ? "var(--red-glow-sm)" : "none",
              fontFamily: "var(--font-oswald), sans-serif",
            }}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {visible.length === 0 ? (
          <div style={{ fontSize: 13, color: "var(--text-dim)", padding: "6px 0" }}>
            Aucun objectif.
          </div>
        ) : (
          visible.map((goal) => (
            <div
              key={goal.id}
              className="flex items-start gap-3"
              style={{
                padding: "10px 12px",
                background: goal.done ? "rgba(220,20,60,0.05)" : "rgba(255,255,255,0.025)",
                borderRadius: 9,
                border: `1px solid ${goal.done ? "rgba(220,20,60,0.2)" : "rgba(255,255,255,0.05)"}`,
                transition: "all 0.18s",
              }}
            >
              <input
                type="checkbox"
                className="habit-check"
                style={{ marginTop: 1 }}
                checked={goal.done}
                onChange={() => toggleGoal(goal.id)}
              />
              <span
                style={{
                  fontSize: 13.5,
                  flex: 1,
                  color: goal.done ? "var(--text-muted)" : "var(--text)",
                  textDecoration: goal.done ? "line-through" : "none",
                  lineHeight: 1.5,
                }}
              >
                {goal.text}
              </span>
              <button
                onClick={() => deleteGoal(goal.id)}
                style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 2, opacity: 0.5 }}
              >
                <Trash2 size={12} color="var(--text-muted)" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGoal()}
          placeholder={`Ajouter — ${TAB_LABELS[tab].toLowerCase()}...`}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--border)",
            borderRadius: 9,
            padding: "10px 13px",
            fontSize: 13,
            color: "var(--text)",
            outline: "none",
            fontFamily: "inherit",
            transition: "border-color 0.18s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--red-border)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <button
          onClick={addGoal}
          style={{
            background: "var(--red-dim)",
            border: "1px solid var(--red-border)",
            borderRadius: 9,
            padding: "10px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            boxShadow: "var(--red-glow-sm)",
            transition: "box-shadow 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--red-glow-md)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--red-glow-sm)")}
        >
          <Plus size={16} color="var(--red)" />
        </button>
      </div>
    </div>
  )
}
