import clsx from 'clsx'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import userPhoto from 'shared/assets/images/user.png'
import { BUTTON_VARIANTS } from 'shared/constants'
import { User } from 'shared/types/auth'
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
  userData?: User
  userName?: string
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
  userData,
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
        <div className={cls.contentBox}>
          {userData && (
            <Image
              alt={userData?.userName || 'Photo'}
              className={cls.userAvatar}
              height={50}
              src={userData?.avatars.medium.url || userPhoto}
              width={50}
            />
          )}
          <p className={cls.message}>{bodyText}</p>
        </div>
        <div className={cls.flex}>
          <Button
            className={cls.button}
            disabled={isDisabled}
            onClick={onYesClickAction}
            theme={BUTTON_VARIANTS.OUTLINE}
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
