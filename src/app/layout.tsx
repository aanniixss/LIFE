import type { Metadata, Viewport } from "next"
import { Inter, Oswald } from "next/font/google"
import "./globals.css"
import BottomNav from "@/components/BottomNav"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "LIFE OS — Anis",
  description: "Ton système de vie. Reste en place.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${oswald.variable} h-full`} style={{ colorScheme: "dark" }}>
      <body className="min-h-dvh" style={{ background: "var(--bg)" }}>
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
