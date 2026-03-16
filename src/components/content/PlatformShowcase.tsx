import { useState, useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { Container } from '../ui/Container'
import { SectionTag } from '../ui/SectionTag'
import { SectionTitle } from '../ui/SectionTitle'
import { Button } from '../ui/Button'
import { ArrowIcon } from '../../icons'

/* ── Sector data with contextual chat messages ── */
const sectors = [
  {
    id: 'sac',
    title: 'Atendimento ao cliente',
    description: 'A IA responde 90% das duvidas na hora. Quando nao sabe, passa pra um atendente de verdade — sem o cliente esperar.',
    chatName: 'Chat Ajax IA',
    messages: [
      { from: 'user', text: 'Oi, fui cobrada duas vezes no cartao esse mes 😤' },
      { from: 'bot', text: 'Oi, Carla! Ja identifiquei a cobranca duplicada de R$129,90 no dia 05/06. Estorno processado agora — cai em ate 48h 💳' },
      { from: 'user', text: 'Uau, ja resolveu? Sem precisar falar com ninguem?' },
      { from: 'bot', text: 'Isso! Enviei o comprovante do estorno no seu e-mail. Qualquer duvida, e so me chamar 😊' },
    ],
  },
  {
    id: 'leads',
    title: 'Captacao de clientes',
    description: 'A IA conversa, coleta dados e separa quem tem interesse real. Voce so fala com quem ja quer comprar.',
    chatName: 'SDR Automatico',
    messages: [
      { from: 'bot', text: 'Oi! Vi que voce se interessou pelo nosso plano Pro. Posso te ajudar?' },
      { from: 'user', text: 'Sim! Quero saber o preco' },
      { from: 'bot', text: 'O Pro custa R$797/mes. Quantos atendentes voce tem hoje?' },
      { from: 'user', text: 'Uns 8 atendentes' },
      { from: 'bot', text: 'Perfeito! Vou agendar uma demo com nosso time. Qual melhor horario?' },
    ],
  },
  {
    id: 'marketing',
    title: 'Vendas pelo WhatsApp',
    description: 'Manda mensagem pra lista de contatos, responde comentarios do Instagram sozinha e transforma curtidas em compras.',
    chatName: 'Marketing Bot',
    messages: [
      { from: 'bot', text: 'Vi que voce curtiu nosso post! 🔥 Quer ver mais sobre esse produto?' },
      { from: 'user', text: 'Sim! Quanto custa?' },
      { from: 'bot', text: 'R$189 mas hoje tem 15% OFF exclusivo pra voce! Quer o link?' },
      { from: 'user', text: 'Quero!' },
      { from: 'bot', text: 'Aqui esta: loja.com/checkout/89d — PIX, cartao ou boleto. Frete gratis! 🚀' },
    ],
  },
  {
    id: 'saude',
    title: 'Saude',
    description: 'Paciente agenda pelo WhatsApp, recebe lembrete automatico e ja vem preparado pra consulta.',
    chatName: 'Clinica Bot',
    messages: [
      { from: 'user', text: 'Quero agendar uma consulta com Dr. Silva' },
      { from: 'bot', text: 'Claro! Dr. Silva tem horarios disponiveis segunda (14h) e quarta (10h). Qual prefere?' },
      { from: 'user', text: 'Segunda 14h' },
      { from: 'bot', text: 'Agendado! Enviarei um lembrete 24h antes. Leve seu documento e carteirinha do convenio 📋' },
    ],
  },
  {
    id: 'educacao',
    title: 'Educacao',
    description: 'Aluno se matricula, tira duvidas e recebe material — tudo pelo WhatsApp, sem precisar ligar pra escola.',
    chatName: 'Escola Bot',
    messages: [
      { from: 'user', text: 'Quero informacoes sobre o curso de programacao' },
      { from: 'bot', text: 'Nosso curso de Full Stack dura 6 meses, com aulas ao vivo. Investimento: 12x de R$297. Quer se matricular?' },
      { from: 'user', text: 'Sim, como faco?' },
      { from: 'bot', text: 'Vou te enviar o link de matricula agora! Temos 10% de desconto no PIX 🎓' },
    ],
  },
  {
    id: 'imobiliario',
    title: 'Mercado Imobiliario',
    description: 'A IA descobre o que o cliente procura, agenda a visita e lembra o corretor. Sem perder nenhum contato.',
    chatName: 'Imob Bot',
    messages: [
      { from: 'user', text: 'Tenho interesse no apartamento do anuncio' },
      { from: 'bot', text: 'Otimo! E o AP de 3 quartos no Campeche? Valor: R$850mil. Quer agendar uma visita?' },
      { from: 'user', text: 'Sim, sabado de manha' },
      { from: 'bot', text: 'Agendado para sabado 10h! O corretor Carlos vai te receber. Envio a localizacao no dia 📍' },
    ],
  },
  {
    id: 'beleza',
    title: 'Beleza e Estetica',
    description: 'Cliente agenda, recebe lembrete e volta mais vezes. Voce nao precisa ficar ligando pra confirmar horario.',
    chatName: 'Salao Bot',
    messages: [
      { from: 'bot', text: 'Oi Ana! Faz 30 dias desde seu ultimo corte. Quer agendar novamente? 💇‍♀️' },
      { from: 'user', text: 'Quero! Sexta tem horario?' },
      { from: 'bot', text: 'Sexta 15h com a Juliana. Confirmo?' },
      { from: 'user', text: 'Confirma!' },
      { from: 'bot', text: 'Pronto! Te vejo sexta. Lembrete enviado ✨' },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery e Alimentacao',
    description: 'Cliente pede pelo WhatsApp, acompanha o pedido e ainda avalia. Tudo sem precisar de app ou site.',
    chatName: 'Delivery Bot',
    messages: [
      { from: 'user', text: 'Quero pedir uma pizza margherita grande' },
      { from: 'bot', text: 'Pizza Margherita Grande: R$49,90. Quer adicionar borda recheada (+R$8)?' },
      { from: 'user', text: 'Sim, com catupiry!' },
      { from: 'bot', text: 'Total: R$57,90. Previsao de entrega: 35 min. Pagamento na entrega ou PIX? 🍕' },
    ],
  },
]

export function PlatformShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const active = sectors[activeIndex]

  // Animate phone messages when sector changes
  useLayoutEffect(() => {
    if (!phoneRef.current) return
    const msgs = phoneRef.current.querySelectorAll('.chat-msg')
    const ctx = gsap.context(() => {
      gsap.fromTo(msgs,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.08, ease: 'power2.out' },
      )
    })
    return () => ctx.revert()
  }, [activeIndex])

  // Section entrance
  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current!.querySelector('.showcase-left'),
        { x: -30, opacity: 0 },
        { scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }, x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      )
      gsap.fromTo(sectionRef.current!.querySelector('.showcase-right'),
        { x: 30, opacity: 0 },
        { scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }, x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.15 },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 max-md:py-14 bg-white relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center mb-14 max-md:mb-10 max-w-5xl mx-auto">
          <SectionTag>Plataforma</SectionTag>
          <SectionTitle
            title={
              <>
                Nao importa o tipo de negocio.{' '}
                <span className="text-[#5E17EB]">Se voce vende pelo WhatsApp</span>, o Chat Ajax trabalha por voce
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">

          {/* Left — Accordion sectors */}
          <div className="showcase-left">
            {sectors.map((sector, i) => {
              const isActive = i === activeIndex
              return (
                <div
                  key={sector.id}
                  className={`border-b border-ajax-black/8 cursor-pointer transition-colors ${isActive ? '' : 'hover:bg-ajax-surface/50'}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <div className="flex items-center gap-3 py-4 px-2">
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className={`shrink-0 text-ajax-purple transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`}
                    >
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                    </svg>
                    <span className={`text-sm font-bold ${isActive ? 'text-ajax-purple' : 'text-ajax-black'}`}>
                      {sector.title}
                    </span>
                  </div>

                  {/* Expanded content */}
                  {isActive && (
                    <div className="pb-5 px-2 pl-9">
                      <p className="text-sm text-ajax-black/60 leading-relaxed">
                        {sector.description}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}

            {/* CTA */}
            <div className="mt-8">
              <Button href="#start" variant="primary">
                Quero comecar agora <ArrowIcon size={16} />
              </Button>
            </div>
          </div>

          {/* Right — iPhone mockup with contextual chat */}
          <div className="showcase-right flex justify-center lg:sticky lg:top-24">
            <div className="phone-frame" style={{ maxWidth: 300 }}>
              {/* iPhone outer shell */}
              <div className="relative" style={{ background: '#1C1C1E', borderRadius: 44, padding: 10, boxShadow: '0 25px 60px rgba(0,0,0,0.25)' }}>
                {/* Dynamic Island */}
                <div className="absolute z-20" style={{ top: 12, left: '50%', transform: 'translateX(-50%)', width: 90, height: 26, background: '#000', borderRadius: 13 }} />

                {/* Screen */}
                <div className="relative overflow-hidden" style={{ background: '#EDEDED', borderRadius: 36 }}>
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-7 pt-4 pb-1">
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#1C1C1E' }}>9:41</span>
                    <div className="flex items-center gap-1">
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="#1C1C1E"><rect x="0" y="4" width="2.5" height="6" rx="0.5"/><rect x="3.5" y="2.5" width="2.5" height="7.5" rx="0.5"/><rect x="7" y="1" width="2.5" height="9" rx="0.5"/><rect x="10.5" y="0" width="2.5" height="10" rx="0.5"/></svg>
                      <svg width="13" height="10" viewBox="0 0 13 10" fill="#1C1C1E"><path d="M6.5 2C8.4 2 10.1 2.8 11.3 4.1L12.5 2.9C11 1.3 8.9 0.3 6.5 0.3C4.1 0.3 2 1.3 0.5 2.9L1.7 4.1C2.9 2.8 4.6 2 6.5 2ZM6.5 5.3C7.6 5.3 8.6 5.7 9.3 6.5L10.5 5.3C9.5 4.2 8.1 3.5 6.5 3.5C4.9 3.5 3.5 4.2 2.5 5.3L3.7 6.5C4.4 5.7 5.4 5.3 6.5 5.3ZM6.5 8.1C7 8.1 7.4 8.3 7.7 8.6L6.5 10L5.3 8.6C5.6 8.3 6 8.1 6.5 8.1Z"/></svg>
                      <svg width="22" height="10" viewBox="0 0 22 10" fill="#1C1C1E"><rect x="0" y="1" width="18" height="8" rx="1.5" stroke="#1C1C1E" strokeWidth="1" fill="none"/><rect x="1.5" y="2.5" width="13" height="5" rx="0.5"/><rect x="19" y="3" width="2" height="4" rx="0.5"/></svg>
                    </div>
                  </div>

                  {/* Chat header */}
                  <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#075E54' }}>
                    <div className="w-9 h-9 flex items-center justify-center text-white font-bold text-sm" style={{ background: '#128C7E', borderRadius: 20 }}>
                      {active.chatName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold leading-tight">{active.chatName}</p>
                      <p className="text-white/70 text-[10px]">online agora</p>
                    </div>
                    <div className="ml-auto">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/></svg>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div ref={phoneRef} className="px-3 py-4 flex flex-col gap-2" style={{ minHeight: 340, background: '#ECE5DD' }}>
                    {active.messages.map((msg, i) => (
                      <div
                        key={`${active.id}-${i}`}
                        className={`chat-msg max-w-[85%] px-3 py-2 text-[12px] leading-[1.5] ${
                          msg.from === 'user'
                            ? 'self-end text-white'
                            : 'self-start text-[#303030]'
                        }`}
                        style={{
                          background: msg.from === 'user' ? '#DCF8C6' : '#FFFFFF',
                          color: msg.from === 'user' ? '#303030' : '#303030',
                          borderRadius: msg.from === 'user' ? '8px 0 8px 8px' : '0 8px 8px 8px',
                          boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
                        }}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-2 px-2 py-2" style={{ background: '#F0F0F0' }}>
                    <div className="flex-1 px-3 py-2 text-[11px] text-[#999]" style={{ background: '#FFF', borderRadius: 20 }}>
                      Mensagem
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center" style={{ background: '#075E54', borderRadius: 20 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side buttons */}
              <div className="absolute" style={{ right: -2, top: 100, width: 3, height: 55, background: '#2C2C2E', borderRadius: '0 2px 2px 0' }} />
              <div className="absolute" style={{ left: -2, top: 80, width: 3, height: 28, background: '#2C2C2E', borderRadius: '2px 0 0 2px' }} />
              <div className="absolute" style={{ left: -2, top: 118, width: 3, height: 48, background: '#2C2C2E', borderRadius: '2px 0 0 2px' }} />
              <div className="absolute" style={{ left: -2, top: 176, width: 3, height: 48, background: '#2C2C2E', borderRadius: '2px 0 0 2px' }} />
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
