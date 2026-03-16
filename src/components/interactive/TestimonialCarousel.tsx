import { useState, useRef, useEffect, useCallback } from 'react'
import { testimonials } from '../../data/testimonials'
import { Container } from '../ui/Container'
import { SectionTag } from '../ui/SectionTag'
import { SectionTitle } from '../ui/SectionTitle'
import { StarIcon } from '../../icons'
import { SolarIcon } from '../../icons'

const AUTOPLAY_INTERVAL = 6000
const DRAG_THRESHOLD = 50

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    currentX: 0,
  })
  const trackRef = useRef<HTMLDivElement>(null)

  const total = testimonials.length

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total)
    },
    [total],
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Autoplay
  const startAutoplay = useCallback(() => {
    stopAutoplay()
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, AUTOPLAY_INTERVAL)
  }, [total])

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoplay()
    return stopAutoplay
  }, [startAutoplay, stopAutoplay])

  const handleUserInteraction = useCallback(() => {
    stopAutoplay()
    setTimeout(startAutoplay, 10000)
  }, [stopAutoplay, startAutoplay])

  // Mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current.isDragging = true
    dragRef.current.startX = e.clientX
    dragRef.current.currentX = e.clientX
    handleUserInteraction()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.isDragging) return
    dragRef.current.currentX = e.clientX
  }

  const handleMouseUp = () => {
    if (!dragRef.current.isDragging) return
    const diff = dragRef.current.startX - dragRef.current.currentX
    if (Math.abs(diff) > DRAG_THRESHOLD) {
      if (diff > 0) next()
      else prev()
    }
    dragRef.current.isDragging = false
  }

  const handleMouseLeave = () => {
    if (dragRef.current.isDragging) handleMouseUp()
  }

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    dragRef.current.isDragging = true
    dragRef.current.startX = e.touches[0].clientX
    dragRef.current.currentX = e.touches[0].clientX
    handleUserInteraction()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.isDragging) return
    dragRef.current.currentX = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!dragRef.current.isDragging) return
    const diff = dragRef.current.startX - dragRef.current.currentX
    if (Math.abs(diff) > DRAG_THRESHOLD) {
      if (diff > 0) next()
      else prev()
    }
    dragRef.current.isDragging = false
  }

  return (
    <section className="py-20 max-md:py-10 bg-white" id="depoimentos">
      <Container>
        <div className="text-center mb-12">
          <SectionTag>Depoimentos</SectionTag>
          <SectionTitle
            title={
              <>
                Quem ja usa o <span className="text-[#5E17EB]">Chat Ajax</span>
              </>
            }
            subtitle="Empresas reais contando o que mudou."
          />
        </div>

        <div className="relative max-w-[960px] mx-auto">
          {/* Carousel viewport — hard border */}
          <div
            className="overflow-hidden border-2 border-[#131313] cursor-grab active:cursor-grabbing select-none"
            style={{
              borderRadius: 0,
              boxShadow: `${testimonials[current] ? '8px 8px 0 #5E17EB' : '8px 8px 0 #131313'}`,
              transition: 'box-shadow 0.3s ease',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${current * (100 / total)}%)`,
                width: `${total * 100}%`,
                transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
              }}
            >
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_1.1fr] max-md:grid-cols-1"
                  style={{ width: `${100 / total}%` }}
                >
                  {/* Left: photo on colored grid */}
                  <div
                    className="relative flex items-center justify-center p-10 max-md:p-6 min-h-[440px] max-md:min-h-[280px] overflow-hidden"
                    style={{ backgroundColor: t.brandColor }}
                  >
                    {/* Grid overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none z-0"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.15) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px',
                      }}
                      aria-hidden="true"
                    />

                    {/* Large decorative quote mark */}
                    <div
                      className="absolute top-4 left-4 text-white/20 font-extrabold leading-none select-none"
                      style={{ fontSize: '120px', lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      "
                    </div>

                    {/* Portrait photo */}
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="relative z-[1] w-[70%] aspect-[3/4] object-cover object-top"
                      loading="lazy"
                    />
                  </div>

                  {/* Right: quote */}
                  <div className="bg-white p-10 max-md:p-8 flex flex-col justify-center">
                    {/* Star rating */}
                    <div className="flex gap-1 mb-5" aria-label="Avaliacao 5 de 5 estrelas">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} size={16} className="text-[#5E17EB]" />
                      ))}
                    </div>

                    {/* Large decorative quote mark — purple */}
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="#5E17EB"
                      className="mb-5 shrink-0 opacity-60"
                      aria-hidden="true"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179m10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179" />
                    </svg>

                    <blockquote className="text-base text-[#131313]/80 leading-[1.8] mb-8 italic">
                      {t.quote}
                    </blockquote>

                    <div className="border-t-2 border-[#131313]/10 pt-5">
                      <p className="text-xs font-bold text-[#131313] tracking-[0.12em] uppercase">
                        {t.name}, {t.role}
                      </p>
                      <p className="text-xs font-semibold text-[#131313]/50 tracking-[0.1em] uppercase mt-0.5">
                        {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation — arrows + square dots */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Prev arrow */}
            <button
              onClick={() => {
                prev()
                handleUserInteraction()
              }}
              className="w-[44px] h-[44px] border-2 border-[#131313] bg-white flex items-center justify-center cursor-pointer hover:border-[#5E17EB] hover:text-[#5E17EB] hover:shadow-[4px_4px_0_#5E17EB] transition-all duration-200 text-[#131313]"
              style={{ borderRadius: 0 }}
              aria-label="Depoimento anterior"
            >
              <SolarIcon icon="solar:arrow-left-linear" size={16} />
            </button>

            {/* Square dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Depoimentos">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    goTo(i)
                    handleUserInteraction()
                  }}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Depoimento ${i + 1}`}
                  className="transition-all duration-200"
                  style={{
                    width: i === current ? '20px' : '10px',
                    height: '10px',
                    borderRadius: 0,
                    border: '2px solid',
                    borderColor: i === current ? '#5E17EB' : '#131313',
                    background: i === current ? '#5E17EB' : 'transparent',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={() => {
                next()
                handleUserInteraction()
              }}
              className="w-[44px] h-[44px] border-2 border-[#131313] bg-white flex items-center justify-center cursor-pointer hover:border-[#5E17EB] hover:text-[#5E17EB] hover:shadow-[4px_4px_0_#5E17EB] transition-all duration-200 text-[#131313]"
              style={{ borderRadius: 0 }}
              aria-label="Proximo depoimento"
            >
              <SolarIcon icon="solar:arrow-right-linear" size={16} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
