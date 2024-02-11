import { AvatarModal, useDeleteAvatar } from 'features/profile/avatar'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CloseIcon from 'shared/assets/icons/general/close.svg'
import { type AvatarPostModel, AvatarSizes } from 'shared/types/post'
import { Avatar, Button, ConfirmationModal } from 'shared/ui'

import cls from './AvatarBlock.module.scss'

export const AvatarBlock = ({ avatars }: { avatars: AvatarPostModel | null | undefined }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string | undefined>(avatars?.medium.url)
  const { deleteAvatar, isLoading } = useDeleteAvatar(setDeleteModalOpen, setAvatar)
  const { t } = useTranslation(['common'])

  const onDeleteButtonClick = () => {
    setDeleteModalOpen(true)
  }

  const addProfilePhotoClick = () => {
    setIsOpen(true)
  }

  const deleteAvatarConfirmationClick = () => {
    deleteAvatar()
  }

  useEffect(() => {
    setAvatar(avatars?.medium.url)
  }, [avatars])

  return (
    <div className={cls.avatarContainer}>
      <AvatarModal isOpen={isOpen} setAvatar={setAvatar} setIsOpen={setIsOpen} />
      <div>
        {avatar ? (
          <div className={cls.avatar}>
            <ConfirmationModal
              bodyText={`${t('deletePhotoMessage')}`}
              headerText={`${t('deletePhotoHeader')}`}
              isLoading={isLoading}
              isModalOpen={deleteModalOpen}
              onYesAction={deleteAvatarConfirmationClick}
              setModalOpen={setDeleteModalOpen}
            />
            <Avatar size={AvatarSizes.large} src={avatar} />
            <button className={cls.imageButton} onClick={onDeleteButtonClick} type={'button'}>
              <CloseIcon fill={'#ffffff'} heigth={'100%'} viewBox={'0 5 24 24'} width={'100%'} />
            </button>
          </div>
        ) : (
          <Avatar size={AvatarSizes.large} src={avatar} />
        )}
      </div>
      <Button onClick={addProfilePhotoClick} theme={'outline'} type={'button'}>
        {t('addProfilePhoto')}
      </Button>
    </div>
  )
}
