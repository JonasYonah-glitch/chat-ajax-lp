export interface Integration {
  name: string
  iconName: string
}

export const integrations: Integration[] = [
  { name: 'Slack', iconName: 'slack' },
  { name: 'HubSpot', iconName: 'hubspot' },
  { name: 'Shopify', iconName: 'shopify' },
  { name: 'Stripe', iconName: 'stripe' },
  { name: 'Linear', iconName: 'linear' },
  { name: 'Notion', iconName: 'notion' },
  { name: 'OpenAI', iconName: 'openai' },
  { name: 'Dialogflow', iconName: 'dialogflow' },
  { name: 'Google Translate', iconName: 'google-translate' },
  { name: 'Dyte (Video)', iconName: 'dyte' },
  { name: 'API & Webhooks', iconName: 'api' },
]
