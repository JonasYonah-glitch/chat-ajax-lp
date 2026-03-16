import { createContext, useContext, useState, useCallback } from 'react'

export type BillingCycle = 'MONTHLY' | 'YEARLY'

export interface CheckoutPlan {
  id: string
  name: string
  price: string
  numericValue: number
  cycle: BillingCycle
}

export interface CheckoutState {
  isOpen: boolean
  plan: CheckoutPlan | null
  step: 'customer' | 'payment' | 'confirmation'
  billingType: 'PIX' | 'BOLETO' | 'CREDIT_CARD' | null
  loading: boolean
  error: string | null
  result: CheckoutResult | null
  customerData: { name: string; cpfCnpj: string; email: string } | null
}

export interface CheckoutResult {
  paymentId: string
  subscriptionId?: string
  status: string
  invoiceUrl: string
  bankSlipUrl?: string
  cycle?: string
  pix?: {
    encodedImage: string
    payload: string
    expirationDate: string
  }
}

interface CheckoutContextValue {
  state: CheckoutState
  openCheckout: (plan: CheckoutPlan) => void
  closeCheckout: () => void
  setStep: (step: CheckoutState['step']) => void
  setBillingType: (type: CheckoutState['billingType']) => void
  setCustomerData: (data: CheckoutState['customerData']) => void
  submitCheckout: (data: {
    name: string
    cpfCnpj: string
    email: string
    billingType: 'PIX' | 'BOLETO' | 'CREDIT_CARD'
    creditCard?: {
      holderName: string
      number: string
      expiryMonth: string
      expiryYear: string
      ccv: string
    }
    creditCardHolderInfo?: {
      name: string
      email: string
      cpfCnpj: string
      postalCode: string
      addressNumber: string
      phone: string
    }
  }) => Promise<void>
  resetCheckout: () => void
}

const initialState: CheckoutState = {
  isOpen: false,
  plan: null,
  step: 'customer',
  billingType: null,
  loading: false,
  error: null,
  result: null,
  customerData: null,
}

export const CheckoutContext = createContext<CheckoutContextValue | null>(null)

export function useCheckoutState(): CheckoutContextValue {
  const [state, setState] = useState<CheckoutState>(initialState)

  const openCheckout = useCallback((plan: CheckoutPlan) => {
    setState({ ...initialState, isOpen: true, plan })
  }, [])

  const closeCheckout = useCallback(() => {
    setState(initialState)
  }, [])

  const setStep = useCallback((step: CheckoutState['step']) => {
    setState(prev => ({ ...prev, step, error: null }))
  }, [])

  const setBillingType = useCallback((billingType: CheckoutState['billingType']) => {
    setState(prev => ({ ...prev, billingType }))
  }, [])

  const setCustomerData = useCallback((customerData: CheckoutState['customerData']) => {
    setState(prev => ({ ...prev, customerData }))
  }, [])

  const submitCheckout = useCallback(async (data: Parameters<CheckoutContextValue['submitCheckout']>[0]) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const plan = state.plan
      if (!plan) throw new Error('Nenhum plano selecionado')

      const cycleLabel = plan.cycle === 'YEARLY' ? 'Anual' : 'Mensal'

      let res: Response
      try {
        res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            value: plan.numericValue,
            cycle: plan.cycle,
            description: `Chat Ajax - Plano ${plan.name} (${cycleLabel})`,
          }),
        })
      } catch {
        throw new Error('Servidor indisponivel. Verifique se o backend esta rodando (npm run dev:server).')
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let json: any
      try {
        json = await res.json()
      } catch {
        throw new Error(`Resposta inesperada do servidor (HTTP ${res.status}). Verifique o backend.`)
      }

      if (!res.ok) {
        throw new Error(json.error || 'Erro ao processar pagamento')
      }

      const subscription = json.subscription
      const payment = json.payment
      const pixData = json.pix as { encodedImage: string; payload: string; expirationDate: string } | null

      setState(prev => ({
        ...prev,
        loading: false,
        step: 'confirmation' as const,
        result: {
          paymentId: payment?.id || subscription.id,
          subscriptionId: subscription.id,
          status: payment?.status || subscription.status,
          invoiceUrl: payment?.invoiceUrl || '',
          bankSlipUrl: payment?.bankSlipUrl,
          cycle: subscription.cycle,
          pix: pixData || undefined,
        },
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Erro desconhecido',
      }))
    }
  }, [state.plan])

  const resetCheckout = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    state,
    openCheckout,
    closeCheckout,
    setStep,
    setBillingType,
    setCustomerData,
    submitCheckout,
    resetCheckout,
  }
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider')
  return ctx
}
