import { Container } from '../components/ui/Container'

const channels = [
  { name: 'WhatsApp', desc: 'API Oficial Cloud, Twilio, 360dialog — sem risco de ban' },
  { name: 'Instagram DM', desc: 'Responda DMs, comentarios e stories em uma unica inbox' },
  { name: 'TikTok', desc: 'DMs e TikTok Shop — integração exclusiva no Brasil' },
  { name: 'Facebook Messenger', desc: 'Mensagens da pagina e anuncios direto na plataforma' },
  { name: 'Telegram', desc: 'Bots e grupos com automação completa' },
  { name: 'Email', desc: 'IMAP, SMTP e Microsoft 365 integrados' },
  { name: 'SMS', desc: 'Envio e recebimento via Twilio' },
  { name: 'LINE', desc: 'Suporte ao mercado asiatico e global' },
  { name: 'Google Business', desc: 'Mensagens do Google Maps e Busca' },
  { name: 'Website Live Chat', desc: 'Widget customizavel para seu site' },
]

const benefits = [
  { title: 'Inbox Unificada', desc: 'Todas as conversas de todos os canais em uma unica tela. Nenhuma mensagem perdida, nenhum cliente esquecido.' },
  { title: 'Captain AI', desc: 'IA que responde automaticamente, resume conversas, classifica sentimento e resolve ate 70% dos tickets sem humano.' },
  { title: 'CRM Integrado', desc: 'Pipeline Kanban, tags, campos customizados e historico completo do cliente. Sem precisar de ferramenta separada.' },
  { title: 'Automação Total', desc: 'Chatbots, respostas automaticas, macros, regras de roteamento e SLA. Configure uma vez, funciona 24/7.' },
  { title: 'Relatorios em Tempo Real', desc: 'CSAT, tempo de resposta, volume por canal, performance de agentes. Dados para tomar decisoes.' },
  { title: 'LGPD Compliant', desc: 'Criptografia TLS 1.3 + AES-256, servidores no Brasil, controle de consentimento e anonimização.' },
]

export default function OmnichannelPage() {
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
              Plataforma Omnichannel
            </span>
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-[800] text-ajax-black mb-4 uppercase tracking-[.02em]">
              Plataforma <span className="serif-i">Omnichannel</span> com IA para Atendimento ao Cliente
            </h1>
            <p className="text-ajax-black/70 text-lg leading-[1.7]">
              Centralize WhatsApp, Instagram, TikTok, Telegram, Email e mais 5 canais em uma unica tela. Automação com inteligência artificial que responde, vende e encanta seus clientes 24 horas por dia.
            </p>
          </div>
        </Container>
      </section>

      {/* O que e omnichannel */}
      <section className="py-16 bg-[#F0F0F5]">
        <Container>
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-[1.4rem] font-[800] text-ajax-black mb-4 uppercase tracking-[.04em]">
              O que e uma <span className="serif-i">Plataforma Omnichannel?</span>
            </h2>
            <p className="text-ajax-black/70 leading-[1.7] mb-4">
              Uma plataforma omnichannel conecta todos os canais de comunicação da sua empresa em um unico lugar. Em vez de alternar entre WhatsApp Web, Instagram, email e outros apps, seus agentes veem todas as conversas em uma inbox unificada.
            </p>
            <p className="text-ajax-black/70 leading-[1.7] mb-4">
              O Chat Ajax vai alem de uma simples integracao: com inteligência artificial nativa (Captain AI), automação de respostas e CRM integrado, sua equipe resolve mais tickets em menos tempo — enquanto a IA cuida dos atendimentos repetitivos automaticamente.
            </p>
            <p className="text-ajax-black/70 leading-[1.7]">
              Diferente de ferramentas como ManyChat que focam apenas em Instagram e WhatsApp, o Chat Ajax oferece uma experiência verdadeiramente omnichannel com 10+ canais, incluindo TikTok, Telegram, LINE e Voice.
            </p>
          </div>
        </Container>
      </section>

      {/* Canais suportados */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-[1.4rem] font-[800] text-ajax-black mb-8 uppercase tracking-[.04em] text-center">
            10+ <span className="serif-i">Canais</span> em Uma Tela
          </h2>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 max-w-[900px] mx-auto">
            {channels.map((ch, i) => (
              <div key={i} className="bg-white border-2 border-[#131313]/10 p-5 relative" style={{ boxShadow: '3px 3px 0 rgba(19,19,19,.05)' }}>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#5E17EB]" />
                <h3 className="text-[.95rem] font-[800] text-ajax-black uppercase tracking-[.04em] mb-1">{ch.name}</h3>
                <p className="text-ajax-black/70 text-[.85rem] leading-[1.6]">{ch.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-[#F0F0F5]">
        <Container>
          <h2 className="text-[1.4rem] font-[800] text-ajax-black mb-8 uppercase tracking-[.04em] text-center">
            Por que escolher o <span className="serif-i">Chat Ajax?</span>
          </h2>
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-w-[1000px] mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white border-2 border-[#131313]/10 p-6 relative" style={{ boxShadow: '4px 4px 0 rgba(19,19,19,.06)' }}>
                <div
                  className="absolute top-0 right-0 w-0 h-0"
                  style={{
                    borderStyle: 'solid',
                    borderWidth: '0 20px 20px 0',
                    borderColor: 'transparent #5E17EB transparent transparent',
                  }}
                />
                <h3 className="text-[.95rem] font-[800] text-ajax-black mb-2 uppercase tracking-[.04em]">{b.title}</h3>
                <p className="text-ajax-black/70 text-[.85rem] leading-[1.6]">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-full bg-[#5E17EB]/05 pointer-events-none"
          style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
        <Container>
          <div className="text-center max-w-[600px] mx-auto relative">
            <h2 className="text-[1.6rem] font-[800] text-ajax-black mb-4 uppercase tracking-[.02em]">
              Teste a plataforma <span className="serif-i">omnichannel</span> mais completa do Brasil
            </h2>
            <p className="text-ajax-black/70 leading-[1.7] mb-6">
              14 dias gratis, sem cartao de credito. Conecte seus canais em minutos.
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
