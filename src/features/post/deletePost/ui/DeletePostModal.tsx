import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { ConfirmationModal } from 'shared/ui'

import { useDeleteMutation } from '../model'

interface IProps {
  handleClose: () => void
  isOpen: boolean
  postId: number
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function DeletePostModal({ handleClose, isOpen, postId, setIsOpen }: IProps) {
  const { onDelete } = useDeleteMutation({ handleClose, postId })
  const { t } = useTranslation(['profile'])

  return (
    <ConfirmationModal
      bodyText={t('areYouSureYouWantToDeletePost')}
      headerText={`${t('deletePost')}`}
      isModalOpen={isOpen}
      onYesAction={onDelete}
      setModalOpen={setIsOpen}
    />
  )
}
