import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function VideoIcon({ size = 20, className, fill }: Props) {
  return <SolarIcon icon="solar:videocamera-linear" size={size} className={className} fill={fill} />
}
