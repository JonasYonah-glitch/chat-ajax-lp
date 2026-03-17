import { Container } from '../components/ui/Container'

const systems = [
  { name: 'Plataforma Web', status: 'operational' as const },
  { name: 'API de Integracao', status: 'operational' as const },
  { name: 'WhatsApp (API Oficial)', status: 'operational' as const },
  { name: 'Instagram / Facebook', status: 'operational' as const },
  { name: 'Email (SMTP/IMAP)', status: 'operational' as const },
  { name: 'Webhooks & Automacoes', status: 'operational' as const },
]

const statusConfig = {
  operational: { label: 'Operacional', color: '#059669', bg: 'rgba(5,150,105,.08)', dot: '#34D399' },
  degraded: { label: 'Desempenho degradado', color: '#D97706', bg: 'rgba(217,119,6,.08)', dot: '#FBBF24' },
  outage: { label: 'Fora do ar', color: '#DC2626', bg: 'rgba(220,38,38,.08)', dot: '#F87171' },
}

const recentEvents = [
  {
    date: '05 Mar 2026',
    title: 'Manutencao programada concluida',
    description: 'Atualizacao de infraestrutura realizada com sucesso. Nenhum tempo de inatividade.',
    type: 'maintenance' as const,
  },
  {
    date: '28 Fev 2026',
    title: 'Melhoria de desempenho na plataforma',
    description: 'Otimizacao no tempo de resposta geral. Latencia reduzida em 40%.',
    type: 'improvement' as const,
  },
  {
    date: '20 Fev 2026',
    title: 'Atualizacao de seguranca',
    description: 'Atualizacao de certificados TLS e patches de seguranca aplicados.',
    type: 'maintenance' as const,
  },
]

const eventTypeConfig = {
  maintenance: { label: 'Manutencao', color: '#5e17eb' },
  incident: { label: 'Incidente', color: '#DC2626' },
  improvement: { label: 'Melhoria', color: '#059669' },
}

export default function StatusPage() {
  const allOperational = systems.every(s => s.status === 'operational')

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-full bg-[#5E17EB]/04 pointer-events-none"
          style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
        <Container>
          <div className="max-w-[760px] mx-auto">
            <span className="inline-block text-[.72rem] font-bold uppercase tracking-[.12em] text-[#5E17EB] mb-4 px-3 py-1.5 border-2 border-[#5E17EB]/30 bg-[#5E17EB]/05">
              Status
            </span>
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-[800] text-ajax-black mb-4 uppercase tracking-[.02em]">
              Status do <span className="serif-i">Sistema</span>
            </h1>

            {/* Overall status banner — hard edge */}
            <div className={`p-5 mb-10 flex items-center gap-4 border-2 relative overflow-hidden ${
              allOperational
                ? 'bg-[rgba(5,150,105,.06)] border-[rgba(5,150,105,.3)]'
                : 'bg-[rgba(217,119,6,.06)] border-[rgba(217,119,6,.3)]'
            }`}>
              {/* Accent line */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${allOperational ? 'bg-[#059669]' : 'bg-[#D97706]'}`} />
              <div className="relative">
                <div className={`w-3 h-3 shrink-0 ${allOperational ? 'bg-[#34D399]' : 'bg-[#FBBF24]'}`}>
                  <div className={`w-3 h-3 animate-ping absolute inset-0 ${allOperational ? 'bg-[#34D399]' : 'bg-[#FBBF24]'}`} style={{ animationDuration: '2s' }} />
                </div>
              </div>
              <div>
                <span className={`font-[800] text-[1rem] uppercase tracking-[.04em] ${allOperational ? 'text-[#059669]' : 'text-[#D97706]'}`}>
                  {allOperational ? 'Todos os sistemas operacionais' : 'Alguns sistemas com problemas'}
                </span>
                <p className="text-ajax-black/60 text-[.8rem] mt-0.5">Atualizado em tempo real</p>
              </div>
            </div>

            {/* System list — hard edge */}
            <div className="border-2 border-[#131313]/10 overflow-hidden mb-12" style={{ boxShadow: '4px 4px 0 rgba(19,19,19,.06)' }}>
              {systems.map((sys, i) => {
                const cfg = statusConfig[sys.status]
                return (
                  <div
                    key={sys.name}
                    className={`flex items-center justify-between px-5 py-4 ${
                      i < systems.length - 1 ? 'border-b border-[rgba(0,0,0,.06)]' : ''
                    } hover:bg-[#FAFAFA] transition-colors`}
                  >
                    <span className="text-ajax-black font-medium text-[.9rem]">{sys.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[.78rem] font-bold uppercase tracking-[.04em]" style={{ color: cfg.color }}>{cfg.label}</span>
                      {/* Square status dot */}
                      <div className="w-2 h-2" style={{ backgroundColor: cfg.dot }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Uptime stats — hard-edge cards */}
            <div className="grid grid-cols-3 gap-6 mb-12 max-sm:grid-cols-1">
              {[
                { value: '99.98%', label: 'Uptime (30 dias)', color: '#059669' },
                { value: '45ms', label: 'Latencia media', color: '#5E17EB' },
                { value: '0', label: 'Incidentes (30 dias)', color: '#131313' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#F0F0F5] border-2 border-[#131313]/10 p-5 text-center relative"
                  style={{ boxShadow: '2px 2px 0 rgba(19,19,19,.06)' }}
                >
                  <div
                    className="absolute top-0 right-0 w-0 h-0"
                    style={{
                      borderStyle: 'solid',
                      borderWidth: '0 16px 16px 0',
                      borderColor: `transparent ${stat.color} transparent transparent`,
                    }}
                  />
                  <div className="text-[1.8rem] font-[800]" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-ajax-black/60 text-[.8rem] mt-1 uppercase tracking-[.04em] font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent events */}
            <h2 className="text-[1.3rem] font-[800] text-ajax-black mb-5 uppercase tracking-[.04em]">Eventos Recentes</h2>
            <div className="flex flex-col gap-4">
              {recentEvents.map((event, i) => {
                const cfg = eventTypeConfig[event.type]
                return (
                  <div
                    key={i}
                    className="bg-[#F0F0F5] border-2 border-[#131313]/10 p-5 relative"
                    style={{ boxShadow: '2px 2px 0 rgba(19,19,19,.04)' }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: cfg.color }} />
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-[.65rem] font-[800] uppercase tracking-wider px-2 py-0.5 border"
                        style={{ color: cfg.color, backgroundColor: cfg.color + '12', borderColor: cfg.color + '30' }}
                      >
                        {cfg.label}
                      </span>
                      <span className="text-ajax-black/60 text-[.78rem] uppercase tracking-[.04em]">{event.date}</span>
                    </div>
                    <h3 className="text-ajax-black font-bold text-[.95rem] mb-1 uppercase tracking-[.02em]">{event.title}</h3>
                    <p className="text-ajax-black/70 text-[.85rem] leading-[1.6]">{event.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
