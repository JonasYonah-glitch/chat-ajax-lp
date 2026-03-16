import 'dotenv/config'

const BASE_URL = process.env.ASAAS_BASE_URL || 'https://sandbox.asaas.com/api/v3'
const API_KEY = process.env.ASAAS_API_KEY || ''

const headers = {
  'Content-Type': 'application/json',
  'User-Agent': 'ChatAjaxLP',
  access_token: API_KEY,
}

/* ── Types ── */
export interface CreateCustomerPayload {
  name: string
  cpfCnpj: string
  email: string
}

export interface CreditCardData {
  holderName: string
  number: string
  expiryMonth: string
  expiryYear: string
  ccv: string
}

export interface CreditCardHolderInfo {
  name: string
  email: string
  cpfCnpj: string
  postalCode: string
  addressNumber: string
  phone: string
}

export interface CreatePaymentPayload {
  customer: string
  billingType: 'PIX' | 'BOLETO' | 'CREDIT_CARD'
  value: number
  dueDate: string
  description?: string
  creditCard?: CreditCardData
  creditCardHolderInfo?: CreditCardHolderInfo
}

export type SubscriptionCycle = 'MONTHLY' | 'QUARTERLY' | 'SEMIANNUALLY' | 'YEARLY'

export interface CreateSubscriptionPayload {
  customer: string
  billingType: 'PIX' | 'BOLETO' | 'CREDIT_CARD'
  value: number
  nextDueDate: string
  cycle: SubscriptionCycle
  description?: string
  creditCard?: CreditCardData
  creditCardHolderInfo?: CreditCardHolderInfo
}

export interface AsaasCustomer {
  id: string
  name: string
  email: string
  cpfCnpj: string
}

export interface AsaasPayment {
  id: string
  status: string
  billingType: string
  value: number
  invoiceUrl: string
  bankSlipUrl?: string
  invoiceNumber?: string
}

export interface AsaasSubscription {
  id: string
  status: string
  billingType: string
  value: number
  cycle: string
  nextDueDate: string
  description?: string
}

export interface PixQrCode {
  encodedImage: string
  payload: string
  expirationDate: string
}

/* ── API calls ── */
async function asaasFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`
  console.log(`[Asaas] ${options.method || 'GET'} ${url}`)

  const res = await fetch(url, {
    ...options,
    headers: { ...headers, ...(options.headers as Record<string, string>) },
  })

  const text = await res.text()

  if (!res.ok) {
    console.error(`[Asaas] Error ${res.status}:`, text)
    throw new Error(`Asaas API ${res.status}: ${text}`)
  }

  try {
    return JSON.parse(text) as T
  } catch {
    console.error(`[Asaas] Invalid JSON response:`, text.slice(0, 200))
    throw new Error('Resposta invalida da API Asaas')
  }
}

export async function createCustomer(data: CreateCustomerPayload): Promise<AsaasCustomer> {
  return asaasFetch<AsaasCustomer>('/customers', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function createPayment(data: CreatePaymentPayload): Promise<AsaasPayment> {
  return asaasFetch<AsaasPayment>('/payments', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function createSubscription(data: CreateSubscriptionPayload): Promise<AsaasSubscription> {
  return asaasFetch<AsaasSubscription>('/subscriptions', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getSubscriptionPayments(subscriptionId: string): Promise<{ data: AsaasPayment[] }> {
  return asaasFetch<{ data: AsaasPayment[] }>(`/subscriptions/${subscriptionId}/payments`)
}

export async function getPixQrCode(paymentId: string): Promise<PixQrCode> {
  return asaasFetch<PixQrCode>(`/payments/${paymentId}/pixQrCode`)
}
