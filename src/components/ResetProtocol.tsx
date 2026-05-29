"use client"

import { useState } from "react"
import { X, ChevronRight, RefreshCw } from "lucide-react"
import BatmanLogo from "./BatmanLogo"

const STEPS = [
  {
    title: "Reconnais la chute",
    description: "Décris en une phrase ce qui s'est passé. Pas de jugement, juste les faits.",
    placeholder: "Ce qui s'est passé : ...",
    input: true,
  },
  {
    title: "Pourquoi ça a déraillé",
    description: "Identifie le saboteur. Fatigue ? Émotion ? Pas de plan ? Un seul mot ou phrase.",
    placeholder: "Cause : ...",
    input: true,
  },
  {
    title: "Rappelle-toi ton WHY",
    description: null,
    input: false,
    why: true,
  },
  {
    title: "3 actions immédiates",
    description: "Maintenant, maintenant, maintenant. Pas demain.",
    actions: [
      "Faire wudu et prier la prochaine prière",
      "Fermer les réseaux — téléphone face cachée",
      "Ouvrir le plan du jour et reprendre la première tâche",
    ],
    input: false,
  },
  {
    title: "Engage-toi",
    description: "Une chute n'est pas une défaite. C'est de l'info. Tu reprends maintenant.",
    input: false,
    commit: true,
  },
]

interface ResetProtocolProps {
  onClose: () => void
  onSaveReset: (reason: string) => void
}

export default function ResetProtocol({ onClose, onSaveReset }: ResetProtocolProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>(["", "", "", "", ""])
  const [committed, setCommitted] = useState(false)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  const handleNext = () => {
    if (isLast) { onSaveReset(answers[0]); onClose(); return }
    setStep((s) => s + 1)
  }

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(220,20,60,0.2)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "var(--text)",
    fontSize: 14,
    resize: "none",
    outline: "none",
    fontFamily: "inherit",
    marginBottom: 16,
  }

  return (
    <div className="modal-backdrop animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="animate-slide-up w-full"
        style={{
          maxWidth: 440,
          background: "rgba(12,2,4,0.97)",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(220,20,60,0.3)",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 0 40px rgba(220,20,60,0.2), 0 0 80px rgba(220,20,60,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "rgba(220,20,60,0.08)",
            borderBottom: "1px solid rgba(220,20,60,0.18)",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="flex items-center gap-3">
            <RefreshCw size={15} color="var(--red)" style={{ filter: "drop-shadow(0 0 5px rgba(220,20,60,0.6))" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--red)", letterSpacing: "0.16em", fontFamily: "var(--font-oswald), sans-serif" }}>
              PROTOCOLE RESET
            </span>
          </div>
          <button onClick={onClose} style={{ cursor: "pointer", background: "none", border: "none" }}>
            <X size={17} color="var(--text-muted)" />
          </button>
        </div>

        {/* Step progress */}
        <div style={{ padding: "0 20px", paddingTop: 16 }}>
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 2.5,
                  borderRadius: 2,
                  background: i <= step ? "var(--red)" : "rgba(255,255,255,0.06)",
                  transition: "background 0.3s",
                  boxShadow: i <= step ? "0 0 8px rgba(220,20,60,0.5)" : "none",
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 7, letterSpacing: "0.08em" }}>
            ÉTAPE {step + 1} / {STEPS.length}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 20px 24px" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, fontFamily: "var(--font-oswald), sans-serif", letterSpacing: "0.04em" }}>
            {current.title}
          </h3>

          {current.description && (
            <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 16 }}>
              {current.description}
            </p>
          )}

          {current.why && (
            <div
              style={{
                background: "rgba(220,20,60,0.07)",
                border: "1px solid rgba(220,20,60,0.22)",
                borderRadius: 12,
                padding: "18px",
                marginBottom: 16,
                boxShadow: "var(--red-glow-sm)",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                <BatmanLogo size={52} animated />
              </div>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8, letterSpacing: "0.08em" }}>TON OBJECTIF ULTIME</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--red)", lineHeight: 1.7, fontFamily: "var(--font-oswald), sans-serif", textShadow: "0 0 15px rgba(220,20,60,0.5)" }}>
                MULTIMILLIONNAIRE. ALICANTE 2028.
                <br />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", textShadow: "none", fontFamily: "inherit" }}>
                  Plaire à Allah seul — pas le regard des gens.
                </span>
              </p>
            </div>
          )}

          {current.input && (
            <textarea
              value={answers[step]}
              onChange={(e) =>
                setAnswers((prev) => { const n = [...prev]; n[step] = e.target.value; return n })
              }
              placeholder={current.placeholder}
              rows={3}
              style={textareaStyle}
            />
          )}

          {current.actions && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {current.actions.map((action, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 14px",
                    background: "rgba(220,20,60,0.05)",
                    border: "1px solid rgba(220,20,60,0.12)",
                    borderRadius: 10,
                    fontSize: 13,
                    color: "var(--text)",
                  }}
                >
                  <span style={{ fontWeight: 700, color: "var(--red)", flexShrink: 0, fontFamily: "var(--font-oswald), sans-serif", fontSize: 16, lineHeight: 1 }}>
                    {i + 1}
                  </span>
                  {action}
                </div>
              ))}
            </div>
          )}

          {current.commit && (
            <label
              className="flex items-center gap-3 cursor-pointer"
              style={{
                padding: "14px 16px",
                background: committed ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${committed ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 12,
                marginBottom: 16,
                transition: "all 0.2s",
              }}
            >
              <input type="checkbox" className="habit-check" checked={committed} onChange={(e) => setCommitted(e.target.checked)} />
              <span style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.5 }}>
                Je reprends maintenant. La chute est derrière moi.
              </span>
            </label>
          )}

          <button
            onClick={handleNext}
            disabled={current.commit && !committed}
            className="flex items-center justify-center gap-2"
            style={{
              width: "100%",
              padding: "14px",
              background: isLast && committed
                ? "linear-gradient(135deg, #16a34a, #22c55e)"
                : "linear-gradient(135deg, #DC143C, #FF2052)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              border: "none",
              borderRadius: 11,
              cursor: current.commit && !committed ? "not-allowed" : "pointer",
              opacity: current.commit && !committed ? 0.45 : 1,
              letterSpacing: "0.12em",
              fontFamily: "var(--font-oswald), sans-serif",
              transition: "opacity 0.2s",
              boxShadow: current.commit && !committed
                ? "none"
                : isLast && committed
                ? "0 0 20px rgba(34,197,94,0.4)"
                : "0 0 20px rgba(220,20,60,0.4)",
            }}
          >
            {isLast ? "REPRENDRE — JE SUIS BACK" : "ÉTAPE SUIVANTE"}
            {!isLast && <ChevronRight size={15} />}
          </button>
        </div>
      </div>
    </div>
  )
}
