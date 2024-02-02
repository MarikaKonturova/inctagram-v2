import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Modal } from 'shared/ui'

import { useDeleteMutation } from '../model'
import cls from './DeletePostModal.module.scss'

interface IProps {
  handleClose: () => void
  id: number
  isOpen: boolean
  openEditPostModal: () => void
  postId: number
}

export function DeletePostModal({ handleClose, id, isOpen, openEditPostModal, postId }: IProps) {
  const { onDelete } = useDeleteMutation({ handleClose, postId })
  const { t } = useTranslation(['profile'])

  return (
    <Modal id={id} isOpen={isOpen} onClose={handleClose} title={`${t('deletePost')}`}>
      <div className={cls.rootContainer}>
        <p>{t('areYouSureYouWantToDeletePost')}</p>
        <div className={cls.buttonsContainer}>
          <Button onClick={onDelete} theme={'outline'} type={'submit'}>
            {t('yes')}
          </Button>
          <Button onClick={openEditPostModal} theme={'primary'} type={'submit'}>
            {t('no')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
