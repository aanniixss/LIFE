"use client"

interface ScoreRingProps {
  score: number
  size?: number
}

export default function ScoreRing({ score, size = 120 }: ScoreRingProps) {
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const isElite = score >= 80
  const isGood = score >= 50
  const trackColor = "rgba(255,255,255,0.05)"
  const arcColor = isElite ? "#DC143C" : isGood ? "#C41E3A" : score >= 25 ? "#8B0000" : "#4a0a0a"

  const label =
    score >= 90 ? "ELITE" :
    score >= 70 ? "EN FORME" :
    score >= 50 ? "CORRECT" :
    score >= 25 ? "À RELEVER" : "RESET"

  return (
    <div className="flex flex-col items-center" style={{ gap: 6 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        {/* Glow halo */}
        {isElite && (
          <div
            style={{
              position: "absolute",
              inset: "10%",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(220,20,60,0.18) 0%, transparent 70%)`,
              animation: "glow-ring 2.5s ease-in-out infinite",
            }}
          />
        )}

        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          style={{
            transform: "rotate(-90deg)",
            filter: isElite
              ? "drop-shadow(0 0 8px rgba(220,20,60,0.7)) drop-shadow(0 0 16px rgba(220,20,60,0.4))"
              : "none",
          }}
        >
          {/* Track */}
          <circle cx="50" cy="50" r={radius} fill="none" stroke={trackColor} strokeWidth="6" />
          {/* Secondary softer ring */}
          <circle
            cx="50" cy="50" r={radius - 8}
            fill="none"
            stroke="rgba(220,20,60,0.06)"
            strokeWidth="1"
          />
          {/* Main arc */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={arcColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1), stroke 0.4s ease" }}
          />
        </svg>

        {/* Center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: size * 0.27,
              fontWeight: 700,
              fontFamily: "var(--font-oswald), sans-serif",
              color: arcColor,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              textShadow: isElite ? "0 0 20px rgba(220,20,60,0.8)" : "none",
            }}
          >
            {score}
          </div>
          <div style={{ fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.15em", marginTop: 2 }}>
            /100
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.18em",
          color: arcColor,
          fontFamily: "var(--font-oswald), sans-serif",
          textShadow: isElite ? "0 0 12px rgba(220,20,60,0.7)" : "none",
        }}
      >
        {label}
      </div>
    </div>
  )
}
