/**
 * Pure ROI calculator extracted from the original landing page.
 * All monetary values are in BRL (R$).
 */

export interface RoiInput {
  /** Monthly conversations / tickets handled */
  atendimentos: number
  /** Number of support agents */
  agentes: number
  /** Average ticket value in R$ */
  ticket: number
  /** Monthly churn percentage (0-100) */
  churnPercent: number
}

export interface RoiOutput {
  /** Monthly revenue lost due to slow service */
  perdida: number
  /** Revenue recovered by using Chat Ajax */
  recuperada: number
  /** Cost savings from agent time saved (R$) */
  economia: number
  /** Monthly investment (plan price in R$) */
  invest: number
  /** Plan name (Starter | Pro | Enterprise) */
  plano: string
  /** Net gain = recuperada + economia - invest */
  ganho: number
  /** ROI percentage (clamped >= 0) */
  roiPercent: number
  /** Estimated payback period in days */
  paybackDays: number
}

/**
 * Calculate the ROI of adopting Chat Ajax given the customer's metrics.
 *
 * Business logic:
 * - salesRate = 18 % of conversations convert to a sale
 * - perdida = atendimentos * salesRate * (churn / 100) * ticket
 * - Chat Ajax recovers ~55 % of lost revenue (recRaw = perdida * 0.55)
 * - recuperada is capped logarithmically above R$ 5 000
 * - economia = agentes * 22 business days * 15 min saved per agent per day
 * - invest / plano based on agent count: <=5 Starter R$497, <=15 Pro R$797, else Enterprise R$1297
 * - ganho = recuperada + economia - invest
 * - roiPercent = max(0, round(ganho / invest * 100))
 * - paybackDays = invest / ((recuperada + economia) / 30)
 */
export function calculateRoi(input: RoiInput): RoiOutput {
  const { atendimentos, agentes, ticket, churnPercent } = input

  const salesRate = 0.18 // 18% of conversations become a sale

  // Revenue lost per month due to slow / missed service
  const perdida = Math.round(atendimentos * salesRate * (churnPercent / 100) * ticket)

  // Chat Ajax recovers roughly 55% of that lost revenue
  const recRaw = perdida * 0.55

  // Logarithmic cap above R$ 5 000 to keep projections realistic
  const recuperada = Math.round(
    recRaw <= 5000
      ? recRaw
      : 5000 + Math.log2(Math.max(1, recRaw / 5000)) * 3000
  )

  // Time savings: 22 business days * 15 min saved per agent per day, valued in R$
  const economia = Math.round(agentes * 22 * 15)

  // Plan selection based on agent count
  let invest: number
  let plano: string
  if (agentes <= 5) {
    invest = 497
    plano = 'Starter'
  } else if (agentes <= 15) {
    invest = 797
    plano = 'Pro'
  } else {
    invest = 1297
    plano = 'Enterprise (a partir de)'
  }

  // Net gain after investment
  const ganho = recuperada + economia - invest

  // ROI percentage (never negative)
  const roiPercent = Math.max(0, Math.round((ganho / invest) * 100))

  // Payback period in days
  const monthlyReturn = recuperada + economia
  const paybackDays = monthlyReturn > 0 ? invest / (monthlyReturn / 30) : Infinity

  return {
    perdida,
    recuperada,
    economia,
    invest,
    plano,
    ganho,
    roiPercent,
    paybackDays,
  }
}
