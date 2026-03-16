export interface PricingFeature {
  text: string
  highlight?: boolean
}

export interface PricingPlan {
  id: string
  name: string
  featured: boolean
  monthlyPrice: string
  yearlyPrice: string
  monthlyValue: number
  yearlyValue: number
  monthlyInstallment: string
  yearlyTotal: string
  features: PricingFeature[]
  cta: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    featured: false,
    monthlyPrice: 'R$497',
    yearlyPrice: 'R$414',
    monthlyValue: 497,
    yearlyValue: 4968,
    monthlyInstallment: '12x R$41,42',
    yearlyTotal: 'R$4.968/ano',
    features: [
      { text: '5 agentes' },
      { text: '4 inboxes' },
      { text: '1 WhatsApp' },
      { text: '1 Instagram' },
      { text: '1 Website Live Chat' },
      { text: '1 Email' },
      { text: '25.000 creditos IA/mes' },
      { text: 'FlowBuilder' },
      { text: 'Automacoes e macros' },
      { text: 'WA Templates' },
      { text: 'Relatorios basicos' },
      { text: 'CRM + Kanban' },
    ],
    cta: 'Comecar agora',
  },
  {
    id: 'pro',
    name: 'Pro',
    featured: true,
    monthlyPrice: 'R$797',
    yearlyPrice: 'R$664',
    monthlyValue: 797,
    yearlyValue: 7968,
    monthlyInstallment: '12x R$66,42',
    yearlyTotal: 'R$7.968/ano',
    features: [
      { text: '10 agentes' },
      { text: '7 inboxes' },
      { text: '3 WhatsApp + 2 Instagram' },
      { text: '1 Website + 2 Email' },
      { text: '50.000 creditos IA/mes' },
      { text: 'Tudo do Starter +', highlight: true },
      { text: 'SLA + Audit Logs' },
      { text: 'Sem branding' },
      { text: 'Google Reviews IA' },
      { text: 'Help Center + Integracoes' },
    ],
    cta: 'Comecar agora',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    featured: false,
    monthlyPrice: 'R$1.297',
    yearlyPrice: 'R$1.081',
    monthlyValue: 1297,
    yearlyValue: 12972,
    monthlyInstallment: '',
    yearlyTotal: '',
    features: [
      { text: '20 agentes' },
      { text: '12 inboxes' },
      { text: '5 WhatsApp + 3 Instagram' },
      { text: '2 Website + 5 Email' },
      { text: '100.000 creditos IA/mes' },
      { text: 'Tudo do Pro +', highlight: true },
      { text: 'Custom Roles' },
      { text: 'Integracoes sob medida' },
      { text: 'Onboarding dedicado' },
      { text: 'Suporte prioritario WhatsApp' },
      { text: 'Gerente de sucesso dedicado' },
    ],
    cta: 'Falar com vendas',
  },
]
