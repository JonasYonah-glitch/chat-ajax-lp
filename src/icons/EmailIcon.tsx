import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function EmailIcon({ size = 16, className, fill }: Props) {
  return <SolarIcon icon="solar:letter-linear" size={size} className={className} fill={fill} />
}
