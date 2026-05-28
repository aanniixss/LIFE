"use client"

interface ScoreRingProps {
  score: number
  size?: number
}

export default function ScoreRing({ score, size = 120 }: ScoreRingProps) {
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color =
    score >= 80 ? "#D4AF37" : score >= 50 ? "#f59e0b" : score >= 25 ? "#f97316" : "#ef4444"

  const label =
    score >= 90
      ? "MEILLEURE VERSION"
      : score >= 70
      ? "EN FORME"
      : score >= 50
      ? "CORRECT"
      : score >= 25
      ? "À RELEVER"
      : "RESET NÉCESSAIRE"

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="7"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1), stroke 0.5s ease" }}
        />
      </svg>
      <div style={{ marginTop: -size * 0.72, pointerEvents: "none", textAlign: "center" }}>
        <div
          style={{
            fontSize: size * 0.28,
            fontWeight: 700,
            color,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {score}
        </div>
        <div style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.12em", marginTop: 2 }}>
          /100
        </div>
      </div>
      <div style={{ marginTop: size * 0.35 }} />
      <div
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.15em",
          color,
          opacity: 0.9,
        }}
      >
        {label}
      </div>
    </div>
  )
}
