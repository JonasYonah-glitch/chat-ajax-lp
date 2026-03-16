import { useRef, useLayoutEffect, useEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'
import { useMediaQuery } from '../../hooks/useMediaQuery'

/* ── Features data — reflects real product: FlowBuilder, catalogo, automacao, follow-up, IA ── */
const features = [
  {
    tag: 'FLOWBUILDER',
    headline: 'Monte fluxos de atendimento sem programar',
    description: 'O FlowBuilder do Chat Ajax e visual — voce arrasta e monta o fluxo do jeito que quiser. Atendimento, vendas, suporte — tudo automatizado do seu jeito.',
    bullets: [
      'Arrastar e soltar, sem codigo',
      'Fluxos de venda, suporte e captacao',
      'Follow-up automatico com o cliente',
    ],
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    tag: 'CATALOGO DE PRODUTOS',
    headline: 'Seu catalogo completo dentro do WhatsApp',
    description: 'O cliente ve seus produtos, escolhe o que quer e compra — tudo sem sair do WhatsApp. Com foto, preco e link de pagamento.',
    bullets: [
      'Catalogo com foto e preco no chat',
      'Carrinho de compras pelo WhatsApp',
      'Link de pagamento direto na conversa',
    ],
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    tag: 'TUDO EM UMA TELA',
    headline: 'WhatsApp, Instagram e mais em um so lugar',
    description: 'Todas as mensagens chegam na mesma tela. Seu time responde rapido, nao perde mensagem e ve o historico completo de cada cliente.',
    bullets: [
      'Todos os canais numa caixa so',
      'Distribui pro atendente certo sozinho',
      'Historico completo de cada cliente',
    ],
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    tag: 'AUTOMACAO INTELIGENTE',
    headline: 'Responde, qualifica e vende no automatico',
    description: 'A automacao do Chat Ajax combina IA com fluxos inteligentes. Responde duvidas, coleta dados do cliente e faz follow-up — tudo sozinha.',
    bullets: [
      'IA que entende e responde 24 horas',
      'Follow-up automatico ate fechar a venda',
      'Passa pro humano quando precisa',
    ],
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    tag: 'MAIS VENDAS',
    headline: 'Transforma conversa em dinheiro no caixa',
    description: 'Curtiu o post? Recebe oferta na DM. Abandonou o carrinho? Lembrete no WhatsApp. O Chat Ajax acompanha cada cliente ate ele comprar.',
    bullets: [
      'Recupera carrinho abandonado automatico',
      'Envia cupom e oferta personalizada',
      'Acompanha o cliente apos a compra',
    ],
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
]

const SCROLL_PER_FEATURE_DESKTOP = 500
const SCROLL_PER_FEATURE_MOBILE = 350

export function FeaturesStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 1024px)')

  // Scroll-stacking crossfade between features (desktop + mobile)
  useLayoutEffect(() => {
    if (!sectionRef.current || !wrapperRef.current || !contentRef.current) return

    const cards = contentRef.current.querySelectorAll<HTMLElement>('.feature-slide')
    if (cards.length === 0) return

    const scrollPer = isMobile ? SCROLL_PER_FEATURE_MOBILE : SCROLL_PER_FEATURE_DESKTOP

    const ctx = gsap.context(() => {
      const total = cards.length
      const wrapperHeight = (total - 1) * scrollPer + window.innerHeight + 200

      gsap.set(wrapperRef.current, { height: wrapperHeight })

      // Hide all except first
      cards.forEach((card, i) => {
        if (i > 0) gsap.set(card, { opacity: 0, y: 30 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: false,
        },
      })

      tl.to({}, { duration: 0.3 })

      for (let i = 0; i < total - 1; i++) {
        tl.to(cards[i], { opacity: 0, y: -20, duration: 0.5, ease: 'power1.inOut' }, `f-${i}`)
        tl.to(cards[i + 1], { opacity: 1, y: 0, duration: 0.5, ease: 'power1.inOut' }, `f-${i}`)
        if (i < total - 2) tl.to({}, { duration: 0.25 })
      }

      tl.to({}, { duration: 0.3 })
    })

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section ref={sectionRef} className="bg-white relative" id="recursos">
      <div ref={wrapperRef} className="relative">
        <div className="sticky top-0 min-h-screen flex items-center">
          <Container>
            <div ref={contentRef} className="relative max-w-5xl mx-auto">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`feature-slide ${i > 0 ? 'absolute inset-0' : ''}`}
                >
                  <FeatureCard feature={f} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}

/* ── Single feature card: text left + video right ── */
function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.src = feature.video
          videoRef.current.load()
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [feature.video])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
      {/* Text */}
      <div>
        <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] text-ajax-purple mb-3">
          {feature.tag}
        </span>
        <h2 className="text-[1.4rem] sm:text-[1.65rem] lg:text-4xl font-extrabold text-ajax-black leading-[1.15] mb-3 tracking-[-0.02em]">
          {feature.headline}
        </h2>
        <p className="text-[13px] sm:text-sm text-ajax-black/60 leading-relaxed mb-4">
          {feature.description}
        </p>
        <ul className="flex flex-col gap-2">
          {feature.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-ajax-black/70">
              <span className="w-[18px] h-[18px] mt-0.5 shrink-0 flex items-center justify-center bg-ajax-purple/10 text-ajax-purple">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg>
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Video 9:16 — below text on mobile, right on desktop */}
      <div className="flex justify-center" ref={containerRef}>
        <div
          className="relative overflow-hidden bg-ajax-black w-full max-w-[280px] max-md:max-w-[240px] border-2 border-ajax-black/10 shadow-[4px_4px_0_#5E17EB]"
          style={{ aspectRatio: '9/16' }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
      </div>
    </div>
  )
}
