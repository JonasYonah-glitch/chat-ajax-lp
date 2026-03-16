import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'

interface GeometricAccentsProps {
  className?: string
  variant?: 'triangles' | 'parallelograms' | 'mixed'
}

type ShapeType = 'triangle-up' | 'arrow-right' | 'parallelogram'

interface ShapeConfig {
  type: ShapeType
  w: number
  h: number
  top: string
  left: string
  opacity: number
  delay: number
  duration: number
  rotation: number
}

const CLIP_PATHS: Record<ShapeType, string> = {
  'triangle-up':   'polygon(50% 0%, 0% 100%, 100% 100%)',
  'arrow-right':   'polygon(0 0, 75% 50%, 0 100%)',
  'parallelogram': 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
}

const MIXED_SHAPES: ShapeConfig[] = [
  { type: 'triangle-up',   w: 80,  h: 80,  top: '10%', left: '5%',  opacity: 0.05, delay: 0,    duration: 4.5, rotation: 5  },
  { type: 'parallelogram', w: 120, h: 55,  top: '65%', left: '78%', opacity: 0.04, delay: 0.8,  duration: 5.2, rotation: -4 },
  { type: 'triangle-up',   w: 50,  h: 50,  top: '38%', left: '92%', opacity: 0.06, delay: 1.4,  duration: 3.8, rotation: 8  },
  { type: 'arrow-right',   w: 70,  h: 70,  top: '75%', left: '12%', opacity: 0.04, delay: 0.5,  duration: 5.8, rotation: -6 },
  { type: 'parallelogram', w: 100, h: 45,  top: '20%', left: '60%', opacity: 0.03, delay: 2.0,  duration: 4.2, rotation: 3  },
  { type: 'triangle-up',   w: 40,  h: 40,  top: '55%', left: '45%', opacity: 0.05, delay: 1.1,  duration: 6.0, rotation: -5 },
]

const TRIANGLE_SHAPES: ShapeConfig[] = [
  { type: 'triangle-up', w: 90,  h: 90,  top: '8%',  left: '4%',  opacity: 0.05, delay: 0,   duration: 4.5, rotation: 6  },
  { type: 'triangle-up', w: 55,  h: 55,  top: '60%', left: '80%', opacity: 0.04, delay: 0.9, duration: 5.5, rotation: -5 },
  { type: 'triangle-up', w: 40,  h: 40,  top: '35%', left: '95%', opacity: 0.06, delay: 1.6, duration: 3.9, rotation: 8  },
  { type: 'triangle-up', w: 70,  h: 70,  top: '78%', left: '18%', opacity: 0.04, delay: 0.4, duration: 5.0, rotation: -7 },
]

const PARALLELOGRAM_SHAPES: ShapeConfig[] = [
  { type: 'parallelogram', w: 130, h: 60, top: '12%', left: '6%',  opacity: 0.04, delay: 0,   duration: 5.0, rotation: 4  },
  { type: 'parallelogram', w: 100, h: 45, top: '68%', left: '75%', opacity: 0.05, delay: 0.7, duration: 4.5, rotation: -3 },
  { type: 'parallelogram', w: 80,  h: 38, top: '40%', left: '88%', opacity: 0.03, delay: 1.5, duration: 6.0, rotation: 5  },
  { type: 'parallelogram', w: 110, h: 50, top: '80%', left: '20%', opacity: 0.04, delay: 0.3, duration: 4.8, rotation: -6 },
]

function getShapes(variant: GeometricAccentsProps['variant']): ShapeConfig[] {
  switch (variant) {
    case 'triangles':      return TRIANGLE_SHAPES
    case 'parallelograms': return PARALLELOGRAM_SHAPES
    case 'mixed':
    default:               return MIXED_SHAPES
  }
}

export function GeometricAccents({ className = '', variant = 'mixed' }: GeometricAccentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const shapes = Array.from(containerRef.current.children) as HTMLElement[]
    const ctx = gsap.context(() => {
      shapes.forEach((shape, i) => {
        const cfg = getShapes(variant)[i]
        if (!cfg) return
        gsap.to(shape, {
          y: -10 - Math.random() * 8,
          rotation: cfg.rotation,
          duration: cfg.duration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: cfg.delay,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [variant])

  const shapes = getShapes(variant)

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {shapes.map((cfg, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: cfg.w,
            height: cfg.h,
            top: cfg.top,
            left: cfg.left,
            opacity: cfg.opacity,
            background: '#5E17EB',
            clipPath: CLIP_PATHS[cfg.type],
          }}
        />
      ))}
    </div>
  )
}
