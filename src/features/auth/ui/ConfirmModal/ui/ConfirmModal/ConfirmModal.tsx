import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { type FC } from 'react'
import { useAuth } from 'features/auth/model'
import { SelectEmail } from 'features/auth/model/selectors'
import { useModal } from 'shared/hooks/useModal'
import { Button, Modal } from 'shared/ui'
import cls from './ConfirmModal.module.scss'

interface ConfirmModalProps {
    className?: string
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ className }) => {
    const { t } = useTranslation('auth')
    const { isOpen, setIsOpen } = useModal()
    const email = useAuth(SelectEmail)

    const onCloseHandler = () => { setIsOpen(false) }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseHandler}
            title={`${t('Email sent')}`}
            className={clsx(cls.Modal, {}, [className])}
        >
            <div className={cls.content}>
                <div className={cls.text}>{t('emailConfirmation')} {email}</div>
                <Button onClick={onCloseHandler} className={cls.button}>OK</Button>
            </div>
        </Modal>
    )
}
