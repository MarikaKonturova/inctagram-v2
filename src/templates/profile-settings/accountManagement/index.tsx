import { AccountManagementForm } from 'features/account-management-form'
import { selectHasBusinessAccount, useAuth } from 'features/auth'
import { useTranslation } from 'next-i18next'
import React from 'react'

export const AccountManagement = () => {
  const { t } = useTranslation(['profile'])
  const hasBusinessAccount = useAuth(selectHasBusinessAccount)
  const ACCOUNT_OPTIONS = [
    { description: t('personal'), typeDescription: t('personal') },
    { description: t('business'), typeDescription: t('business') },
  ]

  return (
    <AccountManagementForm
      accountOptions={ACCOUNT_OPTIONS}
      hasBusinessAccount={hasBusinessAccount}
    />
  )
}
