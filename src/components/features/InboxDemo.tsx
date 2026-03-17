import { WhatsAppIcon, InstagramIcon, EmailIcon, TelegramIcon, TikTokIcon } from '../../icons'

const rows = [
  { name: 'Maria Silva', icon: WhatsAppIcon, iconColor: '#25D366', avatarBg: '#25D366', msg: 'Quero saber sobre o plano empresarial...', time: '2min', badge: 3, active: true },
  { name: '@loja.premium', icon: InstagramIcon, iconColor: '#E1306C', avatarBg: '#E1306C', msg: 'Respondeu ao seu story: Que incrivel!', time: '5min', badge: 1, active: false },
  { name: 'joao@empresa.com', icon: EmailIcon, iconColor: '#3B82F6', avatarBg: '#3B82F6', msg: 'Re: Proposta comercial - Aprovado!', time: '12min', active: false },
  { name: 'Carlos Mendes', icon: TelegramIcon, iconColor: '#26A5E4', avatarBg: '#26A5E4', msg: 'Como integro com meu sistema?', time: '18min', badge: 2, active: false },
  { name: '@influencer.top', icon: TikTokIcon, iconColor: '#fff', avatarBg: '#000', msg: 'Vi seu produto, quero parceria!', time: '25min', badge: 1, active: false },
]

export function InboxDemo() {
  return (
    <div className="w-full border-2 border-[#131313]/10">
      {rows.map((row, i) => {
        const Icon = row.icon
        return (
          <div
            key={i}
            className={`flex items-center gap-3 py-3.5 px-4 border-b border-[rgba(0,0,0,.06)] transition-colors duration-200 hover:bg-ajax-surface cursor-pointer ${
              row.active ? 'border-l-[3px] border-l-[#5E17EB] bg-[rgba(94,23,235,.04)]' : 'border-l-[3px] border-l-transparent'
            }`}
          >
            {/* Avatar — square initial circle, no external request */}
            <div
              className="w-9 h-9 shrink-0 flex items-center justify-center border border-[rgba(0,0,0,.08)] text-white text-sm font-bold select-none"
              style={{ background: row.avatarBg }}
            >
              {row.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[.85rem] font-semibold text-ajax-black flex items-center gap-1.5">
                {row.name}
                {/* Channel badge with parallelogram clip */}
                <span
                  className="inline-flex items-center px-1.5 py-0.5"
                  style={{
                    clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
                    backgroundColor: row.iconColor + '22',
                  }}
                >
                  <Icon size={10} fill={row.iconColor} />
                </span>
              </div>
              <div className="text-[.75rem] text-ajax-black/60 whitespace-nowrap overflow-hidden text-ellipsis">{row.msg}</div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[.65rem] text-gray-500 uppercase tracking-[.04em]">{row.time}</div>
              {row.badge && (
                <div className="w-[18px] h-[18px] bg-[#5E17EB] text-white text-[.6rem] flex items-center justify-center ml-auto mt-1 font-bold">
                  {row.badge}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
