import type { AxiosError } from 'axios'
import type { UserError } from 'shared/types/auth'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { SubscriptionsService } from 'shared/api'
import { PaymentType, SubscriptionType } from 'shared/constants/payments'
import { useSnackbar } from 'shared/hooks'
import { GetMyPaymentsParams, SortDirection } from 'shared/types/subscriptions'
import { ColumnType, Pagination, Table } from 'shared/ui'

import cls from './styles.module.scss'

const options = ['10', '20', '30', '50', '100']

const formatDate = (date: string) => format(new Date(date), 'dd.MM.yyyy')

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

  const columns: ColumnType[] = [
    { field: 'dateOfPayment', title: t('dateOfPayment') },
    { field: 'endDateOfSubscription', title: t('endDateOfSubscription') },
    { field: 'price', textAlign: 'right', title: t('price') },
    { field: 'subscriptionType', title: t('subscriptionType') },
    { field: 'paymentType', title: t('paymentType') },
  ]

  const tableData = data?.data.items.map(el => ({
    ...el,
    dateOfPayment: formatDate(el.dateOfPayment),
    endDateOfSubscription: formatDate(el.endDateOfSubscription),
    paymentType: PaymentType[el.paymentType],
    price: '$' + el.price,
    subscriptionType: SubscriptionType[el.subscriptionType],
  }))

  const onChange = (pageSize: string) => {
    setParams({ ...params, pageNumber: 1, pageSize: Number(pageSize) })
  }

  const onChangePage = (pageNumber: number) => {
    setParams({ ...params, pageNumber })
  }

  const onSort = (key: string) => {
    const { sortBy, sortDirection } = params

    let newSortDirection: SortDirection = 'asc'

    if (sortBy === key && sortDirection === 'desc') {
      newSortDirection = undefined
    }

    if (sortBy === key && sortDirection === 'asc') {
      newSortDirection = 'desc'
    }

    setParams({
      ...params,
      pageNumber: 1,
      sortBy: key,
      sortDirection: newSortDirection,
    } as GetMyPaymentsParams)
  }

  return (
    <div>
      <Table
        columns={columns}
        data={tableData || []}
        onSort={onSort}
        sortBy={params.sortBy}
        sortDirection={params.sortDirection}
      />
      {data && data.data.totalCount > 8 && (
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
