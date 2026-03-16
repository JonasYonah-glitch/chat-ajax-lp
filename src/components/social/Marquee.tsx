import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import {
  WhatsAppIcon, InstagramIcon, TikTokIcon, MessengerIcon,
  TelegramIcon, EmailIcon, SmsIcon, LineIcon, GoogleIcon, PhoneIcon, SlackIcon
} from '../../icons'

const platforms = [
  { icon: WhatsAppIcon, color: '#25D366' },
  { icon: InstagramIcon, color: '#E1306C' },
  { icon: TikTokIcon, color: '#010101' },
  { icon: MessengerIcon, color: '#006AFF' },
  { icon: TelegramIcon, color: '#26A5E4' },
  { icon: EmailIcon, color: '#3B82F6' },
  { icon: SmsIcon, color: '#EF4444' },
  { icon: LineIcon, color: '#06C755' },
  { icon: GoogleIcon, color: '#4285F4' },
  { icon: PhoneIcon, color: '#7B4FE0' },
  { icon: SlackIcon, color: '#E01E5A' },
]

const tripled = [...platforms, ...platforms, ...platforms]

const CIRCLE_SIZE = 56
const GAP = 32
const ITEM_WIDTH = CIRCLE_SIZE + GAP
const SET_WIDTH = platforms.length * ITEM_WIDTH

const AMPLITUDE = 14
const FREQUENCY = 0.25
const PHASE_OFFSET = 0.5

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<(() => void) | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const circles = track.querySelectorAll<HTMLElement>('.mq-circle')
    if (circles.length === 0) return

    tweenRef.current = gsap.to(track, {
      x: -SET_WIDTH,
      duration: 45,
      ease: 'none',
      repeat: -1,
    })

    const wave = () => {
      const t = performance.now() / 1000
      circles.forEach((el, i) => {
        const idx = i % platforms.length
        const y = Math.sin(t * FREQUENCY * Math.PI * 2 + idx * PHASE_OFFSET) * AMPLITUDE
        el.style.transform = `translateY(${y}px)`
      })
    }

    waveRef.current = wave
    gsap.ticker.add(wave)

    return () => {
      if (waveRef.current) gsap.ticker.remove(waveRef.current)
      if (tweenRef.current) tweenRef.current.kill()
    }
  }, [])

  return (
    <div className="py-12 overflow-hidden bg-white relative">
      {/* Fade edges — strong gradient, icons only visible in the center ~30% */}
      <div className="absolute left-0 top-0 bottom-0 w-[45%] z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--marquee-bg) 0%, var(--marquee-bg) 40%, transparent 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-[45%] z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--marquee-bg) 0%, var(--marquee-bg) 40%, transparent 100%)' }} />
      <style>{`:root { --marquee-bg: #FFFFFF; } .dark { --marquee-bg: #131313; }`}</style>

      <div
        ref={trackRef}
        className="flex items-center"
        style={{ gap: GAP, width: 'max-content' }}
      >
        {tripled.map((p, i) => {
          const Icon = p.icon
          return (
            <div
              key={i}
              className="is-rounded mq-circle flex items-center justify-center will-change-transform cursor-default select-none shrink-0 transition-transform duration-200 hover:scale-110"
              style={{
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                borderRadius: '9999px',
              }}
            >
              <Icon
                size={32}
                fill={p.color}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
