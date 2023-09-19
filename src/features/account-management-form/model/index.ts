import { useMutation, useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { format } from 'date-fns'
import { useSnackbar } from 'features/common'
import { SubscriptionsService } from 'shared/api'
import { type CostOfSubscriptionType, type SubscriptionType } from 'shared/types/subscriptions'

const formatDate = (date: string) => format(new Date(date), 'dd.MM.yyyy')

export const useSubscriptions = (selected: CostOfSubscriptionType) => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const { data: costOfSubscription, isLoading } = useQuery({
        queryKey: ['cost-of-subscription'],
        queryFn: SubscriptionsService.getCostOfSubscription,
        onError: (error: Error) => {
            onOpen(error.message, 'danger', 'center')
        }
    })

    const { data: currentSubscription, refetch } = useQuery({
        queryKey: ['current-subscription'],
        queryFn: SubscriptionsService.getCurrentSubscription,
        onError: (error: Error) => {
            onOpen(error.message, 'danger', 'center')
        }
    })

    const { mutate: createSubscriptions } = useMutation({
        mutationFn: SubscriptionsService.createSubscriptions,
        retry: false,
        onSuccess: async ({ data }: any) => {
            window.location.assign(data.url)
        },
        onError: (err: AxiosError<{ messages: Array<{ message: string }> }>) => {
            const error = err.response
                ? err.response.data.messages[0].message
                : err.message

            onOpen(error, 'danger', 'center')
        }
    })

    const { mutate: cancelAutoRenewal } = useMutation({
        mutationFn: SubscriptionsService.cancelAutoRenewal,
        retry: false,
        onSuccess: async () => {
            await refetch()
        },
        onError: (error: Error) => {
            onOpen(error.message, 'danger', 'center')
        }
    })

    const onStripeHandler = () => {
        const { typeDescription, amount } = selected

        const payload: SubscriptionType = {
            typeSubscription: typeDescription,
            amount,
            paymentType: 'STRIPE'
        }

        createSubscriptions(payload)
    }

    const { endDateOfSubscription, dateOfPayment } = currentSubscription?.data.data[0] || {}

    const expireAt = endDateOfSubscription && formatDate(endDateOfSubscription)
    const nextPayment = dateOfPayment && formatDate(dateOfPayment)

    return {
        expireAt,
        nextPayment,
        cancelAutoRenewal,
        onStripeHandler,
        subscriptionCosts: costOfSubscription?.data.data || [],
        hasAutoRenewal: currentSubscription?.data.hasAutoRenewal
    }
}
