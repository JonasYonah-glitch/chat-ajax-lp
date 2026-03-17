import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { CheckIcon, ArrowIcon } from '../../icons'
import { Button } from '../ui/Button'

interface FeatureRowProps {
  reverse?: boolean
  tag: string
  title: React.ReactNode
  description: React.ReactNode
  features: string[]
  ctaText: string
  ctaNote?: string
  visual: React.ReactNode
  altBg?: boolean
  bgClass?: string
}

export function FeatureRow({ reverse, tag, title, description, features, ctaText, ctaNote, visual, bgClass }: FeatureRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rowRef.current) return
    const ctx = gsap.context(() => {
      const visualEl = rowRef.current!.querySelector('.feat-visual')
      const textEls = rowRef.current!.querySelectorAll('.feat-text > *')

      if (visualEl) {
        gsap.fromTo(visualEl,
          { x: reverse ? -40 : 40, opacity: 0 },
          { scrollTrigger: { trigger: visualEl, start: 'top 90%', once: true }, x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
        )
      }
      textEls.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 20, opacity: 0 },
          { scrollTrigger: { trigger: el, start: 'top 95%', once: true }, y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: i * 0.05 }
        )
      })
    })
    return () => ctx.revert()
  }, [reverse])

  return (
    <section className={`${bgClass || ''} relative z-[2] overflow-hidden`}>
      <div className="max-w-page mx-auto px-6 py-20 max-md:py-10 relative">
        <div ref={rowRef} className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 max-md:gap-6 max-lg:grid-cols-1 max-lg:gap-10">
          {/* Text side */}
          <div className={`feat-text ${reverse ? 'max-md:order-1 md:order-2' : ''} relative`}>
            {/* Purple accent vertical line */}
            <div className={`absolute ${reverse ? '-right-4' : '-left-4'} top-0 bottom-0 w-[3px] bg-[#5E17EB] hidden lg:block`} />

            <div className="section-tag">{tag}</div>
            <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] font-[800] leading-[1.15] mb-4 text-ajax-black uppercase tracking-[.02em]">
              {title}
            </h3>
            <p className="text-ajax-black/70/70 text-base leading-[1.7] mb-5">{description}</p>
            <ul className="list-none flex flex-col gap-2.5">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-ajax-black/70/70 text-[.9rem]">
                  {/* Purple arrow checkmark */}
                  <span className="shrink-0 mt-0.5 w-[18px] h-[18px] bg-[#5E17EB] flex items-center justify-center">
                    <CheckIcon size={12} className="text-white" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col items-start gap-2">
              <Button href="#start" variant="primary" size="small">
                {ctaText} <ArrowIcon size={16} />
              </Button>
              {ctaNote && <span className="text-[.78rem] text-ajax-black/60/50 font-medium">{ctaNote}</span>}
            </div>
          </div>

          {/* Visual side */}
          <div className={`feat-visual bg-white border-2 border-[#131313]/10 p-9 min-h-[360px] flex items-center justify-center relative overflow-hidden max-md:min-h-0 max-md:p-6 ${reverse ? 'max-md:order-2 md:order-1' : ''}`}
            style={{ boxShadow: '4px 4px 0px rgba(19,19,19,0.08)' }}
          >
            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-0 h-0"
              style={{
                borderStyle: 'solid',
                borderWidth: '0 28px 28px 0',
                borderColor: 'transparent #5E17EB transparent transparent',
              }}
            />
            {visual}
          </div>
        </div>
      </div>
    </section>
  )
}
