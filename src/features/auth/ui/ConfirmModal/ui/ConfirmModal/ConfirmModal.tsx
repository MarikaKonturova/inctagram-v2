import clsx from 'clsx'
import { selectEmail } from 'features/auth'
import { useAuth } from 'features/auth/model'
import { useTranslation } from 'next-i18next'
import { type FC } from 'react'
import { useModal } from 'shared/hooks/useModal'
import { Button, Modal } from 'shared/ui'

import cls from './ConfirmModal.module.scss'

interface ConfirmModalProps {
  className?: string
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ className }) => {
  const { t } = useTranslation('auth')
  const { isOpen, setIsOpen } = useModal()
  const email = useAuth(selectEmail)

  const onCloseHandler = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      className={clsx(cls.Modal, {}, [className])}
      isOpen={isOpen}
      onClose={onCloseHandler}
      title={`${t('Email sent')}`}
    >
      <div className={cls.content}>
        <div className={cls.text}>
          {t('emailConfirmation')} {email}
        </div>
        <Button className={cls.button} onClick={onCloseHandler}>
          OK
        </Button>
      </div>
    </Modal>
  )
}
