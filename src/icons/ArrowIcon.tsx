import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function ArrowIcon({ size = 16, className, fill }: Props) {
  return <SolarIcon icon="solar:arrow-right-linear" size={size} className={className} fill={fill} />
}
