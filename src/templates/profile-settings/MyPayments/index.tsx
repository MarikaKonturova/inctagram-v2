import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import React from 'react'
import { SubscriptionsService } from 'shared/api'
import { Table } from 'shared/ui'

const columns = [
    { title: 'Date of Payment', field: 'dateOfPayment' },
    { title: 'End date of subscription', field: 'endDateOfSubscription' },
    { title: 'Price', field: 'price' },
    { title: 'Subscription Type', field: 'subscriptionType' },
    { title: 'Payment Type', field: 'paymentType' }
]

const formateDate = (date: string) => format(new Date(date), 'dd.MM.yyyy')

export const MyPayments = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['my-payments'],
        queryFn: SubscriptionsService.getMyPayments,
        onError: (error) => {
            console.log({ error })
        }
    })

    const tableData = data?.data.items.map(el => ({
        ...el,
        dateOfPayment: formateDate(el.dateOfPayment),
        endDateOfSubscription: formateDate(el.endDateOfSubscription)
    }))

    return (
        <Table data={tableData || []}
               columns={columns} />
    )
}
