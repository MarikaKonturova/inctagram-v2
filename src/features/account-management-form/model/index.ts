import { useMutation, useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { SubscriptionsService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'
import { type CostOfSubscriptionType, type SubscriptionType } from 'shared/types/subscriptions'

const formatDate = (date: string) => format(new Date(date), 'dd.MM.yyyy')

export const useSubscriptions = (selected: CostOfSubscriptionType) => {
  const onOpen = useSnackbar(state => state.onOpen)
  const { t } = useTranslation('profile')

  const { data: costOfSubscription, isLoading } = useQuery({
    onError: (error: Error) => {
      onOpen(error.message, 'danger', 'center')
    },
    queryFn: SubscriptionsService.getCostOfSubscription,
    queryKey: ['cost-of-subscription'],
  })

  const { data: currentSubscription, refetch } = useQuery({
    onError: (error: Error) => {
      onOpen(error.message, 'danger', 'center')
    },
    queryFn: SubscriptionsService.getCurrentSubscription,
    queryKey: ['current-subscription'],
  })

  const { mutate: createSubscriptions } = useMutation({
    mutationFn: SubscriptionsService.createSubscriptions,
    onError: (err: AxiosError<{ messages: Array<{ message: string }> }>) => {
      const error = err.response ? err.response.data.messages[0].message : err.message

      onOpen(error, 'danger', 'center')
    },
    onSuccess: async ({ data }: any) => {
      window.location.assign(data.url)
    },
    retry: false,
  })

  const { mutate: cancelAutoRenewal } = useMutation({
    mutationFn: SubscriptionsService.cancelAutoRenewal,
    onError: (error: Error) => {
      onOpen(error.message, 'danger', 'center')
    },
    onSuccess: async () => {
      await refetch()
    },
    retry: false,
  })

  const onStripeHandler = () => {
    const { amount, typeDescription } = selected

    const payload: SubscriptionType = {
      amount,
      paymentType: 'STRIPE',
      typeSubscription: typeDescription,
    }

    createSubscriptions(payload)
  }

  const { dateOfPayment, endDateOfSubscription } = currentSubscription?.data.data[0] || {}

  const expireAt = endDateOfSubscription && formatDate(endDateOfSubscription)
  const nextPayment = dateOfPayment && formatDate(dateOfPayment)

  const localizedCostOfSubscription = costOfSubscription?.data.data.map(el => {
    return { ...el, description: `${el.amount}$ ${t('per')} ${t(`${el.typeDescription}`)}` }
  })

  return {
    cancelAutoRenewal,
    expireAt,
    hasAutoRenewal: currentSubscription?.data.hasAutoRenewal,
    nextPayment,
    onStripeHandler,
    subscriptionCosts: localizedCostOfSubscription || [],
  }
}
