export interface Step {
  number: number
  title: string
  description: string
}

export const steps: Step[] = [
  {
    number: 1,
    title: 'Crie sua conta gratis',
    description:
      'Crie uma conta e aproveite os 14 dias gratis. Conecte seus canais — WhatsApp, Instagram, TikTok, Email e mais — em poucos cliques com nossos assistentes guiados.',
  },
  {
    number: 2,
    title: 'Configure suas automacoes',
    description:
      'Use nossos recursos como Quick Automations, Captain IA e macros para automatizar respostas, classificar tickets e direcionar conversas para o agente certo.',
  },
  {
    number: 3,
    title: 'Acompanhe e escale',
    description:
      'Acompanhe os resultados e ajuste suas estrategias com relatorios em tempo real, CSAT, SLA e metricas de desempenho por agente, canal e equipe.',
  },
]
