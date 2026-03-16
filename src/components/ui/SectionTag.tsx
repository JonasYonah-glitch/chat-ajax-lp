interface SectionTagProps {
  children: React.ReactNode
  className?: string
}

export function SectionTag({ children, className = '' }: SectionTagProps) {
  return (
    <div
      className={`inline-block px-4 py-1 bg-[#5E17EB] text-white text-xs font-bold uppercase tracking-[0.2em] mb-4 ${className}`}
      style={{
        clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
        borderRadius: 0,
      }}
    >
      {children}
    </div>
  )
}
