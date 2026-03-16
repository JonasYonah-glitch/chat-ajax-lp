import { useState, useRef, useLayoutEffect } from 'react'
import { faqItems } from '../../data/faq'
import { Container } from '../ui/Container'
import { SectionTag } from '../ui/SectionTag'
import { SectionTitle } from '../ui/SectionTitle'
import { gsap } from '../../lib/gsap'
import { SolarIcon } from '../../icons'
import { GeometricAccents } from '../backgrounds/GeometricAccents'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  // Stagger reveal on scroll
  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll('.faq-item')
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -20, opacity: 0 },
          {
            scrollTrigger: {
              trigger: item,
              start: 'top 92%',
              once: true,
            },
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            delay: i * 0.06,
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 max-md:py-10 bg-[#F0F0F0]" id="faq">
      <GeometricAccents variant="mixed" />
      <Container>
        <div className="text-center mb-12">
          <SectionTag>FAQ</SectionTag>
          <SectionTitle
            title={
              <>
                Perguntas <span className="text-[#5E17EB]">frequentes</span>
              </>
            }
            subtitle="Tire suas duvidas sobre o Chat Ajax."
          />
        </div>

        <div className="max-w-[780px] mx-auto">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div
                key={index}
                className={`faq-item border-b-2 border-[#131313] transition-all duration-200 ${
                  isOpen
                    ? 'border-l-[3px] border-l-[#5E17EB] pl-4'
                    : 'border-l-[3px] border-l-transparent pl-4'
                }`}
              >
                <button
                  id={buttonId}
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between gap-4 py-5 pr-1 text-left bg-transparent border-none cursor-pointer group"
                >
                  <span
                    className={`text-sm font-bold uppercase tracking-[0.05em] leading-[1.5] transition-colors duration-200 ${
                      isOpen
                        ? 'text-[#5E17EB]'
                        : 'text-[#131313] group-hover:text-[#5E17EB]'
                    }`}
                  >
                    {item.question}
                  </span>

                  {/* Plus/minus icon — hard-edge square */}
                  <span
                    className="shrink-0 w-[28px] h-[28px] border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      borderRadius: 0,
                      borderColor: isOpen ? '#5E17EB' : '#131313',
                      background: isOpen ? '#5E17EB' : 'transparent',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    <SolarIcon
                      icon={isOpen ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'}
                      size={14}
                      fill={isOpen ? '#fff' : '#131313'}
                    />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease, opacity 0.3s ease',
                  }}
                >
                  <div className="pb-5 pr-12">
                    <p className="text-sm text-[#131313]/70 leading-[1.75]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
