import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { SectionTag } from '../ui/SectionTag'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const steps = [
  {
    digit: '1',
    title: 'Crie sua conta',
    description: 'Cadastro em 2 minutos. 14 dias gratis pra testar tudo sem compromisso.',
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

/* ── Step Icons — meaningful, on-brand, neo-brutalist ── */

function AccountIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="step-icon w-11 h-11">
      {/* Person head */}
      <circle cx="24" cy="16" r="8" fill="#5E17EB" />
      {/* Person body */}
      <path d="M10 42c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="#5E17EB" opacity="0.55" />
      {/* Plus badge */}
      <rect x="33" y="4" width="12" height="12" fill="#131313" />
      <path d="M39 7v6M36 10h6" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="square" />
      {/* Sparkle */}
      <g className="icon-sparkle">
        <path d="M6 8l1.5 3L6 14l1.5-3L6 8z" fill="#5E17EB" opacity="0.5" />
        <path d="M4 11h4" stroke="#5E17EB" strokeWidth="1" opacity="0.5" />
      </g>
    </svg>
  )
}

function ConnectIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="step-icon w-11 h-11">
      {/* Center hub */}
      <rect x="17" y="17" width="14" height="14" fill="#5E17EB" />
      {/* Connection lines */}
      <g className="icon-pulse" opacity="0.4">
        <path d="M24 17V6" stroke="#5E17EB" strokeWidth="2" strokeLinecap="square" />
        <path d="M24 31v11" stroke="#5E17EB" strokeWidth="2" strokeLinecap="square" />
        <path d="M17 24H6" stroke="#5E17EB" strokeWidth="2" strokeLinecap="square" />
        <path d="M31 24h11" stroke="#5E17EB" strokeWidth="2" strokeLinecap="square" />
      </g>
      {/* Channel nodes */}
      <rect x="19" y="1" width="10" height="10" fill="#131313" />
      <rect x="19" y="37" width="10" height="10" fill="#131313" />
      <rect x="1" y="19" width="10" height="10" fill="#131313" />
      <rect x="37" y="19" width="10" height="10" fill="#131313" />
      {/* Node symbols */}
      <path d="M22 5.5h4M24 3.5v4" stroke="#FAFAFA" strokeWidth="1.2" strokeLinecap="square" />
      <circle cx="24" cy="42" r="2" fill="#FAFAFA" />
      <path d="M4 24l2-2 2 2" stroke="#FAFAFA" strokeWidth="1.2" strokeLinecap="square" fill="none" />
      <rect x="40" y="22.5" width="4" height="3" fill="#FAFAFA" opacity="0.9" />
      {/* Inner icon */}
      <path d="M21 21l3 3 3-3" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="square" fill="none" />
      <path d="M21 27l3-3 3 3" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="square" fill="none" />
    </svg>
  )
}

function ResultsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="step-icon w-11 h-11">
      {/* Screen frame */}
      <rect x="4" y="6" width="40" height="30" fill="none" stroke="#5E17EB" strokeWidth="2.5" />
      {/* Screen bg */}
      <rect x="6" y="8" width="36" height="26" fill="#5E17EB" opacity="0.08" />
      {/* Trend line going up */}
      <polyline
        points="10,28 18,22 26,25 38,12"
        stroke="#5E17EB"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
        className="icon-draw"
      />
      {/* Arrow tip on trend */}
      <path d="M35 10h5v5" stroke="#5E17EB" strokeWidth="2.5" strokeLinecap="square" fill="none" />
      {/* Stand */}
      <path d="M20 36h8" stroke="#131313" strokeWidth="2.5" strokeLinecap="square" />
      <path d="M24 36v6" stroke="#131313" strokeWidth="2.5" strokeLinecap="square" />
      <path d="M18 42h12" stroke="#131313" strokeWidth="2.5" strokeLinecap="square" />
      {/* Data dots */}
      <rect x="10" y="26" width="3" height="3" fill="#5E17EB" />
      <rect x="18" y="20" width="3" height="3" fill="#5E17EB" />
      <rect x="26" y="23" width="3" height="3" fill="#5E17EB" />
      {/* Success badge */}
      <g className="icon-badge">
        <rect x="34" y="0" width="14" height="14" fill="#131313" />
        <path d="M38 7l2 2 4-4" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="square" fill="none" />
      </g>
    </svg>
  )
}

const iconComponents = [AccountIcon, ConnectIcon, ResultsIcon]

const SCROLL_DISTANCE_MOBILE = 180

export function StepsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Icon micro-animations
  useLayoutEffect(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Sparkle pulse
      const sparkles = sectionRef.current!.querySelectorAll('.icon-sparkle')
      sparkles.forEach((s) => {
        gsap.to(s, { scale: 1.3, opacity: 0.3, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'center' })
      })

      // Connection pulse
      const pulses = sectionRef.current!.querySelectorAll('.icon-pulse')
      pulses.forEach((p) => {
        gsap.to(p, { opacity: 0.8, duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      })

      // Trend line draw
      const lines = sectionRef.current!.querySelectorAll('.icon-draw')
      lines.forEach((line) => {
        const el = line as SVGPolylineElement
        const len = el.getTotalLength?.() || 80
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          strokeDashoffset: 0, duration: 1.2, ease: 'power2.out',
        })
      })

      // Badge bounce
      const badges = sectionRef.current!.querySelectorAll('.icon-badge')
      badges.forEach((b) => {
        gsap.to(b, { y: -2, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
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
          { y: 40, opacity: 0 },
          {
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
            y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: i * 0.15,
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
            scaleX: 1, duration: 0.7, ease: 'power2.out', transformOrigin: 'left center',
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
    const cardH = firstCard.offsetHeight || 320

    const ctx = gsap.context(() => {
      const totalCards = cards.length
      const wrapperHeight = (totalCards - 1) * SCROLL_DISTANCE_MOBILE + cardH + 120

      gsap.set(wrapperRef.current, { height: wrapperHeight })
      gsap.set(gridRef.current, { position: 'sticky', top: 72, height: cardH })

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
          start: 'top 72px',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      tl.to({}, { duration: 0.25 })

      for (let i = 0; i < totalCards - 1; i++) {
        tl.to(cards[i], { scale: 0.93, y: -12, opacity: 0, duration: 0.5, ease: 'power1.inOut' }, `s-${i}`)
        tl.to(cards[i + 1], { opacity: 1, y: 0, duration: 0.5, ease: 'power1.inOut' }, `s-${i}`)
        if (i < totalCards - 2) tl.to({}, { duration: 0.25 })
      }

      tl.to({}, { duration: 0.25 })
    })

    return () => ctx.revert()
  }, [isMobile])

  const renderCard = (step: typeof steps[0], idx: number) => {
    const IconComp = iconComponents[idx]
    return (
      <div
        key={step.digit}
        className="step-card group bg-white border-2 border-ajax-black/10 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_#5E17EB] hover:border-ajax-purple"
      >
        {/* Purple accent bar — left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-ajax-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Corner triangle */}
        <div
          className="absolute top-0 right-0 w-0 h-0 z-[2] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            borderStyle: 'solid',
            borderWidth: '0 28px 28px 0',
            borderColor: 'transparent #5E17EB transparent transparent',
          }}
          aria-hidden="true"
        />

        {/* Large digit — top right, bold presence */}
        <span
          className="absolute -top-4 -right-2 font-black leading-none text-ajax-purple select-none pointer-events-none transition-opacity duration-300 text-[7.5rem] max-md:text-[6.5rem] opacity-[0.12] group-hover:opacity-[0.18]"
          aria-hidden="true"
        >
          {step.digit}
        </span>

        {/* Card content */}
        <div className="relative z-[1] p-8 max-md:p-6 flex flex-col min-h-[220px] max-md:min-h-[200px]">
          {/* Icon */}
          <div className="w-[52px] h-[52px] flex items-center justify-center bg-ajax-purple/[0.07] border border-ajax-purple/20 mb-5 transition-colors duration-300 group-hover:bg-ajax-purple/[0.12] group-hover:border-ajax-purple/30">
            <IconComp />
          </div>

          {/* Title */}
          <h3 className="text-xl max-md:text-lg font-extrabold text-ajax-black uppercase tracking-[-0.01em] mb-2">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-ajax-black/55 leading-[1.7] mt-auto">
            {step.description}
          </p>
        </div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="py-16 max-md:py-10 bg-ajax-surface" id="como-funciona">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header — aligned with other sections */}
          <div className="text-center mb-10 max-md:mb-6">
            <SectionTag>Como funciona</SectionTag>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.02em] leading-[1.1] text-ajax-black uppercase">
              3 passos pra{' '}
              <span className="text-ajax-purple">comecar hoje</span>
            </h2>
            <div className="w-16 h-[3px] bg-ajax-purple mx-auto mt-3" aria-hidden="true" />
          </div>

          {isMobile ? (
            /* Mobile: scroll-stacking */
            <div ref={wrapperRef} className="relative">
              <div ref={gridRef} className="relative">
                {steps.map((step, idx) => renderCard(step, idx))}
              </div>
            </div>
          ) : (
            /* Desktop: 3-col grid with connectors */
            <div className="relative grid grid-cols-3 gap-7">
              {/* Dashed connector lines between cards */}
              <div className="absolute top-[60px] left-[calc(33.33%+14px)] right-[calc(33.33%+14px)] pointer-events-none z-0" aria-hidden="true">
                <div className="step-connector h-[2px] w-full opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #5E17EB 0, #5E17EB 6px, transparent 6px, transparent 12px)' }} />
              </div>
              {steps.map((step, idx) => renderCard(step, idx))}
            </div>
          )}

          {/* CTA */}
          <div className="flex justify-center mt-10 max-md:mt-8">
            <Button href="#pricing" variant="primary">
              Comecar de graca
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
