import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import { Button, Modal } from 'shared/ui'

import cls from './ConfirmationModal.module.scss'

interface ConfirmationModalProps {
  bodyText: string
  className?: string
  headerText: string
  isDisabled?: boolean
  isModalOpen: boolean
  onYesAction: () => void
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  bodyText,
  className,
  headerText,
  isDisabled,
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
            disabled={isDisabled}
            onClick={onYesClickAction}
            theme={'outline'}
            type={'button'}
          >
            {`${t('yesConfirm')}`}
          </Button>
          <Button
            className={cls.button}
            disabled={isDisabled}
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
