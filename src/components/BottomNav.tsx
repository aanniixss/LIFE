"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, CalendarDays, BarChart2, Star } from "lucide-react"

const TABS = [
  { href: "/", icon: Sun, label: "Aujourd'hui" },
  { href: "/history", icon: CalendarDays, label: "Historique" },
  { href: "/stats", icon: BarChart2, label: "Stats" },
  { href: "/vision", icon: Star, label: "Vision" },
]

export default function BottomNav() {
  const path = usePathname()

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(5,0,2,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(220,20,60,0.12)",
        padding: "8px 0 env(safe-area-inset-bottom, 8px)",
        zIndex: 50,
        boxShadow: "0 -1px 40px rgba(220,20,60,0.06)",
      }}
    >
      <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", alignItems: "center" }}>
        {TABS.map(({ href, icon: Icon, label }) => {
          const active = path === href
          return (
            <Link
              key={href}
              href={href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "6px 0",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  background: active ? "rgba(220,20,60,0.12)" : "transparent",
                  transition: "background 0.2s",
                  boxShadow: active ? "0 0 12px rgba(220,20,60,0.3)" : "none",
                }}
              >
                <Icon
                  size={17}
                  color={active ? "var(--red)" : "var(--text-muted)"}
                  strokeWidth={active ? 2.2 : 1.7}
                  style={active ? { filter: "drop-shadow(0 0 5px rgba(220,20,60,0.7))" } : undefined}
                />
              </div>
              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: active ? 700 : 400,
                  color: active ? "var(--red)" : "var(--text-muted)",
                  letterSpacing: "0.04em",
                  fontFamily: active ? "var(--font-oswald), sans-serif" : "inherit",
                  transition: "color 0.15s",
                  textShadow: active ? "0 0 10px rgba(220,20,60,0.6)" : "none",
                }}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
