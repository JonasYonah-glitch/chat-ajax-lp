import { useRef, useState, useCallback } from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  className?: string
  onClick?: () => void
  onConfetti?: (x: number, y: number) => void
  fullWidth?: boolean
  size?: 'default' | 'small' | 'large'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

export function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  onClick,
  onConfetti,
  fullWidth = false,
  size = 'default',
  loading: externalLoading = false,
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle')
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const isLoading = externalLoading || state === 'loading'

  const sizeClasses = {
    small: 'py-2 px-5 text-xs min-h-[36px]',
    default: 'py-3 px-7 text-sm min-h-[44px]',
    large: 'py-4 px-9 text-base min-h-[52px]',
  }

  const variantBase = {
    primary: [
      'bg-[#5E17EB] text-white',
      'font-bold uppercase tracking-[0.1em]',
      'shadow-[4px_4px_0_#131313]',
      'hover:shadow-[8px_8px_0_#5E17EB] hover:-translate-x-[2px] hover:-translate-y-[2px]',
      'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-[4px_4px_0_#131313] disabled:translate-x-0 disabled:translate-y-0',
    ].join(' '),
    secondary: [
      'bg-transparent text-[#131313]',
      'border-2 border-[#131313]',
      'font-bold uppercase tracking-[0.1em]',
      'shadow-[4px_4px_0_#131313]',
      'hover:border-[#5E17EB] hover:text-[#5E17EB] hover:shadow-[8px_8px_0_#5E17EB] hover:-translate-x-[2px] hover:-translate-y-[2px]',
      'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ].join(' '),
    ghost: [
      'bg-transparent text-[#131313]',
      'font-bold uppercase tracking-[0.1em]',
      'hover:bg-[#F0F0F0]',
      'active:bg-[#E5E5E5]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ].join(' '),
  }

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (state !== 'idle' || disabled) return
      e.preventDefault()

      setState('loading')

      setTimeout(() => {
        setState('success')

        if (onConfetti && ref.current) {
          setTimeout(() => {
            const rect = ref.current!.getBoundingClientRect()
            onConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2)
          }, 300)
        }

        setTimeout(() => {
          setState('idle')
          if (href && href !== '#' && href !== '#start') {
            window.location.href = href
          }
          onClick?.()
        }, 3000)
      }, 1400)
    },
    [state, href, onClick, onConfetti, disabled],
  )

  const baseClasses = [
    'relative inline-flex items-center justify-center gap-2',
    'rounded-none',
    'cursor-pointer border-none',
    'transition-all duration-200',
    'overflow-hidden',
    'select-none',
    sizeClasses[size],
    variantBase[variant],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={ref as any}
      href={href}
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
      type={href ? undefined : type}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      style={isLoading ? { pointerEvents: 'none' } : undefined}
    >
      {/* Shimmer sweep on primary variant */}
      {variant === 'primary' && (
        <span
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="absolute top-0 bottom-0 w-[40%] -skew-x-12 bg-white/20 translate-x-[-150%] group-hover:translate-x-[400%] transition-transform duration-700 ease-out"
            style={{
              transitionProperty: 'transform',
            }}
          />
        </span>
      )}

      {/* Label */}
      <span
        className={`transition-all duration-300 ${state !== 'idle' ? 'opacity-0 scale-95' : ''}`}
      >
        {children}
      </span>

      {/* Loading spinner */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          state === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={state !== 'loading'}
      >
        <svg
          className="w-5 h-5 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </span>

      {/* Success state */}
      <span
        className={`absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap transition-opacity duration-300 ${
          state === 'success' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={state !== 'success'}
      >
        <svg
          viewBox="0 0 13 11"
          className="w-4 h-4"
          style={{
            stroke: '#5cffa1',
            strokeWidth: 2.5,
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeDasharray: 20,
            strokeDashoffset: state === 'success' ? 0 : 20,
            transition: 'stroke-dashoffset 0.4s ease 0.1s',
          }}
        >
          <polyline points="1.4,5.8 5.1,9.5 11.6,2.1" />
        </svg>
        <span
          className={`transition-all duration-300 delay-200 ${
            state === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
        >
          Pronto!
        </span>
      </span>
    </Tag>
  )
}
