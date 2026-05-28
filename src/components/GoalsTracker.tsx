"use client"

import { useState } from "react"
import { Plus, Trash2, Target } from "lucide-react"
import { Goal } from "@/lib/types"

interface GoalsTrackerProps {
  goals: Goal[]
  onChange: (goals: Goal[]) => void
}

const TAB_LABELS: Record<Goal["deadline"], string> = {
  week: "Cette semaine",
  month: "Ce mois",
  year: "Cette année",
}

export default function GoalsTracker({ goals, onChange }: GoalsTrackerProps) {
  const [tab, setTab] = useState<Goal["deadline"]>("week")
  const [input, setInput] = useState("")

  const visible = goals.filter((g) => g.deadline === tab)
  const doneCount = visible.filter((g) => g.done).length

  const addGoal = () => {
    if (!input.trim()) return
    const newGoal: Goal = {
      id: Date.now().toString(),
      text: input.trim(),
      done: false,
      deadline: tab,
    }
    onChange([...goals, newGoal])
    setInput("")
  }

  const toggleGoal = (id: string) =>
    onChange(goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)))

  const deleteGoal = (id: string) => onChange(goals.filter((g) => g.id !== id))

  return (
    <div className="card p-5 flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Target size={15} color="var(--gold)" />
        <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: "var(--text-muted)" }}>
          OBJECTIFS
        </h2>
        {visible.length > 0 && (
          <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: "auto" }}>
            {doneCount}/{visible.length} fait
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1" style={{ background: "var(--surface-2)", borderRadius: 8, padding: 3 }}>
        {(["week", "month", "year"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "6px 8px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              background: tab === t ? "var(--surface-3)" : "transparent",
              color: tab === t ? "var(--text)" : "var(--text-muted)",
              transition: "all 0.15s",
            }}
          >
            {t === "week" ? "Semaine" : t === "month" ? "Mois" : "Année"}
          </button>
        ))}
      </div>

      {/* Goals list */}
      <div className="flex flex-col gap-2">
        {visible.length === 0 ? (
          <div style={{ fontSize: 13, color: "var(--text-dim)", padding: "8px 0" }}>
            Aucun objectif — ajoutes-en un.
          </div>
        ) : (
          visible.map((goal) => (
            <div
              key={goal.id}
              className="flex items-start gap-3"
              style={{
                padding: "10px",
                background: "var(--surface-2)",
                borderRadius: 8,
                border: `1px solid ${goal.done ? "rgba(212,175,55,0.2)" : "transparent"}`,
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
                  fontSize: 14,
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
                style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 2 }}
              >
                <Trash2 size={13} color="var(--text-dim)" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add goal */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGoal()}
          placeholder={`Ajouter un objectif — ${TAB_LABELS[tab].toLowerCase()}...`}
          style={{
            flex: 1,
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 13,
            color: "var(--text)",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={addGoal}
          style={{
            background: "var(--gold-dim)",
            border: "1px solid var(--gold-border)",
            borderRadius: 8,
            padding: "10px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Plus size={16} color="var(--gold)" />
        </button>
      </div>
    </div>
  )
}
