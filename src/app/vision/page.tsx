"use client"

import { useState } from "react"
import { Target, Shield, Zap, MapPin, BookOpen, DollarSign, Heart } from "lucide-react"
import BatmanLogo from "@/components/BatmanLogo"

const PILLARS = [
  {
    icon: Heart,
    color: "#DC143C",
    title: "Spirituel d'abord",
    points: [
      "5 prières à l'heure — sans exception",
      "Adhkar matin et soir — bouclier quotidien",
      "Lecture Coran — minimum 1 page",
      "Plaire à Allah, pas aux gens",
    ],
  },
  {
    icon: DollarSign,
    color: "#FF4757",
    title: "Trading & Wealth",
    points: [
      "Respecter son setup — discipline absolue",
      "Pas de trade hors système",
      "Journal de trading — chaque session",
      "Objectif : revenus passifs → liberté",
    ],
  },
  {
    icon: Zap,
    color: "#C41E3A",
    title: "Corps & Discipline",
    points: [
      "Sport quotidien — force physique = force mentale",
      "Nutrition propre — rien de haram dans le corps",
      "Sommeil avant minuit — récupération maximale",
      "Continence — énergie préservée",
    ],
  },
  {
    icon: BookOpen,
    color: "#FF6B35",
    title: "Mental & Croissance",
    points: [
      "Lecture quotidienne — 1 livre, toujours",
      "Langue étrangère — espagnol en cours",
      "Pas de réseaux inutiles — pas de bruit",
      "Planification faite chaque soir",
    ],
  },
]

const ANTIPATTERNS = [
  "Traîner avec des amis sans but",
  "Réseaux sociaux passifs — scroll infini",
  "Dépenser de l'énergie pour le regard des gens",
  "Rompre son setup de trading par émotion",
  "Sauter la prière pour du dunya",
  "Remettre à demain ce qui doit être fait maintenant",
]

const ROADMAP = [
  { year: "2025", target: "Maîtrise trading + discipline absolue", active: true },
  { year: "2026", target: "Revenu trading > salaire mensuel", active: false },
  { year: "2027", target: "Capital — préparation déménagement", active: false },
  { year: "2028", target: "Alicante — liberté totale", active: false },
]

export default function VisionPage() {
  const [showAnti, setShowAnti] = useState(false)

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px 110px", position: "relative", zIndex: 1 }}>

      {/* Mission card */}
      <div
        style={{
          padding: "32px 24px",
          background: "linear-gradient(135deg, rgba(220,20,60,0.1) 0%, rgba(8,8,8,0.8) 60%, rgba(139,0,0,0.06) 100%)",
          border: "1px solid rgba(220,20,60,0.28)",
          borderRadius: 18,
          marginBottom: 14,
          textAlign: "center",
          boxShadow: "0 0 40px rgba(220,20,60,0.12), 0 0 80px rgba(220,20,60,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        className="animate-float-in"
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <BatmanLogo size={72} animated />
        </div>

        <h1
          className="glow-text"
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "var(--red)",
            marginBottom: 10,
            fontFamily: "var(--font-oswald), sans-serif",
          }}
        >
          MULTIMILLIONNAIRE
        </h1>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(220,20,60,0.1)",
            border: "1px solid rgba(220,20,60,0.25)",
            borderRadius: 8,
            padding: "5px 14px",
            marginBottom: 18,
          }}
        >
          <MapPin size={11} color="var(--red)" />
          <span style={{ fontSize: 12, color: "var(--red)", fontWeight: 700, letterSpacing: "0.1em", fontFamily: "var(--font-oswald), sans-serif" }}>
            ALICANTE — 2028
          </span>
        </div>

        <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.9, maxWidth: 300, margin: "0 auto" }}>
          Liberté financière. Liberté géographique.
          <br />
          Vivre selon les règles d&apos;Allah — pas celles du monde.
          <br />
          <span style={{ color: "var(--text)", fontWeight: 600, fontSize: 14 }}>
            Plaire à Allah seul.
          </span>
        </p>
      </div>

      {/* Roadmap */}
      <div className="card" style={{ padding: "18px", marginBottom: 14, borderColor: "rgba(220,20,60,0.1)" }}>
        <h2 style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em", color: "var(--text-muted)", marginBottom: 16, fontFamily: "var(--font-oswald), sans-serif" }}>
          ROADMAP
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {ROADMAP.map((step, i) => (
            <div key={step.year} className="flex items-start gap-4" style={{ position: "relative" }}>
              {/* Vertical line */}
              {i < ROADMAP.length - 1 && (
                <div style={{ position: "absolute", left: 19, top: 28, width: 1, height: "calc(100% + 0px)", background: step.active ? "rgba(220,20,60,0.25)" : "rgba(255,255,255,0.05)" }} />
              )}
              {/* Dot */}
              <div style={{ width: 38, flexShrink: 0, display: "flex", justifyContent: "center", paddingTop: 2 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: step.active ? "var(--red)" : "rgba(255,255,255,0.08)",
                  border: `1.5px solid ${step.active ? "var(--red)" : "rgba(255,255,255,0.12)"}`,
                  boxShadow: step.active ? "0 0 10px rgba(220,20,60,0.7)" : "none",
                  flexShrink: 0,
                }} />
              </div>
              <div style={{ paddingBottom: 20, flex: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: step.active ? "var(--red)" : "var(--text-dim)", fontFamily: "var(--font-oswald), sans-serif", letterSpacing: "0.06em" }}>
                  {step.year}
                </span>
                {step.active && (
                  <span style={{ marginLeft: 8, fontSize: 9, background: "var(--red-dim)", border: "1px solid var(--red-border)", color: "var(--red)", padding: "1px 6px", borderRadius: 4, fontWeight: 700, letterSpacing: "0.08em" }}>
                    EN COURS
                  </span>
                )}
                <div style={{ fontSize: 13, color: step.active ? "var(--text)" : "var(--text-muted)", marginTop: 3, lineHeight: 1.5 }}>
                  {step.target}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pillars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        <h2 style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em", color: "var(--text-muted)", padding: "0 2px", fontFamily: "var(--font-oswald), sans-serif" }}>
          LES 4 PILIERS
        </h2>
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon
          return (
            <div key={pillar.title} className="card" style={{ padding: "16px 18px", borderColor: `${pillar.color}18` }}>
              <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${pillar.color}12`, border: `1px solid ${pillar.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 10px ${pillar.color}30` }}>
                  <Icon size={15} color={pillar.color} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: pillar.color, fontFamily: "var(--font-oswald), sans-serif", letterSpacing: "0.04em", textShadow: `0 0 12px ${pillar.color}50` }}>
                  {pillar.title}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {pillar.points.map((p) => (
                  <div key={p} className="flex items-start gap-2">
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: pillar.color, flexShrink: 0, marginTop: 5, boxShadow: `0 0 4px ${pillar.color}80` }} />
                    <span style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Anti-patterns */}
      <div className="card" style={{ overflow: "hidden", marginBottom: 14, borderColor: "rgba(220,20,60,0.12)" }}>
        <button
          onClick={() => setShowAnti((v) => !v)}
          className="flex items-center justify-between w-full"
          style={{ padding: "16px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
        >
          <div className="flex items-center gap-3">
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--red-dim)", border: "1px solid var(--red-border)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--red-glow-sm)" }}>
              <Shield size={14} color="var(--red)" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", fontFamily: "var(--font-oswald), sans-serif", letterSpacing: "0.04em" }}>
              CE QUE JE REFUSE D&apos;ÊTRE
            </span>
          </div>
          <span style={{ fontSize: 18, color: "var(--text-dim)", lineHeight: 1 }}>{showAnti ? "−" : "+"}</span>
        </button>

        {showAnti && (
          <div className="animate-slide-up" style={{ padding: "0 18px 18px", borderTop: "1px solid rgba(220,20,60,0.1)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 14 }}>
              {ANTIPATTERNS.map((a) => (
                <div key={a} className="flex items-start gap-2.5">
                  <span style={{ color: "var(--red)", fontSize: 11, flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✕</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Verset */}
      <div
        style={{
          padding: "22px",
          textAlign: "center",
          borderRadius: 14,
          background: "rgba(220,20,60,0.04)",
          border: "1px solid rgba(220,20,60,0.1)",
          boxShadow: "var(--red-glow-sm)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <Target size={16} color="var(--red)" style={{ filter: "drop-shadow(0 0 5px rgba(220,20,60,0.7))" }} />
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.9, fontStyle: "italic" }}>
          &ldquo;Et quiconque craint Allah, Il lui fera une issue,<br />
          et le pourvoira de là où il ne s&apos;y attend pas.&rdquo;
        </p>
        <p style={{ fontSize: 10.5, color: "var(--text-dim)", marginTop: 10, letterSpacing: "0.08em" }}>— CORAN 65:2-3</p>
      </div>
    </main>
  )
}
