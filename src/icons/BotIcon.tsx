import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function BotIcon({ size = 20, className, fill }: Props) {
  return <SolarIcon icon="solar:robot-linear" size={size} className={className} fill={fill} />
}
