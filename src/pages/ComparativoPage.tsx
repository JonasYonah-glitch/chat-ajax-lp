import { Container } from '../components/ui/Container'

interface CompareRow {
  feature: string
  ajax: string | boolean
  manychat: string | boolean
  zendesk: string | boolean
}

const comparison: CompareRow[] = [
  { feature: 'WhatsApp API Oficial', ajax: true, manychat: true, zendesk: true },
  { feature: 'Instagram DM', ajax: true, manychat: true, zendesk: false },
  { feature: 'TikTok DM + Shop', ajax: true, manychat: false, zendesk: false },
  { feature: 'Telegram', ajax: true, manychat: false, zendesk: false },
  { feature: 'Facebook Messenger', ajax: true, manychat: true, zendesk: true },
  { feature: 'Email integrado', ajax: true, manychat: false, zendesk: true },
  { feature: 'SMS', ajax: true, manychat: true, zendesk: true },
  { feature: 'LINE', ajax: true, manychat: false, zendesk: false },
  { feature: 'Website Live Chat', ajax: true, manychat: false, zendesk: true },
  { feature: 'IA nativa (sem integração externa)', ajax: true, manychat: false, zendesk: false },
  { feature: 'CRM integrado com Kanban', ajax: true, manychat: false, zendesk: false },
  { feature: 'FlowBuilder (automação visual)', ajax: true, manychat: true, zendesk: false },
  { feature: 'SLA e Audit Logs', ajax: true, manychat: false, zendesk: true },
  { feature: 'Servidores no Brasil (LGPD)', ajax: true, manychat: false, zendesk: false },
  { feature: 'Suporte em portugues', ajax: true, manychat: false, zendesk: 'Limitado' },
  { feature: 'Teste gratis sem cartao', ajax: '14 dias', manychat: 'Limitado', zendesk: '14 dias' },
  { feature: 'Preco inicial', ajax: 'R$497/mes', manychat: 'US$15/mes*', zendesk: 'US$55/agente*' },
]

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return (
    <span className="w-6 h-6 bg-[rgba(5,150,105,.1)] border border-[rgba(5,150,105,.3)] flex items-center justify-center mx-auto">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 10L11 4.5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  )
  if (value === false) return (
    <span className="w-6 h-6 bg-[rgba(248,113,113,.08)] border border-[rgba(248,113,113,.3)] flex items-center justify-center mx-auto">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 4L10 10M10 4L4 10" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" /></svg>
    </span>
  )
  return <span className="text-ajax-black/70 text-[.82rem]">{value}</span>
}

export default function ComparativoPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-full bg-[#5E17EB]/04 pointer-events-none"
          style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
        <Container>
          <div className="text-center max-w-[780px] mx-auto relative">
            <span className="inline-block text-[.72rem] font-bold uppercase tracking-[.12em] text-[#5E17EB] mb-4 px-3 py-1.5 border-2 border-[#5E17EB]/30 bg-[#5E17EB]/05">
              Comparativo
            </span>
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-[800] text-ajax-black mb-4 uppercase tracking-[.02em]">
              Chat Ajax vs <span className="serif-i">ManyChat</span> vs Zendesk
            </h1>
            <p className="text-ajax-black/70 text-lg leading-[1.7]">
              Comparativo completo entre as principais plataformas de atendimento omnichannel e automação. Veja qual oferece mais canais, IA integrada e melhor custo-beneficio para o mercado brasileiro.
            </p>
          </div>
        </Container>
      </section>

      {/* Tabela comparativa */}
      <section className="py-16 bg-[#F0F0F5]">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full max-w-[900px] mx-auto border-collapse bg-white border-2 border-[#131313]/10" style={{ boxShadow: '4px 4px 0 rgba(19,19,19,.06)' }}>
              <thead>
                <tr>
                  <th className="text-left p-4 text-[.75rem] font-bold uppercase tracking-[.08em] text-ajax-black/60 border-b-2 border-[#131313]/10 w-[35%]">Funcionalidade</th>
                  <th className="text-center p-4 text-[.75rem] font-bold uppercase tracking-[.08em] bg-[#5E17EB]/05 border-b-2 border-[#5E17EB]/20 text-[#5E17EB] w-[21%]">Chat Ajax</th>
                  <th className="text-center p-4 text-[.75rem] font-bold uppercase tracking-[.08em] text-ajax-black/60 border-b-2 border-[#131313]/10 w-[22%]">ManyChat</th>
                  <th className="text-center p-4 text-[.75rem] font-bold uppercase tracking-[.08em] text-ajax-black/60 border-b-2 border-[#131313]/10 w-[22%]">Zendesk</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F8FA]'}>
                    <td className="p-4 text-[.85rem] font-semibold text-ajax-black border-b border-[#131313]/06">{row.feature}</td>
                    <td className="p-4 text-center border-b border-[#131313]/06 bg-[#5E17EB]/03"><CellValue value={row.ajax} /></td>
                    <td className="p-4 text-center border-b border-[#131313]/06"><CellValue value={row.manychat} /></td>
                    <td className="p-4 text-center border-b border-[#131313]/06"><CellValue value={row.zendesk} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-ajax-black/50 text-[.75rem] mt-4 max-w-[900px] mx-auto">
            * Precos do ManyChat e Zendesk em dolar americano, sujeitos a variacao cambial. ManyChat cobra por contato, Zendesk cobra por agente. Comparativo atualizado em marco/2026.
          </p>
        </Container>
      </section>

      {/* Por que migrar */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-[1.4rem] font-[800] text-ajax-black mb-6 uppercase tracking-[.04em]">
              Por que migrar para o <span className="serif-i">Chat Ajax?</span>
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { title: 'Mais canais que o ManyChat', desc: 'ManyChat foca em Instagram e WhatsApp. O Chat Ajax integra 10+ canais incluindo TikTok, Telegram, LINE, Email e SMS — tudo na mesma inbox.' },
                { title: 'IA nativa, nao plugin', desc: 'Captain AI vem integrado: sugere respostas, resume conversas, classifica sentimento e resolve tickets automaticamente. Sem precisar conectar OpenAI por fora.' },
                { title: 'Feito para o Brasil', desc: 'Servidores no Brasil, LGPD compliant, suporte em portugues, pagamento em reais (PIX, boleto, cartao). Sem depender de dolar.' },
                { title: 'CRM que ja vem junto', desc: 'Pipeline Kanban, historico de contato, tags e campos customizados. Nao precisa pagar HubSpot ou Pipedrive separado.' },
                { title: 'Migracao assistida', desc: 'Nossa equipe migra seus contatos, historico e automaçoes do ManyChat, Zendesk, Intercom ou qualquer outra plataforma sem perda de dados.' },
              ].map((item, i) => (
                <div key={i} className="bg-white border-2 border-[#131313]/10 p-6 relative" style={{ boxShadow: '3px 3px 0 rgba(19,19,19,.05)' }}>
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#5E17EB]" />
                  <h3 className="text-[.95rem] font-[800] text-ajax-black mb-1 uppercase tracking-[.04em]">{item.title}</h3>
                  <p className="text-ajax-black/70 text-[.85rem] leading-[1.6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F0F0F5] relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-full bg-[#5E17EB]/05 pointer-events-none"
          style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
        <Container>
          <div className="text-center max-w-[600px] mx-auto relative">
            <h2 className="text-[1.6rem] font-[800] text-ajax-black mb-4 uppercase tracking-[.02em]">
              Pronto para <span className="serif-i">migrar?</span>
            </h2>
            <p className="text-ajax-black/70 leading-[1.7] mb-6">
              Teste gratis por 14 dias. Migracao assistida do ManyChat, Zendesk ou qualquer plataforma.
            </p>
            <a
              href="/#start"
              className="inline-flex items-center justify-center gap-2 py-4 px-10 font-bold text-base no-underline bg-[#5E17EB] text-white uppercase tracking-[.06em] transition-all duration-[250ms] hover:bg-[#4A11C0] hover:-translate-y-px hover:shadow-[4px_4px_0_rgba(94,23,235,.3)]"
              style={{ boxShadow: '2px 2px 0 rgba(94,23,235,0.3)' }}
            >
              Teste Gratis por 14 Dias
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
