import { useLogout } from 'features/auth/model'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { LogoutButton } from 'shared/ui'
import { ConfirmationModal } from 'shared/ui/ConfirmationModal/ConfirmationModal'

interface IProps {
  className?: string
}

export const Logout = ({ className }: IProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const { email, isLoading, logout } = useLogout()
  const { t } = useTranslation('auth')

  const onLogOutClick = () => {
    setDeleteModalOpen(true)
  }

  return (
    <>
      <ConfirmationModal
        bodyText={`${t('logOutConfirmationBody')}${email ? ` "${email}"?` : '?'} `}
        headerText={`${t('logOutConfirmationHeader')}`}
        isDisabled={isLoading}
        isModalOpen={deleteModalOpen}
        onYesAction={logout}
        setModalOpen={setDeleteModalOpen}
      />
      <LogoutButton className={className} disabled={isLoading} onClick={onLogOutClick} />
    </>
  )
}
