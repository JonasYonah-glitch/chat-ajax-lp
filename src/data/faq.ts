export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'O que e o Chat Ajax?',
    answer:
      'O Chat Ajax e uma plataforma de atendimento multicanal com IA que centraliza WhatsApp, Instagram, TikTok, Email, Telegram, Messenger e outros canais em uma unica tela. Ele permite que equipes gerenciem conversas, automatizem respostas e acompanhem metricas de atendimento em tempo real.',
  },
  {
    question: 'Quais canais sao suportados?',
    answer:
      'Atualmente suportamos WhatsApp (API Oficial Cloud, Twilio, 360dialog), Instagram DM, TikTok, Facebook Messenger, Telegram, Email (IMAP/SMTP/Microsoft 365), SMS (Twilio), LINE, Google Business Messages e Website Live Chat. Novos canais sao adicionados regularmente.',
  },
  {
    question: 'O que e o Captain AI?',
    answer:
      'O Captain AI e nosso assistente de inteligencia artificial integrado. Ele sugere respostas em tempo real, resume conversas longas, classifica o sentimento do cliente, gera respostas automaticas e pode resolver ate 70% dos tickets sem intervencao humana. Disponivel nos planos Pro e Enterprise.',
  },
  {
    question: 'Preciso de conhecimento tecnico?',
    answer:
      'Nao! O Chat Ajax foi projetado para ser intuitivo. A configuracao dos canais e feita em poucos cliques com assistentes guiados. Para integrações avancadas, oferecemos documentacao completa, API REST e suporte tecnico dedicado.',
  },
  {
    question: 'Posso migrar de outra ferramenta?',
    answer:
      'Sim! Oferecemos migração assistida de plataformas como ManyChat, Zendesk, Intercom, Freshdesk e outras. Nossa equipe ajuda a transferir contatos, historico de conversas e configuracoes de automacao sem perda de dados.',
  },
  {
    question: 'O Chat Ajax e seguro e compativel com LGPD?',
    answer:
      'Sim. Todos os dados sao criptografados em transito (TLS 1.3) e em repouso (AES-256). Somos compativeis com LGPD, oferecemos controle de consentimento, anonimizacao de dados e exportacao/exclusao sob demanda. Nossos servidores ficam no Brasil.',
  },
  {
    question: 'Quais integracoes estao disponiveis?',
    answer:
      'Integramos nativamente com Slack, HubSpot, Shopify, Stripe, Linear, Notion, OpenAI, Dialogflow, Google Translate, Dyte (Video) e muito mais. Tambem oferecemos API aberta e Webhooks para integracoes customizadas.',
  },
  {
    question: 'Como funciona o suporte do TikTok?',
    answer:
      'A integracao com TikTok (novo na v4.9) permite receber e responder DMs e mensagens do TikTok Shop diretamente no Chat Ajax. Basta conectar sua conta TikTok Business e todas as conversas aparecem na inbox unificada.',
  },
  {
    question: 'Posso testar antes de pagar?',
    answer:
      'Sim! Oferecemos 14 dias gratis em todos os planos, sem necessidade de cartao de credito. Voce tem acesso completo a todas as funcionalidades do plano escolhido durante o periodo de teste.',
  },
  {
    question: 'Qual a diferenca para o ManyChat?',
    answer:
      'O Chat Ajax vai alem do ManyChat ao oferecer uma inbox verdadeiramente unificada com todos os canais (nao apenas Instagram e WhatsApp), IA nativa com Captain AI, CRM integrado com Kanban, SLA e audit logs, alem de suporte a canais como TikTok, Telegram, LINE e Voice.',
  },
  {
    question: 'Aceita quais formas de pagamento?',
    answer:
      'Aceitamos cartao de credito (Visa, Mastercard, Amex, Elo), PIX, boleto bancario e transferencia bancaria. Planos anuais podem ser parcelados em ate 12x sem juros no cartao.',
  },
]
