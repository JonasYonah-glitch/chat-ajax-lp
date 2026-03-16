import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function CalendarIcon({ size = 20, className, fill }: Props) {
  return <SolarIcon icon="solar:calendar-linear" size={size} className={className} fill={fill} />
}
