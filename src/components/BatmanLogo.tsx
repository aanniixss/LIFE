"use client"

interface BatmanLogoProps {
  size?: number
  animated?: boolean
}

export default function BatmanLogo({ size = 52, animated = true }: BatmanLogoProps) {
  return (
    <svg
      width={size}
      height={size * 0.46}
      viewBox="0 0 200 92"
      fill="#DC143C"
      xmlns="http://www.w3.org/2000/svg"
      style={animated ? { animation: "bat-glow 2.8s ease-in-out infinite" } : undefined}
    >
      <path d="M100 8C96 8 90 10 86 16L74 10C58 4 36 8 22 20C30 22 36 30 38 44C28 40 16 44 12 54C22 50 34 50 42 56C46 66 56 74 70 76C74 84 86 88 100 88C114 88 126 84 130 76C144 74 154 66 158 56C166 50 178 50 188 54C184 44 172 40 162 44C164 30 170 22 178 20C164 8 142 4 126 10L114 16C110 10 104 8 100 8Z" />
    </svg>
  )
}
