import { Icon } from '@iconify/react'

interface SolarIconProps {
  icon: string
  size?: number
  className?: string
  fill?: string
}

export function SolarIcon({ icon, size = 16, className, fill }: SolarIconProps) {
  return <Icon icon={icon} width={size} height={size} className={className} style={fill ? { color: fill } : undefined} />
}
