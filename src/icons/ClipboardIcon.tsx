import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function ClipboardIcon({ size = 20, className, fill }: Props) {
  return <SolarIcon icon="solar:clipboard-list-linear" size={size} className={className} fill={fill} />
}
