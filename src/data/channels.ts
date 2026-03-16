export interface BubbleAttachment {
  icon: string
  title: string
  subtitle?: string
  accent?: string
}

export interface ChannelBubble {
  type: 'in' | 'out'
  text: string
  attachment?: BubbleAttachment
}

export interface Channel {
  id: string
  name: string
  iconName: string
  iconColor: string
  iconBg: string
  bubbleColor?: string
  tag?: { label: string; color: string; bg: string }
  description: string
  bubbles: ChannelBubble[]
}

export const channels: Channel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    iconName: 'whatsapp',
    iconColor: '#25D366',
    iconBg: 'rgba(37,211,102,.12)',
    tag: { label: 'Principal', color: '#25D366', bg: 'rgba(37,211,102,.1)' },
    description:
      'API Oficial Cloud, Twilio ou 360dialog. Mensagens de template, midia, botoes e listas.',
    bubbles: [
      { type: 'in', text: 'Oi, quanto custa o plano Pro?' },
      { type: 'out', text: 'Ola! O Pro sai por R$197/mes com IA inclusa' },
      { type: 'in', text: 'Aceita PIX?' },
      {
        type: 'out',
        text: 'Sim! Aqui esta seu QR Code:',
        attachment: {
          icon: 'pix',
          title: 'PIX Copia e Cola',
          subtitle: 'R$ 197,00 — Expira em 30 min',
          accent: '#25D366',
        },
      },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    iconName: 'instagram',
    iconColor: '#E1306C',
    iconBg: 'rgba(225,48,108,.12)',
    tag: { label: 'Popular', color: '#E1306C', bg: 'rgba(225,48,108,.1)' },
    description:
      'DMs, Stories replies e comentarios. Responda direto da inbox unificada sem trocar de app.',
    bubbles: [
      { type: 'in', text: 'Vi o produto nos Stories, ainda tem?' },
      {
        type: 'out',
        text: 'Tem sim! Olha so:',
        attachment: {
          icon: 'dress',
          title: 'Vestido Floral Collection',
          subtitle: 'R$ 289,90 — Frete gratis',
          accent: '#E1306C',
        },
      },
      { type: 'in', text: 'Quero 2 unidades!' },
      { type: 'out', text: 'Pedido #1847 criado! Confere o resumo no email' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    iconName: 'tiktok',
    iconColor: '#ffffff',
    iconBg: 'rgba(255,255,255,.08)',
    bubbleColor: '#EE1D52',
    tag: { label: 'Novo v4.9', color: '#7B4FE0', bg: 'rgba(123,79,224,.12)' },
    description:
      'Receba mensagens do TikTok Shop e DMs. Atenda a geracao Z onde ela esta.',
    bubbles: [
      { type: 'in', text: 'Vi no TikTok, como compro?' },
      {
        type: 'out',
        text: 'Esse aqui ne? Arrasta pra cima!',
        attachment: {
          icon: 'video',
          title: 'Video: Skincare Routine',
          subtitle: '2.3M views — 45K likes',
          accent: '#EE1D52',
        },
      },
      { type: 'in', text: 'Tem cupom de desconto?' },
      { type: 'out', text: 'Use TIKTOK10 pra 10% off! Corre que expira hoje' },
    ],
  },
  {
    id: 'messenger',
    name: 'Messenger',
    iconName: 'messenger',
    iconColor: '#006AFF',
    iconBg: 'rgba(0,106,255,.12)',
    description:
      'Facebook Messenger integrado. Gerencie paginas e conversas automaticas com chatbot.',
    bubbles: [
      { type: 'in', text: 'Onde esta minha encomenda?' },
      {
        type: 'out',
        text: 'Achei seu pedido!',
        attachment: {
          icon: 'package',
          title: 'Pedido #3892 — Em transito',
          subtitle: 'Previsao: Amanha ate 18h',
          accent: '#006AFF',
        },
      },
      { type: 'in', text: 'Obrigada!' },
      { type: 'out', text: 'Qualquer coisa estamos aqui 24h!' },
    ],
  },
  {
    id: 'telegram',
    name: 'Telegram',
    iconName: 'telegram',
    iconColor: '#26A5E4',
    iconBg: 'rgba(38,165,228,.12)',
    description:
      'Bots e grupos do Telegram. Ideal para comunidades, suporte tecnico e notificacoes.',
    bubbles: [
      { type: 'in', text: 'Como configuro o bot?' },
      { type: 'out', text: 'Basta colar o token do BotFather aqui' },
      { type: 'in', text: 'Pronto, colei!' },
      {
        type: 'out',
        text: 'Conectado!',
        attachment: {
          icon: 'bot',
          title: 'Bot @sualojabot ativo',
          subtitle: 'Respondendo em 3 grupos — 1.2K membros',
          accent: '#26A5E4',
        },
      },
    ],
  },
  {
    id: 'email',
    name: 'Email',
    iconName: 'email',
    iconColor: '#3B82F6',
    iconBg: 'rgba(59,130,246,.12)',
    description:
      'IMAP, SMTP ou Microsoft 365. Transforme emails em tickets com SLA e prioridade.',
    bubbles: [
      { type: 'in', text: 'Preciso de suporte com meu pedido #4521' },
      {
        type: 'out',
        text: 'Ticket criado!',
        attachment: {
          icon: 'ticket',
          title: 'Ticket #4521 — Prioridade Alta',
          subtitle: 'SLA: Resposta em ate 2h',
          accent: '#3B82F6',
        },
      },
      { type: 'in', text: 'Quando chega?' },
      { type: 'out', text: 'Previsao para amanha ate as 18h. Voce recebera o rastreio por email' },
    ],
  },
  {
    id: 'sms',
    name: 'SMS',
    iconName: 'sms',
    iconColor: '#EF4444',
    iconBg: 'rgba(239,68,68,.12)',
    description:
      'Twilio SMS para confirmacoes, OTP e campanhas. Alcance clientes mesmo sem internet.',
    bubbles: [
      { type: 'in', text: 'Quero confirmar meu agendamento' },
      {
        type: 'out',
        text: 'Confirmado!',
        attachment: {
          icon: 'calendar',
          title: 'Agendamento Confirmado',
          subtitle: '15/03 as 14:00h — Dra. Marina',
          accent: '#EF4444',
        },
      },
      { type: 'in', text: 'Posso remarcar?' },
      { type: 'out', text: 'Claro! Escolha o novo horario: chat.ajax/remarcar' },
    ],
  },
  {
    id: 'line',
    name: 'LINE',
    iconName: 'line',
    iconColor: '#06C755',
    iconBg: 'rgba(6,199,85,.12)',
    description:
      'Popular na Asia. Conecte sua conta LINE Official para atender mercados internacionais.',
    bubbles: [
      { type: 'in', text: 'こんにちは、注文したいです' },
      {
        type: 'out',
        text: 'ようこそ！',
        attachment: {
          icon: 'clipboard',
          title: 'Catalogo Premium 2025',
          subtitle: '48 produtos — Frete internacional',
          accent: '#06C755',
        },
      },
      { type: 'in', text: '支払い方法は？' },
      { type: 'out', text: 'クレジットカードまたはPayPay対応です' },
    ],
  },
  {
    id: 'google-business',
    name: 'Google Business',
    iconName: 'google',
    iconColor: '#4285F4',
    iconBg: 'rgba(66,133,244,.12)',
    description:
      'Responda avaliacoes do Google automaticamente com IA. Melhore sua reputacao e converta buscas em clientes.',
    bubbles: [
      { type: 'in', text: 'Nota 5 — Atendimento excelente, super rapido!' },
      {
        type: 'out',
        text: 'Obrigado pela avaliacao! Ficamos felizes em ajudar',
        attachment: {
          icon: 'chartbar',
          title: 'Nota media: 4.8',
          subtitle: '127 avaliacoes — +23% este mes',
          accent: '#4285F4',
        },
      },
      { type: 'in', text: 'Nota 2 — Demorou pra responder...' },
      { type: 'out', text: 'Lamentamos! Ja encaminhamos pra equipe resolver. Pode nos chamar no chat para agilizar' },
    ],
  },
]
