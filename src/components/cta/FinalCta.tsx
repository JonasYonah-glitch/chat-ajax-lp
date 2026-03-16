import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'
import { ArrowIcon } from '../../icons'
import { useCheckout } from '../../hooks/useCheckout'
import { ScanLines } from '../backgrounds/ScanLines'

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const { openCheckout } = useCheckout()

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const elements = sectionRef.current!.querySelectorAll('.cta-reveal')
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.12,
          },
        )
      })

      // Animate geometric accent shapes
      gsap.fromTo(
        '.cta-shape',
        { opacity: 0, scale: 0.8 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.15,
        },
      )

      // Pulsing glow on CTA button — fires once scroll trigger activates section
      if (btnRef.current) {
        gsap.to(btnRef.current, {
          boxShadow: '0 0 25px rgba(94,23,235,0.5)',
          duration: 1.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 max-md:py-16 relative overflow-hidden bg-[#131313]"
      id="start"
    >
      {/* Scan lines — data-stream effect */}
      <ScanLines />

      {/* Geometric parallelogram accents in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Large parallelogram — top right */}
        <div
          className="cta-shape absolute -top-16 -right-16 w-[400px] h-[400px] bg-[#5E17EB]/8"
          style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
        />
        {/* Small parallelogram — bottom left */}
        <div
          className="cta-shape absolute -bottom-8 -left-8 w-[280px] h-[280px] bg-[#5E17EB]/6"
          style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
        />
        {/* Tiny accent — center right */}
        <div
          className="cta-shape absolute top-1/3 right-[10%] w-[120px] h-[120px] bg-[#5E17EB]/10"
          style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}
        />
        {/* Horizontal accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#5E17EB]" />
      </div>

      <Container className="relative z-[1]">
        <div className="text-center max-w-[640px] mx-auto">
          {/* Overline tag */}
          <div
            className="cta-reveal inline-block px-4 py-1 bg-[#5E17EB] text-white text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
          >
            Comece Agora
          </div>

          <h2 className="cta-reveal text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.1] mb-5 text-[#FAFAFA] uppercase tracking-[-0.02em]">
            Cada minuto sem Chat Ajax e uma{' '}
            <span className="text-[#5E17EB]">venda perdida</span>
          </h2>

          {/* Geometric accent line */}
          <div className="cta-reveal w-16 h-[3px] bg-[#5E17EB] mx-auto mb-6" aria-hidden="true" />

          <p className="cta-reveal text-[clamp(.95rem,2.5vw,1.1rem)] text-[#FAFAFA]/60 leading-[1.7] mb-10">
            Configure em 5 minutos. Veja resultados amanha. Junte-se a centenas de empresas que ja
            centralizam canais e aumentam vendas.
          </p>

          <div className="cta-reveal mb-5 flex justify-center">
            <button
              ref={btnRef}
              onClick={() =>
                openCheckout({
                  id: 'pro',
                  name: 'Pro',
                  price: 'R$797',
                  numericValue: 797,
                  cycle: 'MONTHLY',
                })
              }
              className={[
                'inline-flex items-center justify-center gap-2',
                'py-4 px-10 text-sm',
                'font-bold uppercase tracking-[0.1em]',
                'bg-[#5E17EB] text-white',
                'border-none cursor-pointer',
                'shadow-[4px_4px_0_#FAFAFA]',
                'hover:shadow-[8px_8px_0_#FAFAFA] hover:-translate-x-[2px] hover:-translate-y-[2px]',
                'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
                'transition-all duration-200',
                'min-h-[52px]',
              ].join(' ')}
              style={{ borderRadius: 0 }}
            >
              Teste Gratis por 14 Dias <ArrowIcon size={15} />
            </button>
          </div>

          <p className="cta-reveal text-xs text-[#FAFAFA]/40 uppercase tracking-[0.1em] font-semibold">
            Sem cartao de credito &bull; 14 dias gratis &bull; Cancele quando quiser
          </p>
        </div>
      </Container>
    </section>
  )
}
