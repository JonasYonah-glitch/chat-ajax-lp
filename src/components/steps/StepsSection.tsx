import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
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

/* ═══════════════════════════════════════════════════
   ANIMATED SCENE ILLUSTRATIONS
   Each card has a mini animated scene that tells
   the story of that step visually.
   ═══════════════════════════════════════════════════ */

/* Step 1 — "Crie sua conta"
   Scene: A form/card appearing with a cursor clicking
   a "Criar" button, then a checkmark appears */
function SceneAccount() {
  return (
    <div className="scene-account relative w-full h-[120px] max-md:h-[100px] flex items-center justify-center">
      {/* Background grid dots */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(#5E17EB 1.5px, transparent 1.5px)',
        backgroundSize: '16px 16px',
      }} />

      {/* Floating form card */}
      <div className="scene1-card relative bg-white border-2 border-ajax-black/15 shadow-[3px_3px_0_#5E17EB] w-[160px] max-md:w-[140px] p-3">
        {/* Mini form fields */}
        <div className="h-[6px] w-[70%] bg-ajax-purple/15 mb-2" />
        <div className="h-[6px] w-full bg-ajax-black/8 mb-2" />
        <div className="h-[6px] w-[85%] bg-ajax-black/8 mb-3" />
        {/* "Criar" button */}
        <div className="scene1-btn h-[18px] w-[60px] bg-ajax-purple flex items-center justify-center">
          <span className="text-[7px] font-bold text-white uppercase tracking-wider">Criar</span>
        </div>
        {/* Checkmark that appears */}
        <div className="scene1-check absolute -top-2 -right-2 w-[22px] h-[22px] bg-ajax-black flex items-center justify-center opacity-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </div>
      </div>

      {/* Cursor */}
      <div className="scene1-cursor absolute opacity-0" style={{ left: '55%', top: '60%' }}>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="#131313">
          <path d="M0 0v16.4l4.2-4.2h3.3L0 0z" />
          <path d="M4.5 12.2l2.8 5.8 2.2-1-2.8-5.8h-2.2z" />
        </svg>
      </div>
    </div>
  )
}

/* Step 2 — "Conecte seus canais"
   Scene: App icons (WA, IG, etc) flying in and connecting
   to a central hub with animated connection lines */
function SceneConnect() {
  return (
    <div className="scene-connect relative w-full h-[120px] max-md:h-[100px] flex items-center justify-center overflow-hidden">
      {/* Background grid dots */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(#5E17EB 1.5px, transparent 1.5px)',
        backgroundSize: '16px 16px',
      }} />

      {/* Central hub */}
      <div className="scene2-hub relative z-10 w-[40px] h-[40px] max-md:w-[34px] max-md:h-[34px] bg-ajax-purple flex items-center justify-center shadow-[2px_2px_0_#131313]">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2v14M2 9h14" stroke="white" strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* Connection lines (animated) */}
      <svg className="absolute inset-0 w-full h-full z-[5] pointer-events-none">
        <line className="scene2-line" x1="50%" y1="50%" x2="18%" y2="20%" stroke="#5E17EB" strokeWidth="1.5" strokeDasharray="4 3" opacity="0" />
        <line className="scene2-line" x1="50%" y1="50%" x2="82%" y2="20%" stroke="#5E17EB" strokeWidth="1.5" strokeDasharray="4 3" opacity="0" />
        <line className="scene2-line" x1="50%" y1="50%" x2="15%" y2="78%" stroke="#5E17EB" strokeWidth="1.5" strokeDasharray="4 3" opacity="0" />
        <line className="scene2-line" x1="50%" y1="50%" x2="85%" y2="78%" stroke="#5E17EB" strokeWidth="1.5" strokeDasharray="4 3" opacity="0" />
      </svg>

      {/* Channel icons floating around */}
      {/* WhatsApp */}
      <div className="scene2-node absolute opacity-0" style={{ left: '12%', top: '10%' }}>
        <div className="w-[32px] h-[32px] max-md:w-[28px] max-md:h-[28px] bg-[#25D366] flex items-center justify-center shadow-[2px_2px_0_#131313]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
        </div>
      </div>
      {/* Instagram */}
      <div className="scene2-node absolute opacity-0" style={{ right: '12%', top: '10%' }}>
        <div className="w-[32px] h-[32px] max-md:w-[28px] max-md:h-[28px] bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] flex items-center justify-center shadow-[2px_2px_0_#131313]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="18" cy="6" r="1.5" fill="white"/>
          </svg>
        </div>
      </div>
      {/* Email */}
      <div className="scene2-node absolute opacity-0" style={{ left: '9%', bottom: '10%' }}>
        <div className="w-[32px] h-[32px] max-md:w-[28px] max-md:h-[28px] bg-ajax-black flex items-center justify-center shadow-[2px_2px_0_#5E17EB]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="0" stroke="white" strokeWidth="2"/>
            <path d="M3 5l9 7 9-7" stroke="white" strokeWidth="2" strokeLinejoin="miter"/>
          </svg>
        </div>
      </div>
      {/* Telegram */}
      <div className="scene2-node absolute opacity-0" style={{ right: '9%', bottom: '10%' }}>
        <div className="w-[32px] h-[32px] max-md:w-[28px] max-md:h-[28px] bg-[#229ED9] flex items-center justify-center shadow-[2px_2px_0_#131313]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

/* Step 3 — "Veja os resultados"
   Scene: A mini dashboard with bars growing up,
   a percentage counter, and an upward arrow */
function SceneResults() {
  return (
    <div className="scene-results relative w-full h-[120px] max-md:h-[100px] flex items-center justify-center">
      {/* Background grid dots */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(#5E17EB 1.5px, transparent 1.5px)',
        backgroundSize: '16px 16px',
      }} />

      <div className="relative flex items-end gap-5 max-md:gap-4">
        {/* Mini bar chart */}
        <div className="flex items-end gap-[6px] h-[80px] max-md:h-[65px]">
          <div className="scene3-bar w-[14px] max-md:w-[12px] bg-ajax-purple/25 origin-bottom" style={{ height: '35%' }} />
          <div className="scene3-bar w-[14px] max-md:w-[12px] bg-ajax-purple/45 origin-bottom" style={{ height: '55%' }} />
          <div className="scene3-bar w-[14px] max-md:w-[12px] bg-ajax-purple/65 origin-bottom" style={{ height: '70%' }} />
          <div className="scene3-bar w-[14px] max-md:w-[12px] bg-ajax-purple origin-bottom shadow-[2px_0_0_#131313]" style={{ height: '95%' }} />
        </div>

        {/* Stats card */}
        <div className="scene3-stats bg-white border-2 border-ajax-black/15 shadow-[3px_3px_0_#5E17EB] p-3 max-md:p-2.5 opacity-0">
          {/* Percentage */}
          <div className="flex items-baseline gap-1 mb-1">
            <span className="scene3-counter text-[1.6rem] max-md:text-[1.3rem] font-black text-ajax-purple leading-none">0</span>
            <span className="text-[0.7rem] font-bold text-ajax-purple">%</span>
          </div>
          <div className="text-[7px] max-md:text-[6px] font-bold text-ajax-black/50 uppercase tracking-wider">Mais vendas</div>
          {/* Arrow up */}
          <div className="scene3-arrow flex items-center gap-1 mt-1.5 opacity-0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 8V2M2 4l3-3 3 3" stroke="#5E17EB" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
            <span className="text-[7px] font-bold text-ajax-purple">+40%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const sceneComponents = [SceneAccount, SceneConnect, SceneResults]

const SCROLL_DISTANCE_MOBILE = 180

export function StepsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  /* ── Scene animations (triggered on scroll) ── */
  useLayoutEffect(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {

      /* Scene 1 — Account creation */
      const scene1 = sectionRef.current!.querySelector('.scene-account')
      if (scene1) {
        const tl1 = gsap.timeline({
          scrollTrigger: { trigger: scene1, start: 'top 85%', once: true },
        })
        // Card slides in
        tl1.fromTo(scene1.querySelector('.scene1-card'),
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
        )
        // Cursor appears and moves to button
        tl1.fromTo(scene1.querySelector('.scene1-cursor'),
          { opacity: 0, x: 20, y: -10 },
          { opacity: 1, x: 0, y: 0, duration: 0.4, ease: 'power2.out' },
          0.4,
        )
        // Button "click" effect
        tl1.to(scene1.querySelector('.scene1-btn'),
          { scale: 0.9, duration: 0.1 }, 0.9,
        )
        tl1.to(scene1.querySelector('.scene1-btn'),
          { scale: 1, duration: 0.15, ease: 'back.out(2)' }, 1.0,
        )
        // Checkmark appears
        tl1.to(scene1.querySelector('.scene1-check'),
          { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 1.1,
        )
        // Cursor fades
        tl1.to(scene1.querySelector('.scene1-cursor'),
          { opacity: 0, duration: 0.3 }, 1.3,
        )
      }

      /* Scene 2 — Connect channels */
      const scene2 = sectionRef.current!.querySelector('.scene-connect')
      if (scene2) {
        const tl2 = gsap.timeline({
          scrollTrigger: { trigger: scene2, start: 'top 85%', once: true },
        })
        // Hub appears
        tl2.fromTo(scene2.querySelector('.scene2-hub'),
          { scale: 0, rotation: -90 },
          { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' },
        )
        // Nodes fly in from outside
        const nodes = scene2.querySelectorAll('.scene2-node')
        nodes.forEach((node, i) => {
          tl2.fromTo(node,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)' },
            0.3 + i * 0.12,
          )
        })
        // Connection lines appear
        const lines = scene2.querySelectorAll('.scene2-line')
        lines.forEach((line, i) => {
          tl2.to(line,
            { opacity: 0.6, duration: 0.3 },
            0.5 + i * 0.1,
          )
        })
        // Continuous float on nodes
        tl2.call(() => {
          nodes.forEach((node, i) => {
            gsap.to(node, {
              y: -4 + i * 1.5,
              duration: 1.8 + i * 0.3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.2,
            })
          })
        })
      }

      /* Scene 3 — Results dashboard */
      const scene3 = sectionRef.current!.querySelector('.scene-results')
      if (scene3) {
        const tl3 = gsap.timeline({
          scrollTrigger: { trigger: scene3, start: 'top 85%', once: true },
        })
        // Bars grow from bottom
        const bars = scene3.querySelectorAll('.scene3-bar')
        bars.forEach((bar, i) => {
          tl3.fromTo(bar,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.5, ease: 'power2.out' },
            i * 0.12,
          )
        })
        // Stats card slides in
        tl3.to(scene3.querySelector('.scene3-stats'),
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, 0.3,
        )
        // Counter animates from 0 to 40
        const counterEl = scene3.querySelector('.scene3-counter')
        if (counterEl) {
          tl3.fromTo(counterEl,
            { textContent: '0' },
            {
              textContent: '40',
              duration: 1.2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              onUpdate: function () {
                counterEl.textContent = Math.round(parseFloat(counterEl.textContent || '0')).toString()
              },
            },
            0.5,
          )
        }
        // Arrow + label appears
        tl3.to(scene3.querySelector('.scene3-arrow'),
          { opacity: 1, duration: 0.3, ease: 'power2.out' }, 1.4,
        )
      }

    })

    return () => ctx.revert()
  }, [])

  /* ── Desktop: stagger entrance ── */
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

  /* ── Mobile: scroll-stacking ── */
  useLayoutEffect(() => {
    if (!isMobile || !wrapperRef.current || !gridRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = gridRef.current.querySelectorAll<HTMLElement>('.step-card')
    if (cards.length === 0) return

    const cardH = cards[0].offsetHeight || 340

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

  /* ── Render card ── */
  const renderCard = (step: typeof steps[0], idx: number) => {
    const SceneComp = sceneComponents[idx]
    return (
      <div
        key={step.digit}
        className="step-card group bg-white border-2 border-ajax-black/10 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_#5E17EB] hover:border-ajax-purple"
      >
        {/* Large digit — top right corner */}
        <span
          className="absolute -top-3 -right-1 font-black leading-none text-ajax-purple select-none pointer-events-none transition-opacity duration-300 text-[8rem] max-md:text-[7rem] opacity-[0.10] group-hover:opacity-[0.18]"
          style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
          aria-hidden="true"
        >
          {step.digit}
        </span>

        {/* Corner triangle accent */}
        <div
          className="absolute top-0 right-0 w-0 h-0 z-[2] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            borderStyle: 'solid',
            borderWidth: '0 28px 28px 0',
            borderColor: 'transparent #5E17EB transparent transparent',
          }}
          aria-hidden="true"
        />

        {/* Purple left accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-ajax-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Animated scene illustration */}
        <div className="relative z-[1] bg-ajax-surface/60 border-b-2 border-ajax-black/5">
          <SceneComp />
        </div>

        {/* Text content */}
        <div className="relative z-[1] p-6 max-md:p-5">
          <h3 className="text-lg max-md:text-base font-extrabold text-ajax-black uppercase tracking-[-0.01em] mb-2">
            {step.title}
          </h3>
          <p className="text-sm max-md:text-[13px] text-ajax-black/55 leading-[1.7]">
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
          {/* Header */}
          <div className="text-center mb-10 max-md:mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.02em] leading-[1.1] text-ajax-black uppercase">
              3 passos pra{' '}
              <span className="text-ajax-purple">comecar hoje</span>
            </h2>
            <div className="w-16 h-[3px] bg-ajax-purple mx-auto mt-3" aria-hidden="true" />
          </div>

          {isMobile ? (
            <div ref={wrapperRef} className="relative">
              <div ref={gridRef} className="relative">
                {steps.map((step, idx) => renderCard(step, idx))}
              </div>
            </div>
          ) : (
            <div className="relative grid grid-cols-3 gap-7">
              {/* Dashed connector between cards */}
              <div className="absolute top-[60px] left-[calc(33.33%+14px)] right-[calc(33.33%+14px)] pointer-events-none z-0" aria-hidden="true">
                <div className="step-connector h-[2px] w-full opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #5E17EB 0, #5E17EB 6px, transparent 6px, transparent 12px)' }} />
              </div>
              {steps.map((step, idx) => renderCard(step, idx))}
            </div>
          )}

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
