"use client"

import { useState } from "react"
import { TrendingUp, Dumbbell, BookOpen, Globe, ChevronDown, ChevronUp } from "lucide-react"

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

interface DomainCardsProps {
  data: DomainData
  onChange: (data: DomainData) => void
}

type Domain = "trading" | "body" | "spiritual" | "language"

const DOMAIN_META = {
  trading: { label: "Trading", icon: TrendingUp, color: "#3b82f6" },
  body: { label: "Physique", icon: Dumbbell, color: "#22c55e" },
  spiritual: { label: "Spirituel", icon: BookOpen, color: "#D4AF37" },
  language: { label: "Langues", icon: Globe, color: "#a855f7" },
}

export default function DomainCards({ data, onChange }: DomainCardsProps) {
  const [expanded, setExpanded] = useState<Domain | null>(null)

  const toggle = (d: Domain) => setExpanded((prev) => (prev === d ? null : d))
  const set = (patch: Partial<DomainData>) => onChange({ ...data, ...patch })

  return (
    <div className="flex flex-col gap-3">
      <h2
        style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: "var(--text-muted)", padding: "0 2px" }}
      >
        DOMAINES
      </h2>

      {/* Trading */}
      <DomainCard
        meta={DOMAIN_META.trading}
        expanded={expanded === "trading"}
        onToggle={() => toggle("trading")}
        summary={
          data.tradingSetup === null
            ? "Non renseigné"
            : data.tradingSetup
            ? "Setup respecté"
            : "Hors setup — analyse requise"
        }
        summaryColor={
          data.tradingSetup === null ? "var(--text-muted)" : data.tradingSetup ? "#22c55e" : "#ef4444"
        }
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>AS-TU RESPECTÉ TON SETUP ?</p>
            <div className="flex gap-2">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  onClick={() => set({ tradingSetup: v })}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `1px solid ${data.tradingSetup === v ? (v ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)") : "var(--border)"}`,
                    background: data.tradingSetup === v ? (v ? "var(--green-dim)" : "var(--red-dim)") : "var(--surface-2)",
                    color: data.tradingSetup === v ? (v ? "#22c55e" : "#ef4444") : "var(--text-muted)",
                    transition: "all 0.15s",
                  }}
                >
                  {v ? "OUI" : "NON"}
                </button>
              ))}
            </div>
          </div>
          <NoteInput
            value={data.tradingNote}
            onChange={(v) => set({ tradingNote: v })}
            placeholder="Note session (optionnel)..."
          />
        </div>
      </DomainCard>

      {/* Body */}
      <DomainCard
        meta={DOMAIN_META.body}
        expanded={expanded === "body"}
        onToggle={() => toggle("body")}
        summary={data.workoutDone ? "Séance faite" : "Pas encore fait"}
        summaryColor={data.workoutDone ? "#22c55e" : "var(--text-muted)"}
      >
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="habit-check"
              checked={data.workoutDone}
              onChange={(e) => set({ workoutDone: e.target.checked })}
            />
            <span style={{ fontSize: 14 }}>Séance faite aujourd&apos;hui</span>
          </label>
          <NoteInput
            value={data.workoutNote}
            onChange={(v) => set({ workoutNote: v })}
            placeholder="Exercices, sensations, posture... (optionnel)"
          />
        </div>
      </DomainCard>

      {/* Spiritual */}
      <DomainCard
        meta={DOMAIN_META.spiritual}
        expanded={expanded === "spiritual"}
        onToggle={() => toggle("spiritual")}
        summary={`${data.prayerStreak} jours de suite — ${data.quranPages} pages Coran aujourd'hui`}
        summaryColor="var(--gold)"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>STREAK PRIÈRES (jours)</p>
            <div className="flex items-center gap-3">
              <button onClick={() => set({ prayerStreak: Math.max(0, data.prayerStreak - 1) })} style={btnStyle}>−</button>
              <span style={{ fontSize: 24, fontWeight: 700, color: "var(--gold)", minWidth: 40, textAlign: "center" }}>
                {data.prayerStreak}
              </span>
              <button onClick={() => set({ prayerStreak: data.prayerStreak + 1 })} style={btnStyle}>+</button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>PAGES CORAN AUJOURD&apos;HUI</p>
            <div className="flex items-center gap-3">
              <button onClick={() => set({ quranPages: Math.max(0, data.quranPages - 1) })} style={btnStyle}>−</button>
              <span style={{ fontSize: 24, fontWeight: 700, color: "var(--gold)", minWidth: 40, textAlign: "center" }}>
                {data.quranPages}
              </span>
              <button onClick={() => set({ quranPages: data.quranPages + 1 })} style={btnStyle}>+</button>
            </div>
          </div>
        </div>
      </DomainCard>

      {/* Language */}
      <DomainCard
        meta={DOMAIN_META.language}
        expanded={expanded === "language"}
        onToggle={() => toggle("language")}
        summary={`${data.langCurrent || "Non défini"} — ${data.langMinutes} min aujourd'hui`}
        summaryColor="#a855f7"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>LANGUE EN COURS</p>
            <input
              value={data.langCurrent}
              onChange={(e) => set({ langCurrent: e.target.value })}
              placeholder="ex: Espagnol"
              style={inputStyle}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>MINUTES AUJOURD&apos;HUI</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => set({ langMinutes: Math.max(0, data.langMinutes - 5) })}
                style={btnStyle}
              >
                −
              </button>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#a855f7", minWidth: 40, textAlign: "center" }}>
                {data.langMinutes}
              </span>
              <button onClick={() => set({ langMinutes: data.langMinutes + 5 })} style={btnStyle}>
                +
              </button>
            </div>
          </div>
        </div>
      </DomainCard>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 8,
  background: "var(--surface-3)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 300,
}

const inputStyle: React.CSSProperties = {
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 13,
  color: "var(--text)",
  outline: "none",
  fontFamily: "inherit",
  width: "100%",
}

function NoteInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={2}
      style={{ ...inputStyle, resize: "none" }}
    />
  )
}

interface DomainCardProps {
  meta: { label: string; icon: React.ElementType; color: string }
  expanded: boolean
  onToggle: () => void
  summary: string
  summaryColor: string
  children: React.ReactNode
}

function DomainCard({ meta, expanded, onToggle, summary, summaryColor, children }: DomainCardProps) {
  const Icon = meta.icon
  return (
    <div
      className="card"
      style={{ borderColor: expanded ? `${meta.color}30` : undefined }}
    >
      <button
        onClick={onToggle}
        className="flex items-center w-full"
        style={{
          padding: "14px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: 12,
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `${meta.color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={15} color={meta.color} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{meta.label}</div>
          <div
            style={{
              fontSize: 12,
              color: summaryColor,
              marginTop: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {summary}
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={15} color="var(--text-muted)" />
        ) : (
          <ChevronDown size={15} color="var(--text-muted)" />
        )}
      </button>

      {expanded && (
        <div
          className="animate-slide-up"
          style={{ padding: "0 16px 16px", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ paddingTop: 14 }}>{children}</div>
        </div>
      )}
    </div>
  )
}
