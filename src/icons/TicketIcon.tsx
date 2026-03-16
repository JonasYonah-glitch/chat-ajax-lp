import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function TicketIcon({ size = 20, className, fill }: Props) {
  return <SolarIcon icon="solar:ticket-linear" size={size} className={className} fill={fill} />
}
