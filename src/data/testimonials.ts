export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  brandName: string
  platform: string
  followers: string
  brandColor: string
  brandInitials: string
  avatar: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Romina Thaler',
    role: 'Produtora Senior',
    company: 'Moda Luxe Brasil',
    quote:
      'Com certeza voltariamos a usar o Chat Ajax. A equipe foi muito prestativa ao responder as nossas duvidas e ajudar com o painel customizado de analytics. Penso que o Chat Ajax poderia ser usado no futuro para qualquer experiencia de chatbot, incluindo campanhas com as interacoes mais criativas que se pode imaginar.',
    brandName: 'modaluxebr',
    platform: 'Instagram',
    followers: '45.5M followers',
    brandColor: '#C8960C',
    brandInitials: 'ML',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=1100&fit=crop&crop=face&q=85',
  },
  {
    name: 'Carlos Eduardo Mendes',
    role: 'Diretor de Operacoes',
    company: 'FastFood Express',
    quote:
      'Centralizamos WhatsApp, Instagram e Telegram em uma unica tela. Nosso tempo de resposta caiu de 4 horas para 8 minutos. A IA do Captain responde 72% dos tickets automaticamente e o CSAT subiu para 4.8.',
    brandName: 'fastfoodexpress',
    platform: 'WhatsApp Business',
    followers: '120K contatos',
    brandColor: '#1A6B3C',
    brandInitials: 'FF',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&h=1100&fit=crop&crop=face&q=85',
  },
  {
    name: 'Juliana Rocha Alves',
    role: 'Head de Customer Success',
    company: 'TechNova SaaS',
    quote:
      'Migramos do Zendesk em menos de 2 dias. O que mais impressionou foi a automacao inteligente: criamos fluxos que qualificam leads pelo chat e agendam demos automaticamente. Economia de 35 horas semanais da equipe de suporte.',
    brandName: 'technova.io',
    platform: 'Multi-canal',
    followers: '8.2K clientes B2B',
    brandColor: '#2D3A8C',
    brandInitials: 'TN',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&h=1100&fit=crop&crop=face&q=85',
  },
  {
    name: 'Fernando Oliveira Santos',
    role: 'CEO & Fundador',
    company: 'Imob Premium Realty',
    quote:
      'No mercado imobiliario, responder rapido e tudo. Com o Chat Ajax integramos nosso WhatsApp oficial e a IA qualifica os leads antes de passar para os corretores. Fechamos 40% mais negocios no primeiro trimestre apos a implantacao.',
    brandName: 'imobpremium',
    platform: 'WhatsApp API',
    followers: '32K leads ativos',
    brandColor: '#8C2D5E',
    brandInitials: 'IP',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1100&fit=crop&crop=face&q=85',
  },
]
