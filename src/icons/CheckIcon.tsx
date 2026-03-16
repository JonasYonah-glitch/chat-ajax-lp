import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function CheckIcon({ size = 16, className, fill }: Props) {
  return <SolarIcon icon="solar:check-circle-linear" size={size} className={className} fill={fill} />
}
