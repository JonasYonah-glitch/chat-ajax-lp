import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { channels } from '../../data/channels'
import { Container } from '../ui/Container'
import { SectionTag } from '../ui/SectionTag'
import { SectionTitle } from '../ui/SectionTitle'
import { ChannelCard } from './ChannelCard'
import { FloatingShapes } from '../backgrounds/FloatingShapes'

const CARD_SCROLL_DISTANCE = 180
const WRAPPER_PADDING = 120

export function ChannelsSection() {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [cardHeight, setCardHeight] = useState(400)

  // Measure first card height
  useEffect(() => {
    if (isMobile || !gridRef.current) return
    const firstCard = gridRef.current.querySelector('.channel-card') as HTMLElement | null
    if (firstCard) {
      setCardHeight(firstCard.offsetHeight)
    }
  }, [isMobile])

  // Desktop: GSAP scrub-driven card stacking
  useLayoutEffect(() => {
    if (isMobile || !sectionRef.current || !wrapperRef.current || !gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.channel-card')
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      const totalCards = cards.length
      const wrapperHeight =
        (totalCards - 1) * CARD_SCROLL_DISTANCE + cardHeight + WRAPPER_PADDING

      gsap.set(wrapperRef.current, { height: wrapperHeight })

      gsap.set(gridRef.current, {
        position: 'sticky',
        top: 100,
        height: cardHeight,
      })

      cards.forEach((card, i) => {
        gsap.set(card, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: i,
        })

        if (i > 0) {
          gsap.set(card, { opacity: 0, y: 50 })
        }
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 100px',
          end: 'bottom bottom',
          scrub: 1,
          pin: false,
        },
      })

      tl.to({}, { duration: 0.3 })

      for (let i = 0; i < totalCards - 1; i++) {
        tl.to(
          cards[i],
          {
            scale: 0.92,
            y: -15,
            opacity: 0,
            duration: 0.5,
            ease: 'power1.inOut',
          },
          `card-${i}`
        )

        tl.to(
          cards[i + 1],
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power1.inOut',
          },
          `card-${i}`
        )

        if (i < totalCards - 2) {
          tl.to({}, { duration: 0.3 })
        }
      }

      tl.to({}, { duration: 0.3 })
    })

    return () => ctx.revert()
  }, [isMobile, cardHeight])

  // Mobile: GSAP stagger entrance
  useLayoutEffect(() => {
    if (!isMobile || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.channel-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            delay: i * 0.08,
          }
        )
      })
    })

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section ref={sectionRef} className="py-20 max-md:py-10 bg-white relative" style={{ overflow: 'clip' }} id="canais">
      <FloatingShapes />
      <Container>
        <div className="text-center mb-12">
          <SectionTag>Canais</SectionTag>
          <SectionTitle
            title={
              <>
                Todos os canais em uma <span className="serif-i">unica tela</span>
              </>
            }
            subtitle="Conecte WhatsApp, Instagram, TikTok, Email e mais. Responda tudo de um so lugar."
          />
        </div>

        {isMobile ? (
          /* Mobile: simple flex column */
          <div className="flex flex-col gap-5">
            {channels.map(channel => (
              <div key={channel.id} className="channel-card">
                <ChannelCard channel={channel} />
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: scroll-stacking wrapper */
          <div ref={wrapperRef} className="relative">
            <div ref={gridRef} className="relative max-w-[860px] mx-auto">
              {channels.map(channel => (
                <div key={channel.id} className="channel-card">
                  <ChannelCard channel={channel} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
