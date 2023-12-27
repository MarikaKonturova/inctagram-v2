import clsx from 'clsx'
import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import cls from 'shared/ui/ConfirmationModal/ConfirmationModal.module.scss'
import { Button, Modal } from 'shared/ui/index'

interface ConfirmationModalProps {
  bodyText: string
  className?: string
  headerText: string
  isLoading?: boolean
  isModalOpen: boolean
  onYesAction: () => void
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  bodyText,
  className,
  headerText,
  isLoading,
  isModalOpen,
  onYesAction,
  setModalOpen,
}) => {
  const { t } = useTranslation('auth')
  const onCloseHandler = () => {
    setModalOpen(false)
  }

  const onYesClickAction = () => {
    onYesAction()
  }

  return (
    <Modal
      className={clsx(cls.Modal, {}, [className])}
      isOpen={isModalOpen}
      onClose={onCloseHandler}
      title={headerText}
    >
      <div className={cls.content}>
        <p className={cls.message}>{bodyText}</p>
        <div className={cls.flex}>
          <Button
            className={cls.button}
            disabled={isLoading}
            onClick={onYesClickAction}
            theme={'outline'}
            type={'button'}
          >
            {`${t('yesConfirm')}`}
          </Button>
          <Button
            className={cls.button}
            disabled={isLoading}
            onClick={onCloseHandler}
            type={'button'}
          >
            {`${t('no')}`}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
