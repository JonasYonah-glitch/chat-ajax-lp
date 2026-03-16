interface IconProps { className?: string; size?: number; fill?: string }

export function PixIcon({ className, size = 20, fill = 'currentColor' }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M14.5 3.5L10 8 5.5 3.5M5.5 16.5L10 12l4.5 4.5M3.5 5.5L8 10l-4.5 4.5M16.5 5.5L12 10l4.5 4.5" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
