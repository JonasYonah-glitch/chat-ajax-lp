import { SolarIcon } from './SolarIcon'

interface Props {
  size?: number
  className?: string
  fill?: string
}

export function ChartBarIcon({ size = 20, className, fill }: Props) {
  return <SolarIcon icon="solar:chart-2-linear" size={size} className={className} fill={fill} />
}
