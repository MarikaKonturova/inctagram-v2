import { $api } from 'shared/api'
import { type ResponseType } from 'shared/types/post'
import {
  type CostOfSubscriptionsType,
  type CreateSubscriptionFailedResponseType,
  type CreateSubscriptionSuccessResponseType,
  type GetCurrentSubscriptionType,
  type PaymentsType,
  type SubscriptionType,
} from 'shared/types/subscriptions'

export const SubscriptionsService = {
  cancelAutoRenewal() {
    return $api.post<PaymentsType>('subscriptions/canceled-auto-renewal')
  },
  createSubscriptions(data: SubscriptionType) {
    return $api.post<CreateSubscriptionFailedResponseType | CreateSubscriptionSuccessResponseType>(
      'subscriptions',
      data
    )
  },
  getCostOfSubscription() {
    return $api.get<CostOfSubscriptionsType>('subscriptions/cost-of-subscriptions')
  },
  getCurrentSubscription() {
    return $api.get<GetCurrentSubscriptionType>('subscriptions/current-subscriptions')
  },
  getMyPayments() {
    return $api.get<ResponseType<PaymentsType[]>>('subscriptions/my-payments')
  },
}
