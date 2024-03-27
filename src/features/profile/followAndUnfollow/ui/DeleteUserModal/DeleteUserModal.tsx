import { useTranslation } from 'next-i18next'
import React, { Dispatch, SetStateAction } from 'react'
import { ConfirmationModal } from 'shared/ui'

import { useDeleteUser } from '../../model/index'

interface IProps {
  handleClose: () => void
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  userId?: number
  userName?: string
}

export function DeleteUserModal({ handleClose, isOpen, setIsOpen, userId, userName }: IProps) {
  const { onDelete } = useDeleteUser({ handleClose, userId, userName })
  const { t } = useTranslation(['profile'])

  return (
    <ConfirmationModal
      bodyText={t('areYouSureYouWantToDeleteUser') + `${userName}?`}
      headerText={`${t('deleteUser')}`}
      isModalOpen={isOpen}
      onYesAction={onDelete}
      setModalOpen={setIsOpen}
    />
  )
}
