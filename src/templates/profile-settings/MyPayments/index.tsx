import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import React from 'react'
import { SubscriptionsService } from 'shared/api'
import { Table } from 'shared/ui'

const columns = [
  { field: 'dateOfPayment', title: 'Date of Payment' },
  { field: 'endDateOfSubscription', title: 'End date of subscription' },
  { field: 'price', title: 'Price' },
  { field: 'subscriptionType', title: 'Subscription Type' },
  { field: 'paymentType', title: 'Payment Type' },
]

const formateDate = (date: string) => format(new Date(date), 'dd.MM.yyyy')

export const MyPayments = () => {
  const { data, isLoading } = useQuery({
    onError: error => {
      console.log({ error })
    },
    queryFn: SubscriptionsService.getMyPayments,
    queryKey: ['my-payments'],
  })

  const tableData = data?.data.items.map(el => ({
    ...el,
    dateOfPayment: formateDate(el.dateOfPayment),
    endDateOfSubscription: formateDate(el.endDateOfSubscription),
  }))

  return <Table columns={columns} data={tableData || []} />
}
