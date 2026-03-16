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

const SCROLL_PER_FEATURE = 500

export function FeaturesStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 1024px)')

  // Desktop: scroll-stacking crossfade between features
  useLayoutEffect(() => {
    if (isMobile || !sectionRef.current || !wrapperRef.current || !contentRef.current) return

    const cards = contentRef.current.querySelectorAll<HTMLElement>('.feature-slide')
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      const total = cards.length
      const wrapperHeight = (total - 1) * SCROLL_PER_FEATURE + window.innerHeight + 200

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

  // Mobile: simple stagger entrance
  useLayoutEffect(() => {
    if (!isMobile || !sectionRef.current) return
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.feature-slide')
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          { scrollTrigger: { trigger: card, start: 'top 90%', once: true }, y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: i * 0.05 },
        )
      })
    })
    return () => ctx.revert()
  }, [isMobile])

  if (isMobile) {
    return (
      <section ref={sectionRef} className="bg-white" id="recursos">
        <Container>
          <div className="flex flex-col gap-16 py-14">
            {features.map((f, i) => (
              <FeatureCard key={i} feature={f} />
            ))}
          </div>
        </Container>
      </section>
    )
  }

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Text */}
      <div>
        <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] text-ajax-purple mb-4">
          {feature.tag}
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-ajax-black leading-tight mb-4">
          {feature.headline}
        </h2>
        <p className="text-base text-ajax-black/60 leading-relaxed mb-6">
          {feature.description}
        </p>
        <ul className="flex flex-col gap-3">
          {feature.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-ajax-black/70">
              <span className="w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center bg-ajax-purple/10 text-ajax-purple">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg>
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Video 9:16 — lazy-loaded via IntersectionObserver, no controls, no interaction */}
      <div className="flex justify-center" ref={containerRef}>
        <div
          className="relative overflow-hidden bg-ajax-black w-full max-w-[280px]"
          style={{ aspectRatio: '9/16', borderRadius: 0 }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover pointer-events-none"
            style={{ borderRadius: 0 }}
          />
          {/* Subtle border overlay */}
          <div className="absolute inset-0 border-2 border-ajax-black/10 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
