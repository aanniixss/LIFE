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
  trading:  { label: "Trading",   icon: TrendingUp, color: "#DC143C" },
  body:     { label: "Physique",  icon: Dumbbell,   color: "#FF4757" },
  spiritual:{ label: "Spirituel", icon: BookOpen,   color: "#C41E3A" },
  language: { label: "Langues",   icon: Globe,      color: "#FF6B35" },
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 9,
  padding: "10px 13px",
  fontSize: 13,
  color: "var(--text)",
  outline: "none",
  fontFamily: "inherit",
  width: "100%",
}

const btnStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 8,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "var(--text)",
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 300,
  transition: "all 0.15s",
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
      style={{
        borderColor: expanded ? `${meta.color}28` : "var(--border)",
        background: expanded ? `rgba(220,20,60,0.03)` : "var(--surface)",
        overflow: "hidden",
        transition: "all 0.25s ease",
        boxShadow: expanded ? `0 0 20px rgba(220,20,60,0.07)` : "none",
      }}
    >
      <button
        onClick={onToggle}
        className="flex items-center w-full"
        style={{ padding: "14px 16px", background: "none", border: "none", cursor: "pointer", gap: 12, textAlign: "left" }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: `${meta.color}12`,
            border: `1px solid ${meta.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: expanded ? `0 0 10px ${meta.color}40` : "none",
            transition: "box-shadow 0.2s",
          }}
        >
          <Icon size={15} color={meta.color} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{meta.label}</div>
          <div
            style={{
              fontSize: 11.5,
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
        {expanded
          ? <ChevronUp size={14} color="var(--text-muted)" />
          : <ChevronDown size={14} color="var(--text-muted)" />
        }
      </button>

      {expanded && (
        <div
          className="animate-slide-up"
          style={{ padding: "0 16px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div style={{ paddingTop: 14 }}>{children}</div>
        </div>
      )}
    </div>
  )
}

export default function DomainCards({ data, onChange }: DomainCardsProps) {
  const [expanded, setExpanded] = useState<Domain | null>(null)
  const toggle = (d: Domain) => setExpanded((p) => (p === d ? null : d))
  const set = (patch: Partial<DomainData>) => onChange({ ...data, ...patch })

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h2 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", color: "var(--text-muted)", padding: "0 2px", fontFamily: "var(--font-oswald), sans-serif" }}>
        DOMAINES
      </h2>

      {/* Trading */}
      <DomainCard
        meta={DOMAIN_META.trading}
        expanded={expanded === "trading"}
        onToggle={() => toggle("trading")}
        summary={data.tradingSetup === null ? "Non renseigné" : data.tradingSetup ? "Setup respecté" : "Hors setup"}
        summaryColor={data.tradingSetup === null ? "var(--text-muted)" : data.tradingSetup ? "#22c55e" : "var(--red)"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em" }}>
            AS-TU RESPECTÉ TON SETUP ?
          </p>
          <div className="flex gap-2">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => set({ tradingSetup: v })}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 9,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "var(--font-oswald), sans-serif",
                  letterSpacing: "0.08em",
                  border: `1px solid ${data.tradingSetup === v
                    ? v ? "rgba(34,197,94,0.4)" : "var(--red-border)"
                    : "var(--border)"}`,
                  background: data.tradingSetup === v
                    ? v ? "rgba(34,197,94,0.1)" : "var(--red-dim)"
                    : "rgba(255,255,255,0.03)",
                  color: data.tradingSetup === v
                    ? v ? "#22c55e" : "var(--red)"
                    : "var(--text-muted)",
                  transition: "all 0.15s",
                  boxShadow: data.tradingSetup === v
                    ? v ? "0 0 10px rgba(34,197,94,0.2)" : "var(--red-glow-sm)"
                    : "none",
                }}
              >
                {v ? "OUI" : "NON"}
              </button>
            ))}
          </div>
          <NoteInput value={data.tradingNote} onChange={(v) => set({ tradingNote: v })} placeholder="Note session..." />
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
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="habit-check" checked={data.workoutDone} onChange={(e) => set({ workoutDone: e.target.checked })} />
            <span style={{ fontSize: 13.5 }}>Séance faite aujourd&apos;hui</span>
          </label>
          <NoteInput value={data.workoutNote} onChange={(v) => set({ workoutNote: v })} placeholder="Exercices, sensations..." />
        </div>
      </DomainCard>

      {/* Spiritual */}
      <DomainCard
        meta={DOMAIN_META.spiritual}
        expanded={expanded === "spiritual"}
        onToggle={() => toggle("spiritual")}
        summary={`${data.prayerStreak} jours — ${data.quranPages} pages Coran`}
        summaryColor="#DC143C"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "STREAK PRIÈRES (jours)", key: "prayerStreak" as const, value: data.prayerStreak, step: 1 },
            { label: "PAGES CORAN AUJOURD'HUI", key: "quranPages" as const, value: data.quranPages, step: 1 },
          ].map(({ label, key, value, step }) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em" }}>{label}</p>
              <div className="flex items-center gap-3">
                <button onClick={() => set({ [key]: Math.max(0, value - step) })} style={btnStyle}>−</button>
                <span style={{ fontSize: 26, fontWeight: 700, color: "var(--red)", minWidth: 44, textAlign: "center", fontFamily: "var(--font-oswald), sans-serif", textShadow: "0 0 15px rgba(220,20,60,0.5)" }}>
                  {value}
                </span>
                <button onClick={() => set({ [key]: value + step })} style={btnStyle}>+</button>
              </div>
            </div>
          ))}
        </div>
      </DomainCard>

      {/* Language */}
      <DomainCard
        meta={DOMAIN_META.language}
        expanded={expanded === "language"}
        onToggle={() => toggle("language")}
        summary={`${data.langCurrent || "Non défini"} — ${data.langMinutes} min`}
        summaryColor="#FF6B35"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em" }}>LANGUE EN COURS</p>
            <input value={data.langCurrent} onChange={(e) => set({ langCurrent: e.target.value })} placeholder="ex: Espagnol" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em" }}>MINUTES AUJOURD&apos;HUI</p>
            <div className="flex items-center gap-3">
              <button onClick={() => set({ langMinutes: Math.max(0, data.langMinutes - 5) })} style={btnStyle}>−</button>
              <span style={{ fontSize: 26, fontWeight: 700, color: "#FF6B35", minWidth: 44, textAlign: "center", fontFamily: "var(--font-oswald), sans-serif" }}>
                {data.langMinutes}
              </span>
              <button onClick={() => set({ langMinutes: data.langMinutes + 5 })} style={btnStyle}>+</button>
            </div>
          </div>
        </div>
      </DomainCard>
    </div>
  )
}
