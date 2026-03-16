interface LogoWatermarkProps {
  className?: string
  opacity?: number
}

export function LogoWatermark({ className = '', opacity = 0.03 }: LogoWatermarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      viewBox="90 210 720 480"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 618.890625 210.601562 C 682.5625 343.695312 746.238281 476.785156 809.902344 609.878906 L 588.753906 609.878906 C 560.894531 551.46875 533.035156 493.058594 505.167969 434.648438 L 449.992188 434.648438 C 404.628906 519.5625 359.269531 604.476562 313.902344 689.394531 L 90.089844 689.394531 L 230.28125 418.84375 L 496.734375 418.84375 L 396.714844 210.601562 L 618.894531 210.601562 Z" />
    </svg>
  )
}
