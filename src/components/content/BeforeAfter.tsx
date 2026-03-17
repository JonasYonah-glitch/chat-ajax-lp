import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const items = [
  {
    before: 'Voce abre 8 abas so pra responder cliente',
    after: 'Uma tela. Todos os canais. Zero estresse.',
  },
  {
    before: 'Suas mensagens somem entre WhatsApp e Instagram',
    after: 'Nenhuma mensagem se perde. Nunca mais.',
  },
  {
    before: 'Cliente pergunta e voce nem lembra o que ele pediu',
    after: 'Historico completo na sua frente, instantaneo.',
  },
  {
    before: 'Voce demora 2 a 4 HORAS pra responder',
    after: 'Resposta em menos de 1 minuto. Automatico.',
  },
  {
    before: 'Seu time repete as mesmas respostas o dia todo',
    after: 'Automacao resolve. Seu time foca no que importa.',
  },
  {
    before: 'Voce nao faz ideia de como ta seu atendimento',
    after: 'Dashboard em tempo real. Tudo nos numeros.',
  },
]

/* ── Ilustrações SVG inline por tema ── */

function IconTabs() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Browser tabs caóticas */}
      <rect x="4" y="16" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <rect x="8" y="12" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <rect x="12" y="8" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <rect x="16" y="4" width="28" height="20" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <text x="22" y="17" fontSize="7" fill="currentColor" fontWeight="bold" opacity="0.7">8+</text>
      {/* Notification dots */}
      <circle cx="60" cy="12" r="5" fill="#ef4444" opacity="0.8" />
      <text x="57.5" y="15" fontSize="7" fill="white" fontWeight="bold">!</text>
      <circle cx="68" cy="22" r="4" fill="#ef4444" opacity="0.5" />
      <circle cx="56" cy="28" r="3" fill="#ef4444" opacity="0.3" />
      {/* Stress lines */}
      <path d="M50 40 L58 36 M50 44 L60 44 M50 48 L58 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

function IconUnified() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Single clean screen */}
      <rect x="12" y="6" width="56" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="6" width="56" height="8" rx="3" fill="currentColor" opacity="0.08" />
      {/* Channel icons inside */}
      <circle cx="28" cy="30" r="6" fill="#25D366" opacity="0.2" stroke="#25D366" strokeWidth="1" />
      <circle cx="42" cy="30" r="6" fill="#E1306C" opacity="0.2" stroke="#E1306C" strokeWidth="1" />
      <circle cx="56" cy="30" r="6" fill="#0088cc" opacity="0.2" stroke="#0088cc" strokeWidth="1" />
      {/* Check */}
      <circle cx="58" cy="52" r="8" fill="#10b981" opacity="0.15" />
      <path d="M54 52 L57 55 L63 49" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Stand */}
      <path d="M36 46 L36 52 M44 46 L44 52 M30 52 L50 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

function IconLostMsg() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Chat bubbles scattered and fading */}
      <rect x="6" y="8" width="30" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <path d="M12 24 L16 30" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <rect x="6" y="8" width="30" height="16" rx="3" fill="currentColor" opacity="0.05" />
      <line x1="12" y1="14" x2="30" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="12" y1="19" x2="24" y2="19" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      {/* Second bubble - disappearing */}
      <rect x="38" y="22" width="28" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />
      <text x="44" y="32" fontSize="8" fill="currentColor" opacity="0.25">???</text>
      {/* Arrow showing loss */}
      <path d="M52 40 L52 50 L58 46" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M24 40 L18 50" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" strokeDasharray="2 3" />
    </svg>
  )
}

function IconSafe() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Shield with messages inside */}
      <path d="M40 6 L62 16 L62 38 C62 52 40 62 40 62 C40 62 18 52 18 38 L18 16 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.05" />
      {/* Chat lines inside shield */}
      <line x1="28" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="28" y1="30" x2="52" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      <line x1="28" y1="36" x2="42" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="28" y1="42" x2="48" y2="42" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      {/* Lock icon */}
      <rect x="35" y="48" width="10" height="8" rx="1.5" fill="#10b981" opacity="0.3" stroke="#10b981" strokeWidth="1" />
      <path d="M37 48 L37 44 C37 42 43 42 43 44 L43 48" stroke="#10b981" strokeWidth="1" fill="none" />
    </svg>
  )
}

function IconNoHistory() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Person silhouette with ? */}
      <circle cx="30" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M16 44 C16 34 44 34 44 44" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <text x="26" y="23" fontSize="12" fill="currentColor" opacity="0.5" fontWeight="bold">?</text>
      {/* Empty clipboard */}
      <rect x="50" y="10" width="22" height="30" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <rect x="56" y="6" width="10" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="55" y1="20" x2="67" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="55" y1="25" x2="67" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="55" y1="30" x2="62" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      {/* X over clipboard */}
      <path d="M52 14 L70 36 M70 14 L52 36" stroke="#ef4444" strokeWidth="1.5" opacity="0.3" />
    </svg>
  )
}

function IconHistory() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Person with full profile */}
      <circle cx="26" cy="16" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.6" fill="currentColor" fillOpacity="0.05" />
      <path d="M14 40 C14 30 38 30 38 40" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* Profile card with data */}
      <rect x="44" y="8" width="28" height="38" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.04" />
      <circle cx="58" cy="18" r="4" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="1" />
      <line x1="50" y1="27" x2="66" y2="27" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      <line x1="50" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      <line x1="50" y1="37" x2="66" y2="37" stroke="currentColor" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      {/* Connection line */}
      <path d="M38 24 L44 24" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" strokeDasharray="2 2" />
      {/* Timeline dots bottom */}
      <circle cx="20" cy="54" r="3" fill="#10b981" opacity="0.3" />
      <circle cx="34" cy="54" r="3" fill="#10b981" opacity="0.2" />
      <circle cx="48" cy="54" r="3" fill="#10b981" opacity="0.15" />
      <line x1="23" y1="54" x2="31" y2="54" stroke="#10b981" strokeWidth="1" opacity="0.2" />
      <line x1="37" y1="54" x2="45" y2="54" stroke="#10b981" strokeWidth="1" opacity="0.15" />
    </svg>
  )
}

function IconSlow() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Big clock */}
      <circle cx="36" cy="32" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="36" cy="32" r="22" fill="currentColor" opacity="0.03" />
      {/* Clock hands - showing long time */}
      <line x1="36" y1="32" x2="36" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="36" y1="32" x2="48" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <circle cx="36" cy="32" r="2" fill="currentColor" opacity="0.5" />
      {/* "4h" text */}
      <text x="54" y="20" fontSize="14" fill="#ef4444" fontWeight="900" opacity="0.6">4h</text>
      {/* Angry face indicators */}
      <circle cx="64" cy="46" r="10" stroke="#ef4444" strokeWidth="1.5" opacity="0.3" />
      <path d="M60 50 C62 48 66 48 68 50" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <circle cx="61" cy="44" r="1" fill="#ef4444" opacity="0.4" />
      <circle cx="67" cy="44" r="1" fill="#ef4444" opacity="0.4" />
    </svg>
  )
}

function IconFast() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Lightning bolt */}
      <path d="M38 4 L24 34 L36 34 L30 56 L56 22 L42 22 L48 4 Z" fill="#10b981" opacity="0.12" stroke="#10b981" strokeWidth="1.5" strokeLinejoin="round" />
      {/* "< 1m" */}
      <text x="16" y="72" fontSize="11" fill="#10b981" fontWeight="900" opacity="0.5">&lt;1min</text>
      {/* Speed lines */}
      <line x1="58" y1="14" x2="70" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <line x1="62" y1="20" x2="72" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
      <line x1="60" y1="26" x2="68" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.1" />
    </svg>
  )
}

function IconRepeat() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Stacked identical messages */}
      <rect x="8" y="8" width="40" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3" fill="currentColor" fillOpacity="0.03" />
      <line x1="14" y1="15" x2="38" y2="15" stroke="currentColor" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
      <rect x="8" y="26" width="40" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3" fill="currentColor" fillOpacity="0.03" />
      <line x1="14" y1="33" x2="38" y2="33" stroke="currentColor" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
      <rect x="8" y="44" width="40" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3" fill="currentColor" fillOpacity="0.03" />
      <line x1="14" y1="51" x2="38" y2="51" stroke="currentColor" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
      {/* = signs showing they're the same */}
      <text x="54" y="20" fontSize="16" fill="#ef4444" opacity="0.4" fontWeight="bold">=</text>
      <text x="54" y="38" fontSize="16" fill="#ef4444" opacity="0.4" fontWeight="bold">=</text>
      {/* Cycle arrows */}
      <path d="M58 50 C58 44 70 44 70 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M68 48 L70 50 L68 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
    </svg>
  )
}

function IconAutomate() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Robot/bot head */}
      <rect x="22" y="14" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.04" />
      <circle cx="34" cy="26" r="4" fill="#5E17EB" opacity="0.2" stroke="#5E17EB" strokeWidth="1" />
      <circle cx="46" cy="26" r="4" fill="#5E17EB" opacity="0.2" stroke="#5E17EB" strokeWidth="1" />
      <path d="M34 34 C36 37 44 37 46 34" stroke="#5E17EB" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Antenna */}
      <line x1="40" y1="14" x2="40" y2="6" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="40" cy="5" r="2" fill="#10b981" opacity="0.5" />
      {/* Outgoing messages */}
      <path d="M58 22 L70 18 L70 26 Z" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <path d="M58 32 L70 28 L70 36 Z" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="1" />
      {/* Person relaxing */}
      <circle cx="24" cy="56" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M18 70 C18 64 30 64 30 70" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <text x="40" y="62" fontSize="8" fill="#10b981" opacity="0.4" fontWeight="bold">FREE</text>
    </svg>
  )
}

function IconBlind() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Chart with no data */}
      <rect x="10" y="10" width="50" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {/* Empty chart grid */}
      <line x1="10" y1="22" x2="60" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <line x1="10" y1="34" x2="60" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <line x1="26" y1="10" x2="26" y2="46" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <line x1="44" y1="10" x2="44" y2="46" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      {/* Flat line - no growth */}
      <line x1="16" y1="30" x2="54" y2="30" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* Eye with slash */}
      <ellipse cx="62" cy="58" rx="12" ry="8" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="62" cy="58" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="52" y1="66" x2="72" y2="50" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

function IconDashboard() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Dashboard frame */}
      <rect x="6" y="6" width="68" height="46" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.03" />
      {/* Rising chart */}
      <polyline points="14,40 24,34 34,36 44,24 54,18 64,12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" fill="none" />
      {/* Area under chart */}
      <polygon points="14,40 24,34 34,36 44,24 54,18 64,12 64,44 14,44" fill="#10b981" opacity="0.06" />
      {/* Metric boxes */}
      <rect x="10" y="56" width="18" height="14" rx="1.5" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="1" />
      <text x="14" y="66" fontSize="7" fill="#10b981" opacity="0.5" fontWeight="bold">98%</text>
      <rect x="32" y="56" width="18" height="14" rx="1.5" fill="#5E17EB" opacity="0.1" stroke="#5E17EB" strokeWidth="1" />
      <text x="34" y="66" fontSize="7" fill="#5E17EB" opacity="0.5" fontWeight="bold">1.2k</text>
      <rect x="54" y="56" width="18" height="14" rx="1.5" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="1" />
      <text x="58" y="66" fontSize="7" fill="#10b981" opacity="0.5" fontWeight="bold">4.9</text>
    </svg>
  )
}

/* ── Map items to their illustrations ── */
const illustrations = {
  before: [IconTabs, IconLostMsg, IconNoHistory, IconSlow, IconRepeat, IconBlind],
  after: [IconUnified, IconSafe, IconHistory, IconFast, IconAutomate, IconDashboard],
}

const SCROLL_DESKTOP = 480
const SCROLL_MOBILE = 420

export function BeforeAfter() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const isMobile = useMediaQuery('(max-width: 1024px)')

  useLayoutEffect(() => {
    if (!wrapperRef.current || !stageRef.current) return

    const slides = stageRef.current.querySelectorAll<HTMLElement>('.ba-slide')
    if (slides.length === 0) return

    const scrollPer = isMobile ? SCROLL_MOBILE : SCROLL_DESKTOP
    const total = items.length

    const ctx = gsap.context(() => {
      gsap.set(wrapperRef.current, { height: total * scrollPer + window.innerHeight })

      // Hide all slides except first
      slides.forEach((s, i) => {
        if (i > 0) gsap.set(s, { opacity: 0, y: 30 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate: (self) => {
            if (!counterRef.current) return
            const idx = Math.min(total, Math.ceil(self.progress * (total + 0.3)))
            counterRef.current.textContent = String(Math.max(1, idx)).padStart(2, '0')
          },
        },
      })

      tl.to({}, { duration: 0.25 })

      for (let i = 0; i < total - 1; i++) {
        tl.to(slides[i], { opacity: 0, y: -25, duration: 0.5, ease: 'power2.inOut' }, `s-${i}`)
        tl.to(slides[i + 1], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.inOut' }, `s-${i}`)
        if (barRef.current) {
          tl.to(barRef.current, { scaleX: (i + 2) / total, duration: 0.5, ease: 'power2.inOut' }, `s-${i}`)
        }
        if (i < total - 2) tl.to({}, { duration: 0.2 })
      }

      tl.to({}, { duration: 0.3 })
    })

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section className="bg-ajax-white relative">
      <div ref={wrapperRef} className="relative">
        <div className="sticky top-0 min-h-screen max-md:min-h-0 max-md:pt-[72px] flex items-center max-md:items-start">
          <Container>
            <div className="w-full max-w-4xl mx-auto max-md:px-0">
              {/* Title */}
              <h2 className="text-center text-[1.65rem] sm:text-3xl lg:text-4xl font-extrabold text-ajax-black leading-[1.15] mb-3 uppercase tracking-[-0.02em] max-md:px-4">
                Antes e depois do<br className="md:hidden" />{' '}
                <span className="text-ajax-purple">Chat Ajax</span>
              </h2>
              <div className="w-12 h-[3px] bg-ajax-purple mx-auto mb-5 sm:mb-10" />

              {/* Slides */}
              <div ref={stageRef} className="relative">
                {items.map((item, i) => {
                  const BeforeIllust = illustrations.before[i]
                  const AfterIllust = illustrations.after[i]
                  return (
                    <div key={i} className={`ba-slide grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3 ${i > 0 ? 'absolute inset-0' : ''}`}>
                      {/* SEM */}
                      <div className="bg-white border-2 border-ajax-black/10 p-5 sm:p-7 shadow-[3px_3px_0_rgba(239,68,68,0.85)]">
                        <span className="block text-2xl sm:text-3xl font-extrabold tracking-[0.15em] text-red-500 uppercase mb-2">SEM</span>
                        <p className="text-[1.1rem] sm:text-xl lg:text-2xl font-extrabold text-ajax-black leading-[1.3] mb-4 sm:mb-5">
                          {item.before}
                        </p>
                        <div className="w-full h-[120px] sm:h-[140px] lg:h-[160px] text-red-400/60 flex items-center justify-center">
                          <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px]">
                            <BeforeIllust />
                          </div>
                        </div>
                      </div>

                      {/* COM */}
                      <div className="bg-white border-2 border-ajax-black/10 p-5 sm:p-7 shadow-[3px_3px_0_#5E17EB]">
                        <span className="block text-2xl sm:text-3xl font-extrabold tracking-[0.15em] text-ajax-purple uppercase mb-2">COM</span>
                        <p className="text-[1.1rem] sm:text-xl lg:text-2xl font-extrabold text-ajax-black leading-[1.3] mb-4 sm:mb-5">
                          {item.after}
                        </p>
                        <div className="w-full h-[120px] sm:h-[140px] lg:h-[160px] text-ajax-black/40 flex items-center justify-center">
                          <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px]">
                            <AfterIllust />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Progress bar + counter */}
              <div className="flex items-center gap-3 mt-4 sm:mt-6 max-md:px-4">
                <div className="flex-1 h-[3px] bg-ajax-black/8 overflow-hidden">
                  <div ref={barRef} className="h-full bg-ajax-purple origin-left" style={{ transform: 'scaleX(0.166)' }} />
                </div>
                <span ref={counterRef} className="text-[11px] font-extrabold text-ajax-black/25 tracking-wider tabular-nums">01</span>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
