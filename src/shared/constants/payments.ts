export const SubscriptionType = {
  MONTHLY: '1 month',
  SEMI_ANNUALLY: '6 month',
  YEARLY: '1 year',
} as const

export const PaymentType = {
  PAYPAL: 'PayPal',
  STRIPE: 'Stripe',
} as const
