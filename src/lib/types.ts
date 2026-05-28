export interface Habit {
  id: string
  label: string
  category: "spiritual" | "body" | "mind" | "discipline"
  weight: number
}

export interface DailyData {
  date: string
  habits: Record<string, boolean>
  streaks: Record<string, number>
  mood: number
  tradingSetup: boolean | null
  notes: string
}

export interface Goal {
  id: string
  text: string
  done: boolean
  deadline: "week" | "month" | "year"
}

export interface ResetEntry {
  date: string
  reason: string
}

export const HABITS: Habit[] = [
  { id: "fajr", label: "Fajr", category: "spiritual", weight: 10 },
  { id: "dhuhr", label: "Dhuhr", category: "spiritual", weight: 8 },
  { id: "asr", label: "Asr", category: "spiritual", weight: 8 },
  { id: "maghrib", label: "Maghrib", category: "spiritual", weight: 8 },
  { id: "isha", label: "Isha", category: "spiritual", weight: 8 },
  { id: "adhkar", label: "Adhkar matin/soir", category: "spiritual", weight: 7 },
  { id: "quran", label: "Lecture Coran", category: "spiritual", weight: 7 },
  { id: "sport", label: "Sport / Posture", category: "body", weight: 8 },
  { id: "nutrition", label: "Nutrition propre", category: "body", weight: 6 },
  { id: "sleep", label: "Sommeil avant minuit", category: "body", weight: 5 },
  { id: "work", label: "Trading / Travail focus", category: "mind", weight: 9 },
  { id: "reading", label: "Lecture livre", category: "mind", weight: 6 },
  { id: "nosocial", label: "Pas de réseaux inutiles", category: "discipline", weight: 5 },
  { id: "nofap", label: "Continence", category: "discipline", weight: 8 },
  { id: "nosocialize", label: "Pas traîné avec amis", category: "discipline", weight: 4 },
  { id: "planning", label: "Planification faite", category: "discipline", weight: 7 },
]

export const CATEGORY_LABELS: Record<string, string> = {
  spiritual: "Spirituel",
  body: "Corps",
  mind: "Mental",
  discipline: "Discipline",
}

export const CATEGORY_COLORS: Record<string, string> = {
  spiritual: "#D4AF37",
  body: "#22c55e",
  mind: "#3b82f6",
  discipline: "#a855f7",
}
