import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function DressIcon({ size = 20, className, fill }: Props) {
  return <SolarIcon icon="solar:shop-linear" size={size} className={className} fill={fill} />
}
