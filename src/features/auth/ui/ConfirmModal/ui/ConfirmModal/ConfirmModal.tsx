import clsx from 'clsx'
import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'features/auth/model'
import { SelectEmail } from 'features/auth/model/selectors'
import { useModal } from 'shared/hooks/useModal'
import { Button, Modal } from 'shared/ui'
import cls from './ConfirmModal.module.scss'

interface ConfirmModalProps {
    className?: string
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ className }) => {
    const { t } = useTranslation()
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
                <div className={cls.text}>{t('We have sent a link to confirm your email to')} {email}</div>
                <Button onClick={onCloseHandler} className={cls.button}>OK</Button>
            </div>
        </Modal>
    )
}
