import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function StarIcon({ size = 16, className, fill }: Props) {
  return <SolarIcon icon="solar:star-bold" size={size} className={className} fill={fill} />
}
