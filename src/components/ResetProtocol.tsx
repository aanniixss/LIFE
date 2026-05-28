"use client"

import { useState } from "react"
import { X, ChevronRight, RefreshCw } from "lucide-react"

const STEPS = [
  {
    title: "Reconnais la chute",
    description: "Décris en une phrase ce qui s'est passé. Pas de jugement, juste les faits.",
    placeholder: "Ce qui s'est passé : ...",
    input: true,
  },
  {
    title: "Pourquoi ça a déraillé",
    description:
      "Identifie le saboteur. Fatigue ? Émotion ? Pas de plan ? Un seul mot ou phrase.",
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
    if (isLast) {
      onSaveReset(answers[0])
      onClose()
      return
    }
    setStep((s) => s + 1)
  }

  return (
    <div className="modal-backdrop animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="animate-slide-up w-full"
        style={{
          maxWidth: 440,
          background: "var(--surface)",
          border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "var(--red-dim)",
            borderBottom: "1px solid rgba(239,68,68,0.2)",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="flex items-center gap-3">
            <RefreshCw size={16} color="var(--red)" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--red)", letterSpacing: "0.1em" }}>
              PROTOCOLE RESET
            </span>
          </div>
          <button onClick={onClose} style={{ cursor: "pointer", background: "none", border: "none" }}>
            <X size={18} color="var(--text-muted)" />
          </button>
        </div>

        {/* Progress */}
        <div style={{ padding: "0 20px", paddingTop: 16 }}>
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  background: i <= step ? "var(--red)" : "var(--surface-3)",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
            Étape {step + 1} / {STEPS.length}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 20px 24px" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{current.title}</h3>

          {current.description && (
            <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 16 }}>
              {current.description}
            </p>
          )}

          {current.why && (
            <div
              style={{
                background: "var(--gold-dim)",
                border: "1px solid var(--gold-border)",
                borderRadius: 10,
                padding: "16px",
                marginBottom: 16,
              }}
            >
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>Ton objectif ultime :</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--gold)", lineHeight: 1.6 }}>
                Multimillionnaire. Liberté financière + géographique. Alicante 2028.
                <br />
                Plaire à Allah seul — pas le regard des gens.
              </p>
            </div>
          )}

          {current.input && (
            <textarea
              value={answers[step]}
              onChange={(e) =>
                setAnswers((prev) => {
                  const next = [...prev]
                  next[step] = e.target.value
                  return next
                })
              }
              placeholder={current.placeholder}
              rows={3}
              style={{
                width: "100%",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "12px",
                color: "var(--text)",
                fontSize: 14,
                resize: "none",
                outline: "none",
                fontFamily: "inherit",
                marginBottom: 16,
              }}
            />
          )}

          {current.actions && (
            <div className="flex flex-col gap-2" style={{ marginBottom: 16 }}>
              {current.actions.map((action, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "10px 12px",
                    background: "var(--surface-2)",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "var(--text)",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: "var(--red)",
                      flexShrink: 0,
                      fontSize: 13,
                      marginTop: 1,
                    }}
                  >
                    {i + 1}.
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
                padding: "14px",
                background: committed ? "var(--green-dim)" : "var(--surface-2)",
                border: `1px solid ${committed ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
                borderRadius: 10,
                marginBottom: 16,
                transition: "all 0.2s",
              }}
            >
              <input
                type="checkbox"
                className="habit-check"
                checked={committed}
                onChange={(e) => setCommitted(e.target.checked)}
              />
              <span style={{ fontSize: 14, fontWeight: 500 }}>Je reprends maintenant. La chute est derrière moi.</span>
            </label>
          )}

          <button
            onClick={handleNext}
            disabled={current.commit && !committed}
            className="flex items-center justify-center gap-2"
            style={{
              width: "100%",
              padding: "14px",
              background: isLast && committed ? "var(--green)" : "var(--red)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              borderRadius: 10,
              cursor: current.commit && !committed ? "not-allowed" : "pointer",
              opacity: current.commit && !committed ? 0.5 : 1,
              letterSpacing: "0.05em",
              transition: "opacity 0.2s, background 0.2s",
            }}
          >
            {isLast ? "REPRENDRE — JE SUIS BACK" : "ÉTAPE SUIVANTE"}
            {!isLast && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
