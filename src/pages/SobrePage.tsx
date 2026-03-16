import { Container } from '../components/ui/Container'

export default function SobrePage() {
  return (
    <>
      {/* Hero with parallelogram background element */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        {/* Geometric parallelogram accent */}
        <div
          className="absolute top-0 right-0 w-[600px] h-full bg-[#5E17EB]/04 pointer-events-none"
          style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-[#5E17EB]/04 pointer-events-none"
          style={{ clipPath: 'polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
        />

        <Container>
          <div className="text-center max-w-[680px] mx-auto relative">
            <span className="inline-block text-[.72rem] font-bold uppercase tracking-[.12em] text-[#5E17EB] mb-4 px-3 py-1.5 border-2 border-[#5E17EB]/30 bg-[#5E17EB]/05">
              Sobre
            </span>
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-[800] text-ajax-black mb-4 uppercase tracking-[.02em]">
              Sobre o <span className="serif-i">Chat Ajax</span>
            </h1>
            <p className="text-ajax-black/70 text-lg leading-[1.7]">
              Plataforma de atendimento multicanal com IA, criada para o mercado brasileiro. Centralize todos os seus canais, automatize com inteligencia e venda mais.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-[#F0F0F5]">
        <Container>
          <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1">
            {/* Missao card — hard edge */}
            <div className="bg-white border-2 border-[#131313]/10 p-8 relative" style={{ boxShadow: '4px 4px 0 rgba(19,19,19,.06)' }}>
              {/* Purple accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#5E17EB]" />
              <h2 className="text-[1.4rem] font-[800] text-ajax-black mb-4 uppercase tracking-[.04em]">
                Nossa <span className="serif-i">missao</span>
              </h2>
              <p className="text-ajax-black/70 leading-[1.7] mb-4">
                Democratizar o atendimento profissional para empresas brasileiras. Acreditamos que toda empresa, independente do tamanho, merece ferramentas de atendimento de nivel enterprise.
              </p>
              <p className="text-ajax-black/70 leading-[1.7]">
                O Chat Ajax centraliza WhatsApp, Instagram, TikTok, Email e mais em uma unica tela, com IA integrada que responde, qualifica e vende 24 horas por dia.
              </p>
            </div>

            {/* Por que card — hard edge */}
            <div className="bg-white border-2 border-[#131313]/10 p-8 relative" style={{ boxShadow: '4px 4px 0 rgba(19,19,19,.06)' }}>
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#5E17EB]" />
              <h2 className="text-[1.4rem] font-[800] text-ajax-black mb-4 uppercase tracking-[.04em]">
                Por que <span className="serif-i">Chat Ajax?</span>
              </h2>
              <ul className="space-y-3">
                {[
                  'API Oficial do WhatsApp — sem risco de ban',
                  'Tecnologia open source robusta, usada por 20.000+ empresas no mundo',
                  'Servidores no Brasil — LGPD compliant',
                  'Suporte humano em portugues',
                  'Captain AI — IA que entende contexto e responde com precisao',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-ajax-black/70">
                    <span className="w-[18px] h-[18px] bg-[#5E17EB] flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5.5L4 7.5L8 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats section — hard-edge cards */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-w-[900px] mx-auto">
            {[
              { value: '523+', label: 'Empresas ativas' },
              { value: '2M+', label: 'Mensagens por mes' },
              { value: '99.9%', label: 'Uptime garantido' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center border-2 border-[#131313]/10 py-8 px-6 relative"
                style={{ boxShadow: '4px 4px 0 rgba(19,19,19,.06)' }}
              >
                {/* Corner triangle */}
                <div
                  className="absolute top-0 right-0 w-0 h-0"
                  style={{
                    borderStyle: 'solid',
                    borderWidth: '0 20px 20px 0',
                    borderColor: 'transparent #5E17EB transparent transparent',
                  }}
                />
                <div className="text-[2.4rem] font-[800] text-[#5E17EB] mb-1">{stat.value}</div>
                <div className="text-ajax-black/70 text-[.9rem] uppercase tracking-[.04em] font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-[#F0F0F5] relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-full bg-[#5E17EB]/05 pointer-events-none"
          style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
        <Container>
          <div className="text-center max-w-[600px] mx-auto relative">
            <h2 className="text-[1.6rem] font-[800] text-ajax-black mb-4 uppercase tracking-[.02em]">
              Pronto para <span className="serif-i">comecar?</span>
            </h2>
            <p className="text-ajax-black/70 leading-[1.7] mb-6">
              Teste o Chat Ajax gratuitamente por 14 dias. Sem cartao de credito, sem compromisso.
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
