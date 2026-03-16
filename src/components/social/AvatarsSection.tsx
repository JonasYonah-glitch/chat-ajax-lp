import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'
import { useMediaQuery } from '../../hooks/useMediaQuery'

// Fotos casuais de pessoas reais — Pexels (candid, não pose de estúdio)
const topRow = [
  { bubble: 'Quero saber o preco!', img: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face', bubblePos: 'top' as const },
  { bubble: 'Voces entregam para SP?', img: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face', bubblePos: 'top' as const },
  { bubble: 'Tem desconto no PIX?', img: 'https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face', bubblePos: 'bottom' as const },
]

const bottomRow = [
  { bubble: 'Posso parcelar em 12x?', img: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face', bubblePos: 'bottom' as const },
  { bubble: 'Amei o produto!', img: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face', bubblePos: 'top' as const },
  { bubble: 'Quanto tempo pra chegar?', img: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face', bubblePos: 'bottom' as const },
]


function Person({ bubble, img, bubblePos, active }: { bubble: string; img: string; bubblePos: 'top' | 'bottom'; active?: boolean }) {
  const borderColor = active ? 'border-[#5E17EB]' : 'border-ajax-black/10'
  const shadowClass = active ? 'shadow-[2px_2px_0_#5E17EB]' : 'shadow-[2px_2px_0_rgba(19,19,19,.06)]'

  return (
    <div className="float-person flex flex-col items-center gap-0 opacity-0">
      {/* Speech bubble above */}
      {bubblePos === 'top' && (
        <div className="relative mb-2">
          <div className={`py-2 px-4 bg-white text-[.8rem] text-ajax-black whitespace-nowrap max-w-[220px] max-md:text-[.6rem] max-md:py-1 max-md:px-2 border-2 ${borderColor} ${shadowClass}`}>
            {bubble}
          </div>
          {/* Tail pointing down to avatar */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[8px] w-0 h-0"
            style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `8px solid ${active ? '#5E17EB' : '#e5e5e5'}` }}
          />
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-0 h-0"
            style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid white' }}
          />
        </div>
      )}

      {/* Round avatar with photo */}
      <div
        className={`is-rounded overflow-hidden border-2 ${
          active ? 'border-[#5E17EB] shadow-[2px_2px_0_#5E17EB]' : 'border-ajax-black/15'
        } w-20 h-20 max-md:w-[46px] max-md:h-[46px]`}
        style={{ borderRadius: '9999px' }}
      >
        <img src={img} alt="" className="is-rounded w-full h-full object-cover" style={{ borderRadius: '9999px' }} loading="lazy" />
      </div>

      {/* Speech bubble below */}
      {bubblePos === 'bottom' && (
        <div className="relative mt-2">
          {/* Tail pointing up to avatar */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-[8px] w-0 h-0"
            style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: `8px solid ${active ? '#5E17EB' : '#e5e5e5'}` }}
          />
          <div className="absolute left-1/2 -translate-x-1/2 -top-[5px] w-0 h-0"
            style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '6px solid white' }}
          />
          <div className={`py-2 px-4 bg-white text-[.8rem] text-ajax-black whitespace-nowrap max-w-[220px] max-md:text-[.6rem] max-md:py-1 max-md:px-2 border-2 ${borderColor} ${shadowClass}`}>
            {bubble}
          </div>
        </div>
      )}
    </div>
  )
}

export function AvatarsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const phrase1Ref = useRef<HTMLDivElement>(null)
  const phrase2Ref = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 1024px)')

  useLayoutEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    const p1 = phrase1Ref.current
    const p2 = phrase2Ref.current
    if (!section || !wrapper || !p1 || !p2) return

    const ctx = gsap.context(() => {
      const persons = gsap.utils.toArray<HTMLElement>('.float-person')
      persons.forEach(p => gsap.set(p, { opacity: 0, y: 20, scale: 0.95 }))
      gsap.to(persons, {
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
        opacity: 1, y: 0, scale: 1,
        stagger: 0.08, duration: 0.5, ease: 'power2.out',
        onComplete: () => {
          persons.forEach((p, i) => {
            gsap.to(p, { y: -5, duration: 2 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.15 })
          })
        },
      })

      const scrollHeight = isMobile ? '300vh' : '250vh'
      wrapper.style.height = scrollHeight

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })
      tl.to({}, { duration: 0.4 })
      tl.to(p1, { opacity: 0, y: -30, duration: 0.3, ease: 'none' })
      tl.to(p2, { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '<0.1')
      tl.to({}, { duration: 0.4 })
    })

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section ref={sectionRef} className="bg-white relative" id="avatarsSection">
      <div ref={wrapperRef} className="relative">
        <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center px-6 py-10">
          <Container>
            <div className="flex justify-center gap-10 flex-wrap max-w-[1000px] mx-auto max-md:gap-3">
              {topRow.map((p, i) => <Person key={i} {...p} />)}
            </div>

            <div className="text-center my-12 max-md:my-6 mx-auto max-w-[800px] px-4 relative" style={{ minHeight: '8rem' }} id="avatarsText">
              <div ref={phrase1Ref} className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#131313] leading-[1.15] uppercase max-md:text-[2.1rem]">
                3 bilhoes de pessoas<br />estao nas<br />redes sociais
              </div>
              <div ref={phrase2Ref} className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#131313] leading-[1.15] uppercase absolute inset-0 flex items-center justify-center opacity-0 translate-y-[30px] max-md:text-[2.1rem]">
                <span>O seu negocio<br />precisa<br />estar la!</span>
              </div>
            </div>

            <div className="flex justify-center gap-10 flex-wrap max-w-[1000px] mx-auto max-md:gap-3">
              {bottomRow.map((p, i) => <Person key={i} {...p} />)}
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
