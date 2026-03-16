import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'

export function useGsapReveal<T extends HTMLElement>(
  options?: { y?: number; start?: string; duration?: number; delay?: number }
) {
  const ref = useRef<T>(null)
  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: options?.y ?? 40, opacity: 0 },
        {
          scrollTrigger: { trigger: ref.current, start: options?.start ?? 'top 95%', once: true },
          y: 0, opacity: 1, duration: options?.duration ?? 0.7, ease: 'power2.out',
          delay: options?.delay ?? 0
        }
      )
    })
    return () => ctx.revert()
  }, [])
  return ref
}
