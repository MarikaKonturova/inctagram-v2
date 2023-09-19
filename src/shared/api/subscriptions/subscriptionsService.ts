import { $api } from 'shared/api'
import {
    type CostOfSubscriptionsType,
    type CreateSubscriptionFailedResponseType,
    type CreateSubscriptionSuccessResponseType,
    type GetCurrentSubscriptionType,
    type PaymentsType,
    type SubscriptionType
} from 'shared/types/subscriptions'

export const SubscriptionsService = {
    createSubscriptions (data: SubscriptionType) {
        return $api.post<CreateSubscriptionSuccessResponseType
        | CreateSubscriptionFailedResponseType>('subscriptions', data)
    },
    getCurrentSubscription () {
        return $api.get<GetCurrentSubscriptionType>('subscriptions/current-subscriptions')
    },
    getMyPayments () {
        return $api.get<PaymentsType[]>('subscriptions/my-payments')
    },
    cancelAutoRenewal () {
        return $api.post<PaymentsType>('subscriptions/canceled-auto-renewal')
    },
    getCostOfSubscription () {
        return $api.get<CostOfSubscriptionsType>('subscriptions/cost-of-subscriptions')
    }
}
