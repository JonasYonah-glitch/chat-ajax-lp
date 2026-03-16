import { useState, useEffect } from 'react'
import { ScrollTrigger } from '../../lib/gsap'
import { ArrowIcon } from '../../icons'

export function FloatingCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 800,
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    })
    return () => trigger.kill()
  }, [])

  return (
    <div className={`fixed bottom-6 right-6 z-[950] transition-all duration-[400ms] ease-smooth pb-[env(safe-area-inset-bottom)] ${
      visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'
    }`}>
      <a
        href="#start"
        className="inline-flex items-center justify-center gap-2 py-3 px-6 font-bold text-[.85rem] no-underline bg-[#5E17EB] text-white transition-all duration-[250ms] ease-smooth uppercase tracking-[.04em] hover:shadow-[4px_4px_0_rgba(94,23,235,.4)] hover:-translate-y-0.5 hover:bg-[#4A11C0]"
        style={{ boxShadow: '2px 2px 0 rgba(94,23,235,0.3)' }}
      >
        Teste Gratis <ArrowIcon size={14} />
      </a>
    </div>
  )
}
