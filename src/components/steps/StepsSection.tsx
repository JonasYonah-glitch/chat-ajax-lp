import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { SolarIcon } from '../../icons/SolarIcon'

const steps = [
  {
    number: '01',
    title: 'Crie sua conta',
    description: 'Cadastro em 2 minutos. 14 dias gratis pra testar tudo.',
    icon: 'solar:rocket-2-bold-duotone',
    color: '#5E17EB',
  },
  {
    number: '02',
    title: 'Conecte seus canais',
    description: 'Liga WhatsApp, Instagram e o que mais usar. Ja vem com modelos prontos.',
    icon: 'solar:plug-circle-bold-duotone',
    color: '#5E17EB',
  },
  {
    number: '03',
    title: 'Veja os resultados',
    description: 'Acompanha quantos clientes a IA atendeu e quanto voce vendeu a mais.',
    icon: 'solar:chart-2-bold-duotone',
    color: '#5E17EB',
  },
]

export function StepsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.step-card')
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
            y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: i * 0.12,
          },
        )
      })

      // Connector lines
      const lines = sectionRef.current!.querySelectorAll('.step-connector')
      lines.forEach((line) => {
        gsap.fromTo(line,
          { scaleX: 0 },
          {
            scrollTrigger: { trigger: line, start: 'top 85%', once: true },
            scaleX: 1, duration: 0.6, ease: 'power2.out', transformOrigin: 'left center',
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 max-md:py-12 bg-ajax-surface" id="como-funciona">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h2 className="text-center text-3xl lg:text-4xl font-extrabold text-ajax-black leading-tight mb-2">
            Tres passos pra{' '}
            <span className="text-ajax-purple">comecar hoje</span>
          </h2>
          <div className="w-12 h-[3px] bg-ajax-purple mx-auto mb-12 max-md:mb-8" />

          {/* Cards */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Connector lines (desktop) */}
            <div className="hidden md:block absolute top-12 left-[calc(33.33%+12px)] right-[calc(33.33%+12px)] pointer-events-none" aria-hidden="true">
              <div className="step-connector h-[2px] w-full opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #5E17EB 0, #5E17EB 6px, transparent 6px, transparent 12px)' }} />
            </div>

            {steps.map((step, i) => (
              <div
                key={step.number}
                className="step-card bg-white border-2 border-ajax-black/10 p-6 text-center relative transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#5E17EB] hover:border-ajax-purple"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-ajax-purple/10">
                  <SolarIcon icon={step.icon} size={32} className="text-ajax-purple" />
                </div>

                {/* Step number */}
                <span className="text-xs font-extrabold text-ajax-purple uppercase tracking-widest">Passo {step.number}</span>

                {/* Title */}
                <h3 className="text-lg font-extrabold text-ajax-black mt-2 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-ajax-black/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-10">
            <Button href="#pricing" variant="primary">
              Comecar de graca
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
