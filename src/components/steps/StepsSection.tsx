import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const steps = [
  {
    digit: '1',
    title: 'Crie sua conta',
    description: 'Cadastro em 2 minutos. 14 dias gratis pra testar tudo.',
  },
  {
    digit: '2',
    title: 'Conecte seus canais',
    description: 'Liga WhatsApp, Instagram e o que mais usar. Ja vem com modelos prontos.',
  },
  {
    digit: '3',
    title: 'Veja os resultados',
    description: 'Acompanha quantos clientes a IA atendeu e quanto voce vendeu a mais.',
  },
]

/* ── Animated SVG icons per step ── */

function RocketIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="step-icon w-14 h-14 max-md:w-12 max-md:h-12">
      {/* Flame */}
      <g className="rocket-flame">
        <path d="M28 52c0 6 4 10 4 10s4-4 4-10c0-2-1.5-4-4-4s-4 2-4 4z" fill="#F59E0B" opacity="0.9" />
      </g>
      {/* Body */}
      <path d="M32 8c-6 8-8 18-8 26v6h16v-6c0-8-2-18-8-26z" fill="#5E17EB" />
      {/* Window */}
      <circle cx="32" cy="28" r="5" fill="white" opacity="0.9" />
      <circle cx="32" cy="28" r="3" fill="#5E17EB" opacity="0.3" />
      {/* Fins */}
      <path d="M24 40l-6 8h6v-8z" fill="#5E17EB" opacity="0.6" />
      <path d="M40 40l6 8h-6v-8z" fill="#5E17EB" opacity="0.6" />
      {/* Nose */}
      <ellipse cx="32" cy="12" rx="3" ry="2" fill="white" opacity="0.4" />
    </svg>
  )
}

function PlugIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="step-icon w-14 h-14 max-md:w-12 max-md:h-12">
      {/* Cable */}
      <path d="M32 48v8" stroke="#5E17EB" strokeWidth="3" strokeLinecap="square" />
      {/* Plug body */}
      <rect x="18" y="28" width="28" height="20" rx="0" fill="#5E17EB" />
      {/* Prongs */}
      <g className="plug-prongs">
        <rect x="25" y="16" width="4" height="14" rx="0" fill="#5E17EB" opacity="0.7" />
        <rect x="35" y="16" width="4" height="14" rx="0" fill="#5E17EB" opacity="0.7" />
      </g>
      {/* Lightning bolt */}
      <path d="M34 33l-3 5h4l-3 5" stroke="white" strokeWidth="2" strokeLinecap="square" fill="none" className="plug-spark" />
      {/* Dots */}
      <circle cx="25" cy="38" r="2" fill="white" opacity="0.5" />
      <circle cx="39" cy="38" r="2" fill="white" opacity="0.5" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="step-icon w-14 h-14 max-md:w-12 max-md:h-12">
      {/* Base */}
      <path d="M12 52h40" stroke="#5E17EB" strokeWidth="3" strokeLinecap="square" />
      {/* Bars */}
      <rect className="chart-bar chart-bar-1" x="16" y="36" width="8" height="16" fill="#5E17EB" opacity="0.4" />
      <rect className="chart-bar chart-bar-2" x="28" y="26" width="8" height="26" fill="#5E17EB" opacity="0.6" />
      <rect className="chart-bar chart-bar-3" x="40" y="16" width="8" height="36" fill="#5E17EB" />
      {/* Arrow up */}
      <g className="chart-arrow">
        <path d="M48 20l4-8 4 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="square" fill="none" />
        <path d="M52 12v14" stroke="#F59E0B" strokeWidth="2" strokeLinecap="square" />
      </g>
    </svg>
  )
}

const iconComponents = [RocketIcon, PlugIcon, ChartIcon]

const SCROLL_DISTANCE_MOBILE = 160

export function StepsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // SVG icon animations
  useLayoutEffect(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Rocket flame flicker
      const flames = sectionRef.current!.querySelectorAll('.rocket-flame')
      flames.forEach((flame) => {
        gsap.to(flame, { scaleY: 0.85, scaleX: 1.1, transformOrigin: 'center top', duration: 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      })

      // Plug prongs bounce
      const prongs = sectionRef.current!.querySelectorAll('.plug-prongs')
      prongs.forEach((prong) => {
        gsap.to(prong, { y: -3, duration: 0.6, repeat: -1, yoyo: true, ease: 'power2.inOut' })
      })

      // Plug spark blink
      const sparks = sectionRef.current!.querySelectorAll('.plug-spark')
      sparks.forEach((spark) => {
        gsap.to(spark, { opacity: 0, duration: 0.4, repeat: -1, yoyo: true, ease: 'steps(1)' })
      })

      // Chart bars grow on scroll
      const bars = sectionRef.current!.querySelectorAll('.chart-bar')
      bars.forEach((bar) => {
        gsap.fromTo(bar,
          { scaleY: 0, transformOrigin: 'bottom' },
          {
            scrollTrigger: { trigger: bar, start: 'top 92%', once: true },
            scaleY: 1, duration: 0.8, ease: 'power2.out',
          },
        )
      })

      // Chart arrow pulse
      const arrows = sectionRef.current!.querySelectorAll('.chart-arrow')
      arrows.forEach((arrow) => {
        gsap.to(arrow, { y: -3, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      })
    })

    return () => ctx.revert()
  }, [])

  // Desktop: stagger entrance
  useLayoutEffect(() => {
    if (isMobile || !sectionRef.current) return
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
  }, [isMobile])

  // Mobile: scroll-stacking
  useLayoutEffect(() => {
    if (!isMobile || !wrapperRef.current || !gridRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = gridRef.current.querySelectorAll<HTMLElement>('.step-card')
    if (cards.length === 0) return

    const firstCard = cards[0]
    const cardH = firstCard.offsetHeight || 280

    const ctx = gsap.context(() => {
      const totalCards = cards.length
      const wrapperHeight = (totalCards - 1) * SCROLL_DISTANCE_MOBILE + cardH + 100

      gsap.set(wrapperRef.current, { height: wrapperHeight })
      gsap.set(gridRef.current, { position: 'sticky', top: 80, height: cardH })

      cards.forEach((card, i) => {
        gsap.set(card, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: i,
        })
        if (i > 0) gsap.set(card, { opacity: 0, y: 40 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 80px',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      tl.to({}, { duration: 0.3 })

      for (let i = 0; i < totalCards - 1; i++) {
        tl.to(cards[i], { scale: 0.92, y: -15, opacity: 0, duration: 0.5, ease: 'power1.inOut' }, `s-${i}`)
        tl.to(cards[i + 1], { opacity: 1, y: 0, duration: 0.5, ease: 'power1.inOut' }, `s-${i}`)
        if (i < totalCards - 2) tl.to({}, { duration: 0.3 })
      }

      tl.to({}, { duration: 0.3 })
    })

    return () => ctx.revert()
  }, [isMobile])

  const cardContent = (
    <>
      {steps.map((step, idx) => {
        const IconComp = iconComponents[idx]
        return (
          <div
            key={step.digit}
            className="step-card bg-white border-2 border-ajax-black/10 p-6 max-md:p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#5E17EB] hover:border-ajax-purple"
          >
            {/* Large digit — top right */}
            <span
              className="absolute -top-2 -right-1 text-[5.5rem] max-md:text-[5rem] font-black leading-none text-ajax-purple/[0.07] select-none pointer-events-none"
              aria-hidden="true"
            >
              {step.digit}
            </span>

            {/* Icon */}
            <div className="mb-4">
              <IconComp />
            </div>

            {/* Step label */}
            <span className="text-[11px] font-extrabold text-ajax-purple uppercase tracking-[0.15em]">
              Passo {step.digit}
            </span>

            {/* Title */}
            <h3 className="text-lg font-extrabold text-ajax-black mt-1.5 mb-2">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-ajax-black/60 leading-relaxed">
              {step.description}
            </p>
          </div>
        )
      })}
    </>
  )

  return (
    <section ref={sectionRef} className="py-16 max-md:py-10 bg-ajax-surface" id="como-funciona">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h2 className="text-center text-3xl lg:text-4xl font-extrabold text-ajax-black leading-tight mb-2">
            3 passos pra{' '}
            <span className="text-ajax-purple">comecar hoje</span>
          </h2>
          <div className="w-12 h-[3px] bg-ajax-purple mx-auto mb-10 max-md:mb-6" />

          {isMobile ? (
            /* Mobile: scroll-stacking */
            <div ref={wrapperRef} className="relative">
              <div ref={gridRef} className="relative">
                {cardContent}
              </div>
            </div>
          ) : (
            /* Desktop: 3-col grid */
            <div className="relative grid grid-cols-3 gap-6">
              {/* Connector lines */}
              <div className="absolute top-10 left-[calc(33.33%+12px)] right-[calc(33.33%+12px)] pointer-events-none" aria-hidden="true">
                <div className="step-connector h-[2px] w-full opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #5E17EB 0, #5E17EB 6px, transparent 6px, transparent 12px)' }} />
              </div>
              {cardContent}
            </div>
          )}

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
