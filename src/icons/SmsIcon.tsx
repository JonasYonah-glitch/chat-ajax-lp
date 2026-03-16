import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function SmsIcon({ size = 16, className, fill }: Props) {
  return <SolarIcon icon="solar:chat-dots-linear" size={size} className={className} fill={fill} />
}
