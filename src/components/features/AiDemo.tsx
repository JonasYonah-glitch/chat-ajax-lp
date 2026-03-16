import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { StarIcon } from '../../icons'

export function AiDemo() {
  const demoRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!demoRef.current) return
    const ctx = gsap.context(() => {
      const msgs = demoRef.current!.querySelectorAll('.msg')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: demoRef.current, start: 'top 72%', once: true },
      })
      msgs.forEach((msg, i) => {
        tl.to(msg, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, i * 0.4)
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={demoRef} className="w-full max-w-[380px]">
      {/* User message */}
      <div className="msg py-3 px-4 mb-2.5 text-[.85rem] leading-[1.5] max-w-[85%] opacity-0 translate-y-4 bg-[#5E17EB] text-white ml-auto">
        Ola, quero saber o preco do plano Pro e se tem desconto anual
      </div>

      {/* Bot message */}
      <div className="msg py-3 px-4 mb-2.5 text-[.85rem] leading-[1.5] max-w-[85%] opacity-0 translate-y-4 bg-[#F0F0F0] text-ajax-black border-l-[3px] border-[#5E17EB]">
        <div className="flex items-center gap-1 text-[.65rem] font-bold text-[#5E17EB] mb-1 uppercase tracking-[.06em]">
          <StarIcon size={12} /> Captain AI
        </div>
        Oi! O plano Pro custa R$797/mes. No plano anual voce ganha <strong>2 meses gratis</strong>, saindo por R$664/mes. Quer que eu gere o link de pagamento?
      </div>

      {/* User message */}
      <div className="msg py-3 px-4 mb-2.5 text-[.85rem] leading-[1.5] max-w-[85%] opacity-0 translate-y-4 bg-[#5E17EB] text-white ml-auto">
        Sim, por favor!
      </div>

      {/* Bot message */}
      <div className="msg py-3 px-4 mb-2.5 text-[.85rem] leading-[1.5] max-w-[85%] opacity-0 translate-y-4 bg-[#F0F0F0] text-ajax-black border-l-[3px] border-[#5E17EB]">
        <div className="flex items-center gap-1 text-[.65rem] font-bold text-[#5E17EB] mb-1 uppercase tracking-[.06em]">
          <StarIcon size={12} /> Captain AI
        </div>
        Pronto! Aqui esta seu link: <span className="text-[#5E17EB] underline">checkout.ajax.dev.br/pro-anual</span><br />Pagamento via PIX, cartao ou boleto. Qualquer duvida estou aqui!
      </div>

      {/* Typing indicator */}
      <div className="msg flex items-center gap-1.5 px-4 py-3 max-w-[80px] opacity-0 translate-y-4 bg-[#F0F0F0] border-l-[3px] border-[#5E17EB]">
        <span className="w-1.5 h-1.5 bg-[#5E17EB] animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-[#5E17EB] animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 bg-[#5E17EB] animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  )
}
