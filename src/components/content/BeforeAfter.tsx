import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'
import { SolarIcon } from '../../icons/SolarIcon'

const items = [
  { before: '8+ abas abertas pra responder', after: '1 tela pra todos os canais' },
  { before: 'Mensagens sumindo entre canais', after: 'Nenhuma mensagem se perde' },
  { before: 'Nao sabe o que o cliente ja pediu', after: 'Historico completo de cada cliente' },
  { before: 'Demora 2 a 4 horas pra responder', after: 'Responde em menos de 1 minuto' },
  { before: 'Time repetindo as mesmas respostas', after: 'Automacao resolve a maioria' },
  { before: 'Sem nocao de como ta o atendimento', after: 'Ve os numeros em tempo real' },
]

export function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const rows = sectionRef.current!.querySelectorAll('.ba-row')
      rows.forEach((row, i) => {
        gsap.fromTo(row,
          { y: 20, opacity: 0 },
          {
            scrollTrigger: { trigger: row, start: 'top 90%', once: true },
            y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: i * 0.06,
          },
        )
      })

      // Animate the arrow icons
      const arrows = sectionRef.current!.querySelectorAll('.ba-arrow')
      arrows.forEach((arrow, i) => {
        gsap.fromTo(arrow,
          { scale: 0, rotation: -90 },
          {
            scrollTrigger: { trigger: arrow, start: 'top 90%', once: true },
            scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)', delay: 0.3 + i * 0.06,
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 max-md:py-14 bg-ajax-white relative overflow-hidden">
      {/* Subtle bg accent */}
      <div className="absolute -top-16 -right-16 w-[300px] h-[300px] bg-ajax-purple/4 pointer-events-none" style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }} />

      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h2 className="text-center text-3xl lg:text-4xl font-extrabold text-ajax-black leading-tight mb-3">
            Antes e depois do{' '}
            <span className="text-ajax-purple">Chat Ajax</span>
          </h2>
          <div className="w-12 h-[3px] bg-ajax-purple mx-auto mb-12" />

          {/* Cards — each row shows before → after */}
          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="ba-row grid grid-cols-[1fr_auto_1fr] max-md:grid-cols-1 items-center gap-4 max-md:gap-2"
              >
                {/* Before */}
                <div className="flex items-center gap-3 px-5 py-4 bg-red-50 border border-red-200/60">
                  <SolarIcon icon="solar:close-circle-bold" size={18} className="text-red-400 shrink-0" />
                  <span className="text-sm text-ajax-black/70 line-through decoration-red-300/60">{item.before}</span>
                </div>

                {/* Arrow */}
                <div className="ba-arrow flex items-center justify-center max-md:rotate-90 max-md:py-1">
                  <div className="w-8 h-8 bg-ajax-purple flex items-center justify-center">
                    <SolarIcon icon="solar:arrow-right-linear" size={16} className="text-white" />
                  </div>
                </div>

                {/* After */}
                <div className="flex items-center gap-3 px-5 py-4 bg-emerald-50 border border-emerald-200/60">
                  <SolarIcon icon="solar:check-circle-bold" size={18} className="text-emerald-500 shrink-0" />
                  <span className="text-sm text-ajax-black font-semibold">{item.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
