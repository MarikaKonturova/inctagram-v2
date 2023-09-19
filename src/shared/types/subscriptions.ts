interface SubscriptionType {
    typeSubscription: string // 'MONTHLY' SEMI_ANNUALLY, YEARLY
    paymentType: string// 'STRIPE' | 'PAYPAL'
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
    autoRenewal: true
}

interface GetCurrentSubscriptionType {
    data: CurrentSubscriptionType[]
    hasAutoRenewal: true
}

interface PaymentsType {
    userId: number
    subscriptionId: string
    dateOfPayment: string
    endDateOfSubscription: string
    price: number
    subscriptionType: string // 'MONTHLY'
    paymentType: string // 'STRIPE'
}

interface CostOfSubscriptionsType {
    data: Array<{
        amount: 0
        typeDescription: string // 'MONTHLY'
        description: 'string'
    }>
}

export type {
    SubscriptionType,
    CreateSubscriptionSuccessResponseType,
    CreateSubscriptionFailedResponseType,
    GetCurrentSubscriptionType,
    PaymentsType,
    CostOfSubscriptionsType
}
