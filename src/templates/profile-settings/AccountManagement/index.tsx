import { AccountManagementForm } from 'features/account-management-form'
import { selectHasBusinessAccount, useAuth } from 'features/auth'
import React from 'react'

export const AccountManagement = () => {
  const hasBusinessAccount = useAuth(selectHasBusinessAccount)

  return <AccountManagementForm hasBusinessAccount={hasBusinessAccount} />
}
