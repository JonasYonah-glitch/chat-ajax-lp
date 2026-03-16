import { useState, useEffect, useRef } from 'react'
import { useCheckout } from '../../hooks/useCheckout'
import { SolarIcon } from '../../icons'

/* ── Formatters ── */
function fmtCpfCnpj(v: string) {
  const d = v.replace(/\D/g, '')
  if (d.length <= 11)
    return d.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  return d.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}
function fmtCard(v: string) { return v.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19) }
function fmtExp(v: string) { const d = v.replace(/\D/g, '').slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d }

/* ── Shared styles — hard-edge ── */
const field = 'w-full bg-white border-2 border-ajax-black/10 px-4 py-3 text-[#131313] text-[.9rem] outline-none transition-all duration-200 focus:border-[#5E17EB] focus:shadow-[2px_2px_0_rgba(94,23,235,.15)] placeholder:text-ajax-black/40'
const label = 'text-[.72rem] text-ajax-black/60 font-bold mb-1.5 block uppercase tracking-[.06em]'
const btn = 'w-full py-[14px] bg-[#5E17EB] text-white font-bold text-[.95rem] cursor-pointer border-none transition-all duration-200 hover:bg-[#4A11C0] hover:shadow-[4px_4px_0_rgba(94,23,235,.3)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[.04em]'

/* ── Step 1 ── */
function StepCustomer() {
  const { state, setStep, setCustomerData } = useCheckout()
  const [name, setName] = useState(state.customerData?.name || '')
  const [email, setEmail] = useState(state.customerData?.email || '')
  const [cpf, setCpf] = useState(state.customerData?.cpfCnpj || '')
  const [err, setErr] = useState<Record<string, string>>({})

  function next() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Informe seu nome'
    if (!email.trim() || !email.includes('@')) e.email = 'Email invalido'
    const d = cpf.replace(/\D/g, '')
    if (d.length !== 11 && d.length !== 14) e.cpf = 'CPF ou CNPJ invalido'
    if (Object.keys(e).length) { setErr(e); return }
    setCustomerData({ name: name.trim(), email: email.trim(), cpfCnpj: cpf.replace(/\D/g, '') })
    setStep('payment')
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <label className={label}>Nome completo</label>
          <input className={field} placeholder="Seu nome completo" value={name} onChange={e => { setName(e.target.value); setErr(p => ({ ...p, name: '' })) }} />
          {err.name && <p className="text-[#EF4444] text-[.75rem] mt-1">{err.name}</p>}
        </div>
        <div>
          <label className={label}>Email</label>
          <input className={field} type="email" placeholder="seu@email.com" value={email} onChange={e => { setEmail(e.target.value); setErr(p => ({ ...p, email: '' })) }} />
          {err.email && <p className="text-[#EF4444] text-[.75rem] mt-1">{err.email}</p>}
        </div>
        <div>
          <label className={label}>CPF ou CNPJ</label>
          <input className={field} placeholder="000.000.000-00" value={cpf} onChange={e => { setCpf(fmtCpfCnpj(e.target.value)); setErr(p => ({ ...p, cpf: '' })) }} maxLength={18} />
          {err.cpf && <p className="text-[#EF4444] text-[.75rem] mt-1">{err.cpf}</p>}
        </div>
      </div>

      <button onClick={next} className={`${btn} mt-6`}>
        Continuar
      </button>

      <div className="flex items-center justify-center gap-4 mt-5 text-[.7rem] text-ajax-black/40">
        <span className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.5L2 3V5.5C2 8 3.8 10 6 11C8.2 10 10 8 10 5.5V3L6 1.5Z" stroke="currentColor" strokeWidth=".9" fill="rgba(94,23,235,.06)"/><path d="M4.2 6L5.4 7.2L7.8 4.8" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Pagamento seguro
        </span>
        <span className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2.5" y="5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth=".9"/><path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth=".9" strokeLinecap="round"/></svg>
          SSL criptografado
        </span>
      </div>
    </>
  )
}

/* ── Step 2 ── */
function StepPayment() {
  const { state, setStep, setBillingType, submitCheckout } = useCheckout()
  const [method, setMethod] = useState<'PIX' | 'BOLETO' | 'CREDIT_CARD'>(state.billingType || 'PIX')

  const [cn, setCn] = useState('')
  const [cnum, setCnum] = useState('')
  const [cexp, setCexp] = useState('')
  const [ccvv, setCcvv] = useState('')
  const [ccpf, setCcpf] = useState('')
  const [ccep, setCcep] = useState('')
  const [ctel, setCtel] = useState('')
  const [cerr, setCerr] = useState<Record<string, string>>({})

  function submit() {
    setBillingType(method)
    const c = state.customerData
    if (!c) return

    if (method === 'CREDIT_CARD') {
      const e: Record<string, string> = {}
      if (!cn.trim()) e.cn = 'Obrigatorio'
      if (cnum.replace(/\D/g, '').length < 13) e.cnum = 'Numero invalido'
      if (cexp.length < 5) e.cexp = 'Invalido'
      if (ccvv.length < 3) e.ccvv = 'Invalido'
      if (ccpf.replace(/\D/g, '').length < 11) e.ccpf = 'CPF invalido'
      if (!ccep.trim()) e.ccep = 'Obrigatorio'
      if (!ctel.trim()) e.ctel = 'Obrigatorio'
      if (Object.keys(e).length) { setCerr(e); return }

      const [m, y] = cexp.split('/')
      submitCheckout({
        ...c,
        billingType: 'CREDIT_CARD',
        creditCard: { holderName: cn, number: cnum.replace(/\D/g, ''), expiryMonth: m, expiryYear: '20' + y, ccv: ccvv },
        creditCardHolderInfo: { name: cn, email: c.email, cpfCnpj: ccpf.replace(/\D/g, ''), postalCode: ccep.replace(/\D/g, ''), addressNumber: '0', phone: ctel.replace(/\D/g, '') },
      })
    } else {
      submitCheckout({ ...c, billingType: method })
    }
  }

  const methods = [
    { id: 'PIX' as const, name: 'PIX', sub: 'Aprovacao instantanea', badge: 'Recomendado', color: '#32BCAD' },
    { id: 'BOLETO' as const, name: 'Boleto', sub: 'Ate 3 dias uteis', badge: null, color: '#5E17EB' },
    { id: 'CREDIT_CARD' as const, name: 'Cartao de Credito', sub: 'Aprovacao imediata', badge: null, color: '#F59E0B' },
  ]

  return (
    <>
      <button onClick={() => setStep('customer')} className="flex items-center gap-1 text-[.8rem] text-ajax-black/60 hover:text-[#5E17EB] bg-transparent border-none cursor-pointer p-0 mb-4 transition-colors uppercase tracking-[.04em] font-bold">
        <SolarIcon icon="solar:arrow-left-linear" size={16} />
        Voltar
      </button>

      {/* Payment method cards — hard-edge, selected = purple border + shadow */}
      <div className="space-y-2 mb-5">
        {methods.map(m => {
          const active = method === m.id
          return (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`w-full flex items-center gap-3 p-3.5 border-2 text-left cursor-pointer transition-all duration-150 bg-white ${
                active
                  ? 'border-[#5E17EB] shadow-[3px_3px_0_rgba(94,23,235,.2)]'
                  : 'border-ajax-black/10 hover:border-ajax-black/20'
              }`}
            >
              {/* Square radio indicator */}
              <div
                className="w-5 h-5 border-2 flex items-center justify-center shrink-0"
                style={{ borderColor: active ? '#5E17EB' : undefined }}
              >
                {active && <div className="w-2.5 h-2.5 bg-[#5E17EB]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[.88rem] font-bold text-[#131313] uppercase tracking-[.03em]">{m.name}</span>
                  {m.badge && (
                    <span className="text-[.6rem] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-[rgba(50,188,173,.1)] text-[#0D9488]">
                      {m.badge}
                    </span>
                  )}
                </div>
                <span className="text-[.75rem] text-ajax-black/40">{m.sub}</span>
              </div>
            </button>
          )
        })}
      </div>

      {method === 'CREDIT_CARD' && (
        <div className="space-y-3 mb-5 p-4 bg-ajax-surface border-2 border-ajax-black/10">
          <p className="text-[.7rem] text-ajax-black/40 flex items-center gap-1.5 mb-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2.5" y="5" width="7" height="5" rx="1" stroke="#5e17eb" strokeWidth=".9"/><path d="M4 5V3.5a2 2 0 014 0V5" stroke="#5e17eb" strokeWidth=".9" strokeLinecap="round"/></svg>
            Dados protegidos e criptografados
          </p>
          <div>
            <label className={label}>Nome no cartao</label>
            <input className={field} placeholder="Como aparece no cartao" value={cn} onChange={e => { setCn(e.target.value); setCerr(p => ({ ...p, cn: '' })) }} />
            {cerr.cn && <p className="text-[#EF4444] text-[.7rem] mt-0.5">{cerr.cn}</p>}
          </div>
          <div>
            <label className={label}>Numero do cartao</label>
            <input className={field} placeholder="0000 0000 0000 0000" value={cnum} onChange={e => { setCnum(fmtCard(e.target.value)); setCerr(p => ({ ...p, cnum: '' })) }} maxLength={19} inputMode="numeric" />
            {cerr.cnum && <p className="text-[#EF4444] text-[.7rem] mt-0.5">{cerr.cnum}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Validade</label>
              <input className={field} placeholder="MM/AA" value={cexp} onChange={e => { setCexp(fmtExp(e.target.value)); setCerr(p => ({ ...p, cexp: '' })) }} maxLength={5} inputMode="numeric" />
              {cerr.cexp && <p className="text-[#EF4444] text-[.7rem] mt-0.5">{cerr.cexp}</p>}
            </div>
            <div>
              <label className={label}>CVV</label>
              <input className={field} placeholder="000" value={ccvv} onChange={e => { setCcvv(e.target.value.replace(/\D/g, '').slice(0, 4)); setCerr(p => ({ ...p, ccvv: '' })) }} maxLength={4} inputMode="numeric" />
              {cerr.ccvv && <p className="text-[#EF4444] text-[.7rem] mt-0.5">{cerr.ccvv}</p>}
            </div>
          </div>
          <div>
            <label className={label}>CPF do titular</label>
            <input className={field} placeholder="000.000.000-00" value={ccpf} onChange={e => { setCcpf(fmtCpfCnpj(e.target.value)); setCerr(p => ({ ...p, ccpf: '' })) }} maxLength={14} inputMode="numeric" />
            {cerr.ccpf && <p className="text-[#EF4444] text-[.7rem] mt-0.5">{cerr.ccpf}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>CEP</label>
              <input className={field} placeholder="00000-000" value={ccep} onChange={e => { setCcep(e.target.value); setCerr(p => ({ ...p, ccep: '' })) }} maxLength={9} inputMode="numeric" />
              {cerr.ccep && <p className="text-[#EF4444] text-[.7rem] mt-0.5">{cerr.ccep}</p>}
            </div>
            <div>
              <label className={label}>Telefone</label>
              <input className={field} placeholder="(00) 00000-0000" value={ctel} onChange={e => { setCtel(e.target.value); setCerr(p => ({ ...p, ctel: '' })) }} maxLength={15} inputMode="tel" />
              {cerr.ctel && <p className="text-[#EF4444] text-[.7rem] mt-0.5">{cerr.ctel}</p>}
            </div>
          </div>
        </div>
      )}

      {state.error && (
        <div className="flex items-start gap-2 p-3 bg-[#FEF2F2] border-2 border-[#FECACA] mb-4">
          <SolarIcon icon="solar:danger-circle-linear" size={16} fill="#EF4444" className="shrink-0 mt-0.5" />
          <p className="text-[#B91C1C] text-[.8rem] leading-snug">{state.error}</p>
        </div>
      )}

      <button onClick={submit} disabled={state.loading} className={btn}>
        {state.loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
            Processando...
          </span>
        ) : `Assinar — ${state.plan?.price || ''}/mes`}
      </button>
    </>
  )
}

/* ── Step 3 ── */
function StepConfirmation() {
  const { state, resetCheckout } = useCheckout()
  const r = state.result
  const [copied, setCopied] = useState(false)

  if (!r) return null

  function copyPix() {
    if (r?.pix?.payload) {
      navigator.clipboard.writeText(r.pix.payload)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const isPix = state.billingType === 'PIX'
  const isBoleto = state.billingType === 'BOLETO'
  const isCard = state.billingType === 'CREDIT_CARD'

  return (
    <div className="text-center">
      {/* Geometric check — square, not circle */}
      <div className="w-16 h-16 mx-auto mb-4 bg-[#ECFDF5] border-2 border-[#A7F3D0] flex items-center justify-center shadow-[2px_2px_0_rgba(5,150,105,.2)]">
        <SolarIcon icon="solar:check-circle-linear" size={28} fill="#10B981" />
      </div>

      <h3 className="text-[1.1rem] font-bold text-[#131313] mb-1 uppercase tracking-[.03em]">
        {isCard ? 'Assinatura ativada!' : 'Quase la!'}
      </h3>
      <p className="text-[.85rem] text-ajax-black/60 mb-5 leading-relaxed">
        {isPix && 'Escaneie o QR Code ou copie o codigo PIX abaixo para concluir o pagamento.'}
        {isBoleto && 'Seu boleto foi gerado. O acesso sera liberado apos a confirmacao do pagamento.'}
        {isCard && 'Pagamento confirmado! Voce ja pode acessar o Chat Ajax.'}
      </p>

      {/* PIX */}
      {isPix && r.pix && (
        <div className="mb-5">
          <div className="bg-white p-4 inline-block mb-4 border-2 border-ajax-black/10">
            <img src={`data:image/png;base64,${r.pix.encodedImage}`} alt="QR Code PIX" className="w-[180px] h-[180px]" />
          </div>

          <div className="relative max-w-[320px] mx-auto">
            <input readOnly value={r.pix.payload} className="w-full bg-ajax-surface border-2 border-ajax-black/10 px-3 py-2.5 pr-20 text-ajax-black/60 text-[.7rem] outline-none font-mono truncate" />
            <button
              onClick={copyPix}
              className={`absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 text-[.72rem] font-semibold border-none cursor-pointer transition-all duration-200 ${
                copied ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#5E17EB] text-white hover:bg-[#4A11C0]'
              }`}
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          {r.pix.expirationDate && (
            <p className="text-[.7rem] text-ajax-black/40 mt-2">Valido ate {new Date(r.pix.expirationDate).toLocaleString('pt-BR')}</p>
          )}
        </div>
      )}

      {/* Boleto */}
      {isBoleto && r.bankSlipUrl && (
        <div className="mb-5">
          <a
            href={r.bankSlipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5E17EB] text-white font-semibold text-[.9rem] no-underline hover:bg-[#4A11C0] transition-colors uppercase tracking-[.04em]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12V4h8v3M9 9l4-4M13 5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Abrir Boleto
          </a>
        </div>
      )}

      {r.invoiceUrl && (
        <a href={r.invoiceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#5E17EB] text-[.82rem] font-medium hover:underline mb-4">
          Ver fatura
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 8l4-4M8 4v3M8 4H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      )}

      {r.cycle && (
        <p className="text-[.75rem] text-ajax-black/60 mt-2 mb-4">
          Ciclo: <span className="font-semibold">{r.cycle === 'YEARLY' ? 'Anual' : 'Mensal'}</span>
        </p>
      )}

      <button onClick={resetCheckout} className="w-full mt-2 py-3 bg-ajax-surface border-2 border-ajax-black/10 text-ajax-black font-semibold text-[.88rem] cursor-pointer hover:bg-ajax-black/10 transition-colors uppercase tracking-[.04em]">
        Fechar
      </button>
    </div>
  )
}

/* ── Steps bar — numbered squares ── */
function Steps({ current }: { current: 'customer' | 'payment' | 'confirmation' }) {
  const all = ['customer', 'payment', 'confirmation'] as const
  const names = ['Dados', 'Pagamento', 'Confirmacao']
  const idx = all.indexOf(current)

  return (
    <div className="flex items-center gap-0 w-full mb-1">
      {all.map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex items-center gap-1.5">
            {/* Numbered square — active = purple fill */}
            <div className={`w-6 h-6 flex items-center justify-center text-[.65rem] font-bold transition-all duration-300 ${
              i < idx ? 'bg-[#5E17EB] text-white' : i === idx ? 'bg-[#5E17EB] text-white shadow-[2px_2px_0_rgba(94,23,235,.3)]' : 'bg-ajax-surface text-ajax-black/40 border border-ajax-black/10'
            }`}>
              {i < idx ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6.5L5 8.5L9 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : i + 1}
            </div>
            <span className={`text-[.72rem] font-medium whitespace-nowrap uppercase tracking-[.04em] ${i === idx ? 'text-ajax-black' : i < idx ? 'text-ajax-black/60' : 'text-ajax-black/40'}`}>{names[i]}</span>
          </div>
          {i < all.length - 1 && (
            <div className={`flex-1 h-px mx-3 transition-colors duration-300 ${i < idx ? 'bg-[#5E17EB]' : 'bg-ajax-black/10'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Modal ── */
export function CheckoutModal() {
  const { state, closeCheckout } = useCheckout()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [state.isOpen])

  useEffect(() => {
    if (!state.isOpen) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCheckout() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [state.isOpen, closeCheckout])

  if (!state.isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 max-sm:items-end max-sm:p-0"
      onClick={e => { if (e.target === overlayRef.current) closeCheckout() }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(3,22,38,.6)] backdrop-blur-sm" />

      {/* Panel — hard-edge, no border-radius */}
      <div
        className="relative w-full max-w-[440px] bg-white max-sm:rounded-none shadow-[6px_6px_0_rgba(0,0,0,0.15)] flex flex-col max-h-[92vh] max-sm:max-h-[94vh] overflow-hidden border-2 border-[#131313]/10"
        style={{ animation: 'ckSlide .3s cubic-bezier(.22,1,.36,1)' }}
      >
        {/* Top bar */}
        <div className="shrink-0 border-b-2 border-ajax-black/10">
          {/* Close button — square */}
          <button
            onClick={closeCheckout}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-ajax-black/40 hover:text-ajax-black hover:bg-ajax-surface cursor-pointer bg-transparent border-none transition-colors z-10"
            aria-label="Fechar"
          >
            <SolarIcon icon="solar:close-circle-linear" size={18} />
          </button>

          <div className="px-6 pt-5 pb-4 max-sm:px-5">
            {state.plan && (
              <div className="flex items-center gap-3 mb-4 pr-8">
                {/* Logo badge — square */}
                <div className="w-9 h-9 bg-[#5E17EB] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="90 210 720 480" fill="white"><path d="M618.89 210.6C682.56 343.7 746.24 476.79 809.9 609.88H588.75L505.17 434.65H449.99L313.9 689.39H90.09L230.28 418.84H496.73L396.71 210.6H618.89Z"/></svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[.9rem] font-bold text-[#131313] leading-tight uppercase tracking-[.03em]">Plano {state.plan.name}</p>
                  <p className="text-[.82rem] text-[#5E17EB] font-semibold">
                    {state.plan.price}<span className="text-ajax-black/40 font-normal">{state.plan.cycle === 'YEARLY' ? '/mes (anual)' : '/mes'}</span>
                  </p>
                </div>
              </div>
            )}
            <Steps current={state.step} />
          </div>
        </div>

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 max-sm:px-5">
          {state.step === 'customer' && <StepCustomer />}
          {state.step === 'payment' && <StepPayment />}
          {state.step === 'confirmation' && <StepConfirmation />}
        </div>
      </div>

      <style>{`
        @keyframes ckSlide {
          from { opacity: 0; transform: translateY(16px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
