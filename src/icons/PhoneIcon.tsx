import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function PhoneIcon({ size = 16, className, fill }: Props) {
  return <SolarIcon icon="solar:phone-linear" size={size} className={className} fill={fill} />
}
