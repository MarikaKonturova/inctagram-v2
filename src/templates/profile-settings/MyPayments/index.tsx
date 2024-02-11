import type { AxiosError } from 'axios'
import type { UserError } from 'shared/types/auth'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubscriptionsService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'
import { GetMyPaymentsParams } from 'shared/types/subscriptions'
import { Pagination, Table } from 'shared/ui'

import cls from './styles.module.scss'

const columns = [
  { field: 'dateOfPayment', title: 'Date of Payment' },
  { field: 'endDateOfSubscription', title: 'End date of subscription' },
  { field: 'price', title: 'Price' },
  { field: 'subscriptionType', title: 'Subscription Type' },
  { field: 'paymentType', title: 'Payment Type' },
]

const options = ['8', '20', '30', '50', '100']

const formateDate = (date: string) => format(new Date(date), 'dd.MM.yyyy')

export const MyPayments = () => {
  const [params, setParams] = useState<GetMyPaymentsParams>({})

  const onOpen = useSnackbar(state => state.onOpen)

  const { data } = useQuery(
    ['my-payments', params],
    () => SubscriptionsService.getMyPayments(params),
    {
      onError: (error: AxiosError<UserError>) => {
        onOpen(error?.response?.data.messages[0].message || 'some error', 'danger', 'left')
      },
    }
  )

  const { t } = useTranslation(['profile'])

  const columns = [
    { field: 'dateOfPayment', title: t('dateOfPayment') },
    { field: 'endDateOfSubscription', title: t('endDateOfSubscription') },
    { field: 'price', title: t('price') },
    { field: 'subscriptionType', title: t('subscriptionType') },
    { field: 'paymentType', title: t('paymentType') },
  ]

  const tableData = data?.data.items.map(el => ({
    ...el,
    dateOfPayment: formateDate(el.dateOfPayment),
    endDateOfSubscription: formateDate(el.endDateOfSubscription),
  }))

  const onChange = (pageSize: string) => {
    setParams({ pageSize: Number(pageSize) })
  }

  const onChangePage = (pageNumber: number) => {
    setParams({ ...params, pageNumber })
  }

  return (
    <div>
      <Table columns={columns} data={tableData || []} />
      {data && (
        <Pagination
          className={cls.pagination}
          currentPage={data.data.page}
          onChange={onChange}
          onChangePage={onChangePage}
          options={options}
          pageSize={data.data.pageSize}
          totalCount={data.data.totalCount}
          value={data.data.pageSize.toString()}
        />
      )}
    </div>
  )
}
