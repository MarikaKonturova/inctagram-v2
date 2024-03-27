import { useTranslation } from 'next-i18next'
import React, { Dispatch, SetStateAction } from 'react'
import { User } from 'shared/types/auth'
import { ConfirmationModal } from 'shared/ui'

import { useDeleteUser } from '../../model/index'

interface IProps {
  handleClose: () => void
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  userData?: User
  userId?: number
  userName?: string
}

export function DeleteUserModal({
  handleClose,
  isOpen,
  setIsOpen,
  userData,
  userId,
  userName,
}: IProps) {
  const { onDelete } = useDeleteUser({ handleClose, userId, userName })
  const { t } = useTranslation(['profile'])

  return (
    <ConfirmationModal
      bodyText={t('areYouSureYouWantToDeleteUser') + `${userData?.userName}?`}
      headerText={`${t('deleteUser')}`}
      isModalOpen={isOpen}
      onYesAction={onDelete}
      setModalOpen={setIsOpen}
      userData={userData}
    />
  )
}
