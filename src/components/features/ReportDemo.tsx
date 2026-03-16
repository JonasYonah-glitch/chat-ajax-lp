import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'

const bars = [
  { label: 'Resolvidos', width: '87%', text: '87%', highlight: true },
  { label: 'CSAT', width: '94%', text: '94%', highlight: false },
  { label: 'Tempo Resp.', width: '72%', text: '<2min', highlight: false },
  { label: 'IA Auto', width: '65%', text: '65%', highlight: true },
]

export function ReportDemo() {
  const demoRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!demoRef.current) return
    const ctx = gsap.context(() => {
      const fills = demoRef.current!.querySelectorAll('.bar-fill')
      fills.forEach((bar, i) => {
        const el = bar as HTMLElement
        const targetWidth = el.getAttribute('data-width') || '0%'
        el.style.width = '0%'
        gsap.to(el, {
          scrollTrigger: { trigger: demoRef.current, start: 'top 85%', once: true },
          width: targetWidth,
          duration: 1.2,
          ease: 'power2.out',
          delay: i * 0.15,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={demoRef} className="w-full max-w-[380px]">
      {/* Header */}
      <div className="text-[.82rem] font-[800] mb-6 text-ajax-black uppercase tracking-[.08em] pb-3 border-b-2 border-[#131313]">
        Performance Semanal
      </div>

      {bars.map((bar, i) => (
        <div key={i} className="flex items-center gap-3 mb-3">
          <div className="text-[.72rem] text-ajax-black/40 w-[90px] text-right shrink-0 font-semibold tracking-[.04em] uppercase">
            {bar.label}
          </div>
          {/* Bar track — hard edge, no rounded tops */}
          <div className="flex-1 h-[30px] bg-[rgba(0,0,0,.06)] overflow-hidden relative border border-[rgba(0,0,0,.04)]">
            <div
              className={`bar-fill h-full flex items-center pl-3 text-[.7rem] font-bold text-white tracking-[.04em] uppercase ${
                bar.highlight ? 'bg-[#5E17EB]' : 'bg-[#131313]'
              }`}
              data-width={bar.width}
              style={{ width: 0 }}
            >
              {bar.text}
            </div>
          </div>
        </div>
      ))}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2.5 mt-5">
        <div className="text-center py-4 px-3 bg-[rgba(0,0,0,.03)] border-2 border-[#131313]/10">
          <div className="text-[1.4rem] font-[900] leading-[1.2] text-[#5E17EB]">1.247</div>
          <div className="text-[.62rem] text-ajax-black/50 mt-1 uppercase tracking-[.08em] font-bold">Conversas/semana</div>
        </div>
        <div className="text-center py-4 px-3 bg-[rgba(0,0,0,.03)] border-2 border-[#131313]/10">
          <div className="text-[1.4rem] font-[900] leading-[1.2] text-[#5E17EB]">48s</div>
          <div className="text-[.62rem] text-ajax-black/50 mt-1 uppercase tracking-[.08em] font-bold">Tempo medio</div>
        </div>
      </div>
    </div>
  )
}
