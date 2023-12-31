import clsx from 'clsx'
import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import cls from 'shared/ui/ConfirmationModal/ConfirmationModal.module.scss'
import { Button, Modal } from 'shared/ui/index'

interface ConfirmationModalProps {
    className?: string
    isModalOpen: boolean
    onYesAction: () => void
    setModalOpen: Dispatch<SetStateAction<boolean>>
    isLoading?: boolean
}

export const ConfirmationModal: FC<ConfirmationModalProps> = (
    { className, isModalOpen, onYesAction, setModalOpen, isLoading }) => {
    const { t } = useTranslation('common')
    const onCloseHandler = () => { setModalOpen(false) }

    const onYesClickAction = () => { onYesAction() }

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={onCloseHandler}
            title={`${t('deletePhotoHeader')}`}
            className={clsx(cls.Modal, {}, [className])}
        >
            <div className={cls.content}>
                <p className={cls.message}>{`${t('deletePhotoMessage')}`}</p>
                <div className={cls.flex}>
                    <Button
                        className={cls.button}
                        onClick={onYesClickAction}
                        theme={'outline'}
                        type={'button'}
                        disabled={isLoading}
                    >{`${t('yes')}`}
                    </Button>
                    <Button
                        className={cls.button}
                        onClick={onCloseHandler}
                        type={'button'}
                        disabled={isLoading}
                    >{`${t('no')}`}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
