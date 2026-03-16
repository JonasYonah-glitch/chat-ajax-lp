import { useState } from 'react'
import { Container } from '../components/ui/Container'

const subjects = [
  'Duvida sobre planos',
  'Suporte tecnico',
  'Parceria comercial',
  'Imprensa',
  'Outro',
]

export default function ContatoPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  const inputClass = 'w-full bg-[#F0F0F5] border-2 border-[rgba(0,0,0,.08)] px-4 py-3.5 text-ajax-black text-[.9rem] outline-none transition-all duration-200 focus:border-[#5E17EB] focus:bg-white focus:shadow-[2px_2px_0_rgba(94,23,235,.15)] placeholder:text-ajax-black/40'

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-full bg-[#5E17EB]/04 pointer-events-none"
          style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
        <Container>
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-[.72rem] font-bold uppercase tracking-[.12em] text-[#5E17EB] mb-4 px-3 py-1.5 border-2 border-[#5E17EB]/30 bg-[#5E17EB]/05">
                Contato
              </span>
              <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-[800] text-ajax-black mb-4 uppercase tracking-[.02em]">
                Fale <span className="serif-i">Conosco</span>
              </h1>
              <p className="text-ajax-black/70 text-lg leading-[1.7] max-w-[500px] mx-auto">
                Tem alguma duvida ou precisa de ajuda? Estamos aqui para voce.
              </p>
            </div>

            <div className="grid grid-cols-[1fr_1.2fr] gap-12 max-md:grid-cols-1">
              {/* Contact info */}
              <div>
                <h2 className="text-[1.1rem] font-[800] text-ajax-black mb-6 uppercase tracking-[.06em]">Informacoes</h2>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <rect x="2" y="3.5" width="14" height="11" rx="2" stroke="#5E17EB" strokeWidth="1.3" />
                          <path d="M2.5 4.5L9 9.5L15.5 4.5" stroke="#5E17EB" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      ),
                      title: 'Email',
                      content: <a href="mailto:contato@ajax.dev.br" className="text-[#5E17EB] text-[.85rem] no-underline hover:underline">contato@ajax.dev.br</a>,
                    },
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M15 12.5C15 12.88 14.88 13.27 14.62 13.63C14.36 13.99 14.04 14.31 13.63 14.57C12.94 14.99 12.18 15.2 11.38 15.2C10.22 15.2 8.98 14.85 7.68 14.15C6.38 13.45 5.08 12.5 3.84 11.26C2.6 10.02 1.65 8.72 0.95 7.42C0.25 6.12 -0.1 4.88 -0.1 3.72C-0.1 2.94 0.1 2.2 0.5 1.53C0.9 0.86 1.45 0.28 2.17 -0.1" stroke="#5E17EB" strokeWidth="1.3" strokeLinecap="round" />
                          <path d="M11.5 2.5C12.33 2.83 13.07 3.33 13.67 3.97C14.27 4.6 14.73 5.37 15 6.2" stroke="#5E17EB" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      ),
                      title: 'WhatsApp',
                      content: <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-[#5E17EB] text-[.85rem] no-underline hover:underline">(11) 99999-9999</a>,
                    },
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="9" r="7" stroke="#5E17EB" strokeWidth="1.3" />
                          <path d="M9 5V9.5L12 11" stroke="#5E17EB" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      ),
                      title: 'Horario de atendimento',
                      content: (
                        <>
                          <div className="text-ajax-black/70 text-[.85rem]">Seg a Sex, 9h as 18h (BRT)</div>
                          <div className="text-ajax-black/50 text-[.78rem] mt-0.5">Suporte via chat: 24/7</div>
                        </>
                      ),
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[rgba(94,23,235,.08)] border-2 border-[#5E17EB]/20 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-ajax-black font-bold text-[.9rem] uppercase tracking-[.04em]">{item.title}</div>
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Priority support card — hard edge */}
                <div className="mt-8 p-5 bg-[#F0F0F5] border-2 border-[#131313]/10 relative" style={{ boxShadow: '2px 2px 0 rgba(19,19,19,.06)' }}>
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#059669]" />
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1.5L2.5 4V7.5C2.5 11 5 13.5 8 14.5C11 13.5 13.5 11 13.5 7.5V4L8 1.5Z" stroke="#059669" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(5,150,105,.06)" />
                      <path d="M5.5 8L7.5 10L10.5 6" stroke="#059669" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-ajax-black font-bold text-[.85rem] uppercase tracking-[.04em]">Suporte prioritario</span>
                  </div>
                  <p className="text-ajax-black/70 text-[.8rem] leading-[1.6]">
                    Clientes dos planos Pro e Enterprise contam com suporte prioritario via canal dedicado.
                  </p>
                </div>
              </div>

              {/* Contact form */}
              <div>
                {sent ? (
                  <div className="bg-[#F0F0F5] border-2 border-[#131313]/10 p-10 text-center relative" style={{ boxShadow: '4px 4px 0 rgba(19,19,19,.06)' }}>
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#059669]" />
                    <div className="w-16 h-16 bg-[rgba(5,150,105,.08)] border-2 border-[rgba(5,150,105,.2)] flex items-center justify-center mx-auto mb-5">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M7 14.5L11.5 19L21 9.5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-[1.2rem] font-[800] text-ajax-black mb-2 uppercase tracking-[.04em]">Mensagem enviada!</h3>
                    <p className="text-ajax-black/70 text-[.9rem] leading-[1.6]">
                      Recebemos sua mensagem e responderemos em ate 24 horas uteis.
                    </p>
                    <button
                      onClick={() => { setSent(false); setName(''); setEmail(''); setSubject(''); setMessage('') }}
                      className="mt-6 px-6 py-3 bg-[#5E17EB] text-white font-bold text-[.85rem] border-none cursor-pointer uppercase tracking-[.04em] transition-all duration-200 hover:bg-[#4A11C0] hover:shadow-[2px_2px_0_rgba(94,23,235,.3)]"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-[#F0F0F5] border-2 border-[#131313]/10 p-8 max-sm:p-5 relative" style={{ boxShadow: '4px 4px 0 rgba(19,19,19,.06)' }}>
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#5E17EB]" />
                    <h2 className="text-[1.1rem] font-[800] text-ajax-black mb-5 uppercase tracking-[.06em]">Envie sua mensagem</h2>
                    <div className="flex flex-col gap-4">
                      {[
                        { label: 'Nome', type: 'text', placeholder: 'Seu nome', value: name, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value) },
                        { label: 'Email', type: 'email', placeholder: 'seu@email.com', value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) },
                      ].map((f, i) => (
                        <div key={i}>
                          <label className="text-[.72rem] text-ajax-black/70 font-bold mb-1.5 block uppercase tracking-[.08em]">{f.label}</label>
                          <input className={inputClass} type={f.type} placeholder={f.placeholder} value={f.value} onChange={f.onChange} required />
                        </div>
                      ))}
                      <div>
                        <label className="text-[.72rem] text-ajax-black/70 font-bold mb-1.5 block uppercase tracking-[.08em]">Assunto</label>
                        <select
                          className={inputClass + ' appearance-none cursor-pointer'}
                          value={subject}
                          onChange={e => setSubject(e.target.value)}
                          required
                        >
                          <option value="" disabled>Selecione um assunto</option>
                          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[.72rem] text-ajax-black/70 font-bold mb-1.5 block uppercase tracking-[.08em]">Mensagem</label>
                        <textarea
                          className={inputClass + ' min-h-[120px] resize-y'}
                          placeholder="Descreva como podemos ajudar..."
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full mt-2 py-4 bg-[#5E17EB] text-white font-[800] text-[.95rem] cursor-pointer border-none transition-all duration-200 uppercase tracking-[.06em] hover:bg-[#4A11C0] hover:shadow-[4px_4px_0_rgba(94,23,235,.3)]"
                        style={{ boxShadow: '2px 2px 0 rgba(94,23,235,0.2)' }}
                      >
                        Enviar Mensagem
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
