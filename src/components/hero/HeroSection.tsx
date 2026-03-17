import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { ArrowIcon } from '../../icons'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollTargetRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      const items = sectionRef.current!.querySelectorAll('.hero-reveal')
      tl.fromTo(items,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.3,
      )

      const shapes = sectionRef.current!.querySelectorAll('.hero-shape')
      tl.fromTo(shapes,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', stagger: 0.15 },
        0.2,
      )

      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: -10 + i * 3,
          duration: 3 + i * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="top"
        className="relative min-h-screen overflow-hidden bg-ajax-white flex items-center"
      >
        {/* Background geometric shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="hero-shape absolute -top-20 -right-20 w-[500px] h-[500px] bg-ajax-purple/6"
            style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
          />
          <div
            className="hero-shape absolute -bottom-12 -left-12 w-[350px] h-[350px] bg-ajax-purple/4"
            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
          />
          <div
            className="hero-shape absolute top-1/3 right-[8%] w-[140px] h-[140px] bg-ajax-purple/8"
            style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}
          />
          <div
            className="hero-shape absolute top-[15%] left-[5%] w-[80px] h-[80px] bg-ajax-purple/6"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-ajax-purple" />
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#131313" strokeWidth="0.4" opacity="0.04" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-32 max-md:py-24 text-center">

            <h1 className="hero-reveal text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.08] tracking-tight text-ajax-black uppercase mb-5">
              Venda mais pelo WhatsApp{' '}
              <span className="text-ajax-purple">no automatico</span>
            </h1>

            <div className="hero-reveal w-16 h-[3px] bg-ajax-purple mx-auto mb-6" aria-hidden="true" />

            <p className="hero-reveal text-lg max-md:text-base text-ajax-black/60 leading-relaxed mb-10 max-w-2xl mx-auto">
              FlowBuilder visual, catalogo de produtos no chat, automacao com IA e todos os canais numa so tela.{' '}
              <strong className="text-ajax-black font-bold">Venda mais sem contratar mais gente.</strong>
            </p>

            <div className="hero-reveal flex gap-4 justify-center flex-wrap mb-6">
              <a

                href="#start"
                className="inline-flex items-center gap-2 bg-ajax-purple text-white text-sm font-black uppercase tracking-[0.12em] px-8 py-4 transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: '4px 4px 0 #131313' }}
              >
                Comecar gratis — 14 dias <ArrowIcon size={14} />
              </a>
              <a
                href="#recursos"
                className="inline-flex items-center gap-2 border-2 border-ajax-black/20 text-ajax-black text-sm font-black uppercase tracking-[0.12em] px-8 py-4 transition-all duration-200 hover:border-ajax-purple hover:text-ajax-purple"
              >
                Ver como funciona
              </a>
            </div>

            <p className="hero-reveal text-[0.7rem] text-ajax-black/30 uppercase tracking-[0.12em] font-bold">
              Sem cartao &bull; 14 dias gratis &bull; Comeca em 5 minutos
            </p>

          </div>
        </div>

        {/* Scroll arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={() => scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Rolar para baixo"
            className="w-11 h-11 border border-ajax-black/20 flex items-center justify-center text-ajax-black/60 transition-colors duration-200 hover:bg-ajax-purple hover:border-ajax-purple hover:text-white animate-[float_2s_ease-in-out_infinite]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M2 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg>
          </button>
        </div>
      </section>

      <div ref={scrollTargetRef} id="canais" aria-hidden="true" />
    </>
  )
}
