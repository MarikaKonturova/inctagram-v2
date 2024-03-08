import clsx from 'clsx'
import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Modal } from 'shared/ui'

import cls from './ConfirmationModal.module.scss'

interface ConfirmationModalProps {
  bodyText: string
  className?: string
  confirmText?: string
  headerText: string
  isDisabled?: boolean
  isModalOpen: boolean
  noText?: string
  onNoAction?: () => void
  onYesAction: () => void
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  bodyText,
  className,
  confirmText,
  headerText,
  isDisabled,
  isModalOpen,
  noText,
  onNoAction,
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
            disabled={isDisabled}
            onClick={onYesClickAction}
            theme={'outline'}
            type={'button'}
          >
            {confirmText ?? `${t('yesConfirm')}`}
          </Button>
          <Button
            className={cls.button}
            disabled={isDisabled}
            onClick={onNoAction ?? onCloseHandler}
            type={'button'}
          >
            {noText ?? `${t('no')}`}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
