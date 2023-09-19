
type PeriodType = 'MONTHLY' | 'SEMI_ANNUALLY' | 'YEARLY'
type WalletType = 'STRIPE' | 'PAYPAL'

interface SubscriptionType {
    typeSubscription: PeriodType
    paymentType: WalletType
    amount: number
}

interface CreateSubscriptionSuccessResponseType {
    url: string
}

interface CreateSubscriptionFailedResponseType {
    statusCode: number
    messages: Array<{
        message: string
        field: string
    }>
    error: string
}

interface CurrentSubscriptionType {
    userId: number
    subscriptionId: string
    dateOfPayment: string
    endDateOfSubscription: string
    autoRenewal: boolean
}

interface GetCurrentSubscriptionType {
    data: CurrentSubscriptionType[]
    hasAutoRenewal: boolean
}

interface PaymentsType {
    userId: number
    subscriptionId: string
    dateOfPayment: string
    endDateOfSubscription: string
    price: number
    subscriptionType: PeriodType
    paymentType: WalletType
}

interface CostOfSubscriptionType {
    description: string
    amount: number
    typeDescription: PeriodType
}

interface CostOfSubscriptionsType {
    data: CostOfSubscriptionType[]
}

export type {
    SubscriptionType,
    CreateSubscriptionSuccessResponseType,
    CreateSubscriptionFailedResponseType,
    GetCurrentSubscriptionType,
    PaymentsType,
    CostOfSubscriptionsType,
    CostOfSubscriptionType
}
