import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'

const stats = [
  { num: '10+', label: 'Canais conectados', countTo: 10, accent: true },
  { num: '523+', label: 'Empresas usando', countTo: 523, accent: false },
  { num: '99.9%', label: 'Tempo no ar', accent: true },
  { num: '24/7', label: 'IA respondendo', accent: false },
]

const badges = ['Segue a LGPD', 'WhatsApp Oficial', 'Dados criptografados']

export function ProofBar() {
  const containerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      // Animate countable numbers
      containerRef.current!.querySelectorAll('[data-count]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            const val = Math.round(parseFloat(el.textContent || '0'))
            el.textContent = val + '+'
          },
        })
      })

      // Stagger reveal stat boxes
      const boxes = containerRef.current!.querySelectorAll('.stat-box')
      gsap.fromTo(
        boxes,
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: containerRef.current, start: 'top 90%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-14 bg-white border-y-2 border-[#131313]/10">
      <Container>
        <div className="flex items-center justify-center gap-0 flex-wrap max-md:gap-0 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-stretch">
              {/* Stat box */}
              <div
                className="stat-box text-center px-8 py-4 max-md:px-5 max-md:py-3 flex flex-col items-center justify-center"
              >
                <div
                  className={`text-[2.2rem] max-md:text-[1.8rem] font-extrabold leading-none ${
                    stat.accent ? 'text-[#5E17EB]' : 'text-[#131313]'
                  }`}
                  {...(stat.countTo ? { 'data-count': stat.countTo } : {})}
                >
                  {stat.num}
                </div>
                <div className="text-xs text-[#131313]/50 mt-1 uppercase tracking-[0.1em] font-semibold max-w-[100px] leading-tight">
                  {stat.label}
                </div>
              </div>

              {/* Vertical divider — except after last stat */}
              {i < stats.length - 1 && (
                <div className="w-[2px] self-stretch bg-[#131313]/10 mx-0 my-2" aria-hidden="true" />
              )}
            </div>
          ))}

          {/* Trust badges — separated by vertical line */}
          <div className="flex items-center max-md:flex-wrap max-md:justify-center max-md:gap-2 gap-3 pl-8 max-md:pl-0 max-md:mt-4 max-md:w-full border-l-2 border-[#131313]/10 max-md:border-l-0 max-md:border-t-2 max-md:pt-4">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="stat-box flex items-center gap-1.5 py-2 px-4 border-2 border-[#131313]/20 text-xs text-[#131313] font-bold uppercase tracking-[0.08em] hover:border-[#5E17EB] hover:text-[#5E17EB] transition-colors duration-200"
                style={{ borderRadius: 0 }}
              >
                {/* Green dot indicator */}
                <span className="w-1.5 h-1.5 bg-[#34D399] flex-shrink-0" aria-hidden="true" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
