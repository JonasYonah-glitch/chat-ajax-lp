import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'

interface FloatingShapesProps {
  className?: string
  count?: number
}

/* Static shape definitions — positions/sizes are intentionally varied */
const SHAPE_CONFIGS = [
  { w: 180, h: 100, top: '8%',  left: '5%',  opacity: 0.05 },
  { w: 120, h:  70, top: '65%', left: '75%', opacity: 0.04 },
  { w: 200, h: 110, top: '40%', left: '55%', opacity: 0.03 },
  { w:  90, h:  50, top: '20%', left: '82%', opacity: 0.06 },
  { w: 140, h:  80, top: '78%', left: '15%', opacity: 0.04 },
]

export function FloatingShapes({ className = '', count = 4 }: FloatingShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const shapes = Array.from(containerRef.current.children)
    const ctx = gsap.context(() => {
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: -12 + Math.random() * 8,
          rotation: 2 + Math.random() * 3,
          duration: 3.5 + i * 0.7,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.4,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const shapes = SHAPE_CONFIGS.slice(0, Math.min(count, SHAPE_CONFIGS.length))

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {shapes.map((cfg, i) => (
        <div
          key={i}
          className="absolute bg-[#5E17EB]"
          style={{
            width: cfg.w,
            height: cfg.h,
            top: cfg.top,
            left: cfg.left,
            opacity: cfg.opacity,
            clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
          }}
        />
      ))}
    </div>
  )
}
