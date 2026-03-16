import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import {
  WhatsAppIcon, InstagramIcon, TikTokIcon, MessengerIcon,
  TelegramIcon, EmailIcon, SmsIcon, LineIcon, GoogleIcon, PhoneIcon
} from '../../icons'

const channels = [
  { icon: WhatsAppIcon, color: '#25D366', bg: '#25D366' },
  { icon: InstagramIcon, color: '#fff', bg: 'linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)' },
  { icon: TikTokIcon, color: '#fff', bg: '#111' },
  { icon: MessengerIcon, color: '#fff', bg: '#006AFF' },
  { icon: TelegramIcon, color: '#fff', bg: '#26A5E4' },
  { icon: EmailIcon, color: '#fff', bg: '#3B82F6' },
  { icon: SmsIcon, color: '#fff', bg: '#EF4444' },
  { icon: LineIcon, color: '#fff', bg: '#06C755' },
  { icon: GoogleIcon, color: '#fff', bg: '#4285F4' },
  { icon: PhoneIcon, color: '#fff', bg: '#6366F1' },
]

export function ChannelStrip() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    const icons = containerRef.current.querySelectorAll('.ch-strip-icon')
    const ctx = gsap.context(() => {
      icons.forEach((icon, i) => {
        gsap.fromTo(icon,
          { scale: 0, opacity: 0 },
          {
            scrollTrigger: { trigger: icon, start: 'top 95%', once: true },
            scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)', delay: i * 0.05,
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="flex items-center justify-center gap-4 flex-wrap mt-12 p-5 bg-white border-2 border-[#131313]/10 shadow-[4px_4px_0_rgba(19,19,19,.06)]">
      <span className="text-[.72rem] text-gray-400 font-bold uppercase tracking-[.08em]">Canais suportados:</span>
      {channels.map((ch, i) => {
        const Icon = ch.icon
        return (
          <div
            key={i}
            className="ch-strip-icon group w-11 h-11 flex items-center justify-center transition-all duration-200 hover:scale-[1.12] hover:border-[#5E17EB] cursor-default border-2 border-transparent"
            style={{ background: ch.bg }}
          >
            <Icon size={22} fill={ch.color} />
          </div>
        )
      })}
    </div>
  )
}
