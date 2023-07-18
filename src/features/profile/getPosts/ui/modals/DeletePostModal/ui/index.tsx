import React from 'react'
import { Button, Modal } from 'shared/ui'
import { useDeleteMutation } from '../model'
import cls from './styles.module.scss'

interface IProps {
    isOpen: boolean
    id: number
    postId: number
    handleClose: () => void
    openEditPostModal: () => void
}

function DeletePostModal ({ isOpen, handleClose, id, postId, openEditPostModal }: IProps) {
    const { onDelete } = useDeleteMutation({ handleClose, postId })

    return (
        <Modal id={id} isOpen={isOpen} onClose={handleClose} title="Delete Post">
            <div className={cls.rootContainer}>
                <p>Are you sure you want to delete this post?</p>
                <div className={cls.buttonsContainer}>
                    <Button type="submit" theme="outline" onClick={onDelete}>Yes</Button>
                    <Button type="submit" theme="primary" onClick={openEditPostModal}>No</Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeletePostModal
