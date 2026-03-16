import type { Channel, BubbleAttachment } from '../../data/channels'
import {
  WhatsAppIcon,
  InstagramIcon,
  TikTokIcon,
  MessengerIcon,
  TelegramIcon,
  EmailIcon,
  SmsIcon,
  LineIcon,
  GoogleIcon,
  PixIcon,
  DressIcon,
  VideoIcon,
  PackageIcon,
  BotIcon,
  TicketIcon,
  CalendarIcon,
  ClipboardIcon,
  ChartBarIcon,
} from '../../icons'

type IconComp = React.ComponentType<{ className?: string; size?: number; fill?: string }>

const iconMap: Record<string, IconComp> = {
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  messenger: MessengerIcon,
  telegram: TelegramIcon,
  email: EmailIcon,
  sms: SmsIcon,
  line: LineIcon,
  google: GoogleIcon,
}

const attachmentIconMap: Record<string, IconComp> = {
  pix: PixIcon,
  dress: DressIcon,
  video: VideoIcon,
  package: PackageIcon,
  bot: BotIcon,
  ticket: TicketIcon,
  calendar: CalendarIcon,
  clipboard: ClipboardIcon,
  chartbar: ChartBarIcon,
}

function AttachmentCard({ att }: { att: BubbleAttachment }) {
  const AttIcon = attachmentIconMap[att.icon]
  return (
    <div
      className="mt-2 overflow-hidden border-2"
      style={{ borderColor: att.accent + '30', boxShadow: `2px 2px 0 ${att.accent}20` }}
    >
      <div className="flex items-center gap-2.5 px-3 py-2.5" style={{ background: `${att.accent}0A` }}>
        <div
          className="w-9 h-9 flex items-center justify-center shrink-0 border"
          style={{ background: `${att.accent}18`, borderColor: att.accent + '30' }}
        >
          {AttIcon ? <AttIcon size={18} fill={att.accent || '#fff'} /> : null}
        </div>
        <div className="min-w-0">
          <p className="text-[.75rem] font-[700] text-white leading-tight truncate">{att.title}</p>
          {att.subtitle && (
            <p className="text-[.65rem] text-[rgba(255,255,255,.5)] leading-tight mt-0.5 truncate">{att.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}

interface ChannelCardProps {
  channel: Channel
}

export function ChannelCard({ channel }: ChannelCardProps) {
  const IconComponent = iconMap[channel.iconName]
  const outColor = channel.bubbleColor || channel.iconColor

  return (
    <div className="group grid grid-cols-2 max-lg:grid-cols-1 bg-white overflow-hidden border-2 border-[#131313]/10 transition-all duration-300 hover:border-[#5E17EB] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#5E17EB] relative">
      {/* Corner triangle accent */}
      <div
        className="absolute top-0 right-0 w-0 h-0 z-[1] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          borderStyle: 'solid',
          borderWidth: '0 32px 32px 0',
          borderColor: 'transparent #5E17EB transparent transparent',
        }}
      />

      {/* Left: Content */}
      <div className="p-8 max-md:p-6 flex flex-col justify-center relative">
        {/* Purple accent line on left side */}
        <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-[#5E17EB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon */}
        <div
          className="w-[48px] h-[48px] flex items-center justify-center mb-4 border-2 border-transparent group-hover:border-[#5E17EB]/20 transition-all duration-300"
          style={{ backgroundColor: channel.iconBg }}
        >
          {IconComponent && (
            <IconComponent
              size={24}
              fill={channel.iconColor}
              className="transition-all duration-300 group-hover:brightness-110"
            />
          )}
        </div>

        {/* Tag */}
        {channel.tag && (
          <span
            className="inline-block text-[.68rem] font-bold uppercase tracking-[.08em] px-2.5 py-1 mb-3 self-start border"
            style={{
              color: channel.tag.color,
              backgroundColor: channel.tag.bg,
              borderColor: channel.tag.color + '40',
            }}
          >
            {channel.tag.label}
          </span>
        )}

        {/* Name */}
        <h3 className="text-[1.25rem] font-[800] text-[#131313] uppercase mb-2 tracking-[.04em]">
          {channel.name}
        </h3>

        {/* Description */}
        <p className="text-[.88rem] text-ajax-black/70 leading-[1.7]">
          {channel.description}
        </p>
      </div>

      {/* Right: Chat bubbles */}
      <div
        className="p-6 max-md:p-5 flex flex-col justify-center gap-3 min-h-[260px] max-md:min-h-0 bg-ajax-surface"
      >
        {channel.bubbles.map((bubble, i) => (
          <div
            key={i}
            className={`flex ${bubble.type === 'out' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] border-2 ${
                bubble.type === 'out'
                  ? 'text-white border-transparent'
                  : 'bg-white border-[rgba(0,0,0,.08)] text-ajax-black border-l-[#5E17EB]'
              }`}
              style={{
                ...(bubble.type === 'out' ? { backgroundColor: outColor } : {}),
              }}
            >
              <div className="px-4 py-2.5 text-[.82rem] leading-[1.5]">
                {bubble.text}
              </div>
              {bubble.attachment && <AttachmentCard att={bubble.attachment} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
