import { useState, useRef, useLayoutEffect, useCallback } from 'react'
import { gsap } from '../../lib/gsap'
import { pricingPlans } from '../../data/pricing'
import { Container } from '../ui/Container'
import { SectionTag } from '../ui/SectionTag'
import { SectionTitle } from '../ui/SectionTitle'
import { CheckIcon, ArrowIcon } from '../../icons'
import { useCheckout } from '../../hooks/useCheckout'
import { GeometricAccents } from '../backgrounds/GeometricAccents'

const WHATSAPP_NUMBER = '5500000000000' // TODO: trocar pelo numero real da empresa

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const { openCheckout } = useCheckout()
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!cardsContainerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current!.querySelectorAll('.pricing-card')
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
        },
      )
    }, cardsContainerRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, card: HTMLElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(card, { rotateY: x * 6, rotateX: -y * 6, duration: 0.3, ease: 'power2.out' })
  }, [])

  const handleMouseLeave = useCallback((card: HTMLElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
  }, [])

  return (
    <section className="relative py-20 max-md:py-10 bg-[#F0F0F0]" id="precos">
      <GeometricAccents variant="triangles" />
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <SectionTag>Planos &amp; Precos</SectionTag>
          <SectionTitle
            title={
              <>
                Escolha o <span className="text-[#5E17EB]">plano certo</span> pra voce
              </>
            }
            subtitle="14 dias gratis em todos os planos. Cancela quando quiser."
          />

          {/* Toggle — hard-edge */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span
              className={`text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-200 ${
                !isYearly ? 'text-[#131313]' : 'text-[#131313]/40'
              }`}
            >
              Por mes
            </span>

            {/* Hard-edge toggle switch */}
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-[56px] h-[30px] border-2 border-[#131313] cursor-pointer transition-colors duration-300 p-0 bg-transparent"
              style={{ borderRadius: 0 }}
              role="switch"
              aria-checked={isYearly}
              aria-label="Alternar entre plano mensal e anual"
            >
              {/* Track fill */}
              <span
                className="absolute inset-0 transition-colors duration-300"
                style={{ background: isYearly ? '#5E17EB' : 'transparent' }}
              />
              {/* Thumb */}
              <span
                className="absolute top-[2px] bottom-[2px] w-[22px] bg-[#131313] transition-all duration-300 z-10"
                style={{
                  borderRadius: 0,
                  left: isYearly ? 'calc(100% - 24px)' : '2px',
                }}
              />
            </button>

            <span
              className={`text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-200 ${
                isYearly ? 'text-[#131313]' : 'text-[#131313]/40'
              }`}
            >
              Por ano
            </span>

            {isYearly && (
              <span
                className="bg-[#5E17EB] text-white text-[0.7rem] font-bold px-3 py-1 uppercase tracking-[0.15em]"
                style={{ borderRadius: 0 }}
              >
                Ganha 2 meses gratis
              </span>
            )}
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-3 gap-6 items-start max-lg:grid-cols-1 max-lg:max-w-[480px] max-lg:mx-auto max-w-5xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {pricingPlans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
            const note = isYearly ? plan.yearlyTotal : plan.monthlyInstallment

            return (
              <div
                key={plan.id}
                className={`pricing-card relative flex flex-col transition-transform duration-200 ${
                  plan.featured ? 'max-lg:order-first' : ''
                } ${
                  plan.featured
                    ? 'border-2 border-[#5E17EB] shadow-[8px_8px_0_#5E17EB] hover:-translate-x-[2px] hover:-translate-y-[2px]'
                    : 'border-2 border-[#131313] shadow-[4px_4px_0_#131313] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#5E17EB] hover:border-[#5E17EB]'
                } bg-white`}
                style={{ borderRadius: 0 }}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                {/* Featured corner triangle */}
                {plan.featured && (
                  <div
                    className="absolute top-0 right-0 w-[60px] h-[60px] bg-[#5E17EB] z-10 flex items-start justify-end p-2"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                    aria-label="Mais Escolhido"
                  >
                    <span className="text-white text-[8px] font-bold rotate-45 translate-x-1 -translate-y-1 tracking-[0.05em] uppercase">
                      ★
                    </span>
                  </div>
                )}

                {/* Featured label above */}
                {plan.featured && (
                  <div className="bg-[#5E17EB] text-white text-[0.7rem] font-bold uppercase tracking-[0.15em] text-center py-1.5 px-4">
                    Mais Escolhido
                  </div>
                )}

                <div className="p-8 max-md:p-6 flex flex-col flex-1">
                  {/* Plan name */}
                  <h3 className="text-lg font-extrabold uppercase tracking-[0.1em] text-[#131313] mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-1">
                    <span className="text-5xl font-extrabold text-[#131313] leading-none">
                      {price}
                    </span>
                    {price.startsWith('R$') && !price.includes('partir') && (
                      <span className="text-sm text-[#131313]/50 font-medium ml-1">
                        /mes
                      </span>
                    )}
                  </div>

                  {/* Installment / yearly note */}
                  <p className="text-xs text-[#131313]/50 mb-5 min-h-[1rem]">
                    {note || 'Sob consulta'}
                  </p>

                  {/* Hard divider */}
                  <div className="w-full h-[2px] bg-[#131313] mb-5" />

                  {/* Features */}
                  <ul className="list-none flex flex-col gap-3 flex-1 mb-7">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2.5 text-sm ${
                          feature.highlight
                            ? 'text-[#5E17EB] font-bold'
                            : 'text-[#131313]/70'
                        }`}
                      >
                        <CheckIcon
                          size={15}
                          className={`shrink-0 mt-0.5 ${
                            feature.highlight ? 'text-[#5E17EB]' : 'text-[#5E17EB]'
                          }`}
                        />
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <button
                    onClick={() => {
                      if (plan.id === 'enterprise') {
                        window.open(
                          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            'Ola! Tenho interesse no plano Enterprise do Chat Ajax.',
                          )}`,
                          '_blank',
                        )
                      } else {
                        openCheckout({
                          id: plan.id,
                          name: plan.name,
                          price,
                          numericValue: isYearly ? plan.yearlyValue : plan.monthlyValue,
                          cycle: isYearly ? 'YEARLY' : 'MONTHLY',
                        })
                      }
                    }}
                    className={[
                      'w-full flex items-center justify-center gap-2',
                      'py-3 px-7 text-sm font-bold uppercase tracking-[0.1em]',
                      'cursor-pointer border-none',
                      'transition-all duration-200',
                      'min-h-[44px]',
                      plan.featured
                        ? 'bg-[#5E17EB] text-white shadow-[4px_4px_0_#131313] hover:shadow-[6px_6px_0_#131313] hover:-translate-x-[1px] hover:-translate-y-[1px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]'
                        : 'bg-transparent text-[#131313] border-2 border-[#131313] hover:border-[#5E17EB] hover:text-[#5E17EB] hover:shadow-[4px_4px_0_#5E17EB]',
                    ].join(' ')}
                    style={{ borderRadius: 0 }}
                  >
                    {plan.cta} <ArrowIcon size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
