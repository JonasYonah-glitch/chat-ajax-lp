import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'

export function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.cert-card')
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 24, opacity: 0 },
          {
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
            y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: i * 0.15,
          },
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 max-md:py-12 bg-ajax-white relative overflow-hidden">
      {/* Subtle bg accent */}
      <div className="absolute -top-10 -right-10 w-[250px] h-[250px] bg-ajax-purple/4 pointer-events-none" style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }} />

      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl lg:text-4xl font-extrabold text-ajax-black leading-tight mb-3">
            Certificados pelas <span className="text-ajax-purple">maiores do mundo</span>
          </h2>
          <div className="w-12 h-[3px] bg-ajax-purple mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">

            {/* Meta Business Partner */}
            <div className="cert-card flex flex-col items-center text-center p-8 bg-ajax-white border-2 border-ajax-black/10 transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#5E17EB] hover:border-ajax-purple/30">
              <img
                src="/Meta-facebook-New-Logo.png"
                alt="Meta Business Partner"
                className="h-14 mb-5 object-contain"
              />
              <h3 className="text-base font-extrabold text-ajax-black uppercase tracking-wide mb-1">Parceiro Oficial</h3>
              <p className="text-xs text-ajax-black/40">Meta Business Partner</p>
            </div>

            {/* Google Developer */}
            <div className="cert-card flex flex-col items-center text-center p-8 bg-ajax-white border-2 border-ajax-black/10 transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#5E17EB] hover:border-ajax-purple/30">
              <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="mb-5" aria-label="Google">
                <path d="M43.611 20.083H42V20H24V28H35.303C33.654 32.657 29.223 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24C4 35.045 12.955 44 24 44C35.045 44 44 35.045 44 24C44 22.659 43.862 21.35 43.611 20.083Z" fill="#FFC107" />
                <path d="M6.306 14.691L12.877 19.51C14.655 15.108 18.961 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691Z" fill="#FF3D00" />
                <path d="M24 44C29.166 44 33.86 42.023 37.409 38.808L31.219 33.57C29.211 35.091 26.71 36 24 36C18.798 36 14.381 32.683 12.717 28.054L6.195 33.079C9.505 39.556 16.227 44 24 44Z" fill="#4CAF50" />
                <path d="M43.611 20.083H42V20H24V28H35.303C34.511 30.237 33.072 32.166 31.216 33.571L31.219 33.569L37.409 38.807C36.971 39.205 44 34 44 24C44 22.659 43.862 21.35 43.611 20.083Z" fill="#1976D2" />
              </svg>
              <h3 className="text-base font-extrabold text-ajax-black uppercase tracking-wide mb-1">Desenvolvedor Certificado</h3>
              <p className="text-xs text-ajax-black/40">Google Developer</p>
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}
