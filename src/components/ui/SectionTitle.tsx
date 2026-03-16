interface SectionTitleProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  center?: boolean
  className?: string
}

export function SectionTitle({ title, subtitle, center = true, className = '' }: SectionTitleProps) {
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.1] mb-3 text-[#131313] uppercase">
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
