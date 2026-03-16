import { useRef, useLayoutEffect, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'

interface AnimatedGridProps {
  className?: string
  children?: ReactNode
}

/**
 * AnimatedGrid — wraps children in a relative container with the `.tech-grid`
 * CSS class. On scroll, the grid opacity pulses subtly using GSAP + ScrollTrigger.
 */
export function AnimatedGrid({ className = '', children }: AnimatedGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!gridRef.current) return

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current,
        { opacity: 0.03 },
        {
          opacity: 0.08,
          yoyo: true,
          repeat: -1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 2,
          },
        },
      )
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Grid overlay */}
      <div
        ref={gridRef}
        className="tech-grid absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.03 }}
      />
      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
