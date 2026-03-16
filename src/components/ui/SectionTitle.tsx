interface SectionTitleProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  center?: boolean
  className?: string
}

export function SectionTitle({ title, subtitle, center = true, className = '' }: SectionTitleProps) {
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      <h2 className="text-[1.65rem] sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] leading-[1.15] mb-3 text-[#131313] uppercase max-w-[720px] mx-auto">
        {title}
      </h2>

      {/* Geometric accent line */}
      <div
        className={`w-16 h-[3px] bg-[#5E17EB] mb-4 ${center ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />

      {subtitle && (
        <p
          className={`text-base text-[#131313]/60 max-w-[640px] leading-[1.7] ${
            center ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
