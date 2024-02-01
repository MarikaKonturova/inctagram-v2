import React from 'react'
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

  return (
    <Modal id={id} isOpen={isOpen} onClose={handleClose} title={'Delete Post'}>
      <div className={cls.rootContainer}>
        <p>Are you sure you want to delete this post?</p>
        <div className={cls.buttonsContainer}>
          <Button onClick={onDelete} theme={'outline'} type={'submit'}>
            Yes
          </Button>
          <Button onClick={openEditPostModal} theme={'primary'} type={'submit'}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}
