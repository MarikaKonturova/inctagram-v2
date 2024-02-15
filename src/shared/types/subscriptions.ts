type PeriodType = 'MONTHLY' | 'SEMI_ANNUALLY' | 'YEARLY'
type WalletType = 'PAYPAL' | 'STRIPE'

interface SubscriptionType {
  amount: number
  paymentType: WalletType
  typeSubscription: PeriodType
}

interface CreateSubscriptionSuccessResponseType {
  url: string
}

interface CreateSubscriptionFailedResponseType {
  error: string
  messages: Array<{
    field: string
    message: string
  }>
  statusCode: number
}

interface CurrentSubscriptionType {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

interface GetCurrentSubscriptionType {
  data: CurrentSubscriptionType[]
  hasAutoRenewal: boolean
}

interface PaymentsType {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: WalletType
  price: number
  subscriptionId: string
  subscriptionType: PeriodType
  userId: number
}

interface CostOfSubscriptionType {
  amount: number
  description: string
  typeDescription: PeriodType
}

interface AccountOptionType {
  description: string
  typeDescription: string
}

interface CostOfSubscriptionsType {
  data: CostOfSubscriptionType[]
}

type GetMyPaymentsSort =
  | 'dateOfPayment'
  | 'endDateOfSubscription'
  | 'paymentType'
  | 'price'
  | 'subscriptionType'

interface GetMyPaymentsParams {
  pageNumber?: number
  pageSize?: number
  sortBy?: GetMyPaymentsSort
  sortDirection?: 'asc' | 'desc'
}

export type {
  AccountOptionType,
  CostOfSubscriptionType,
  CostOfSubscriptionsType,
  CreateSubscriptionFailedResponseType,
  CreateSubscriptionSuccessResponseType,
  GetCurrentSubscriptionType,
  GetMyPaymentsParams,
  GetMyPaymentsSort,
  PaymentsType,
  SubscriptionType,
}
