import { Header, useGetMyPost } from 'entities/Post'
import { useGetProfileData } from 'entities/Profile'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Translation } from 'react-i18next'
import userPhoto from 'shared/assets/images/user.png'
import { Button, Card, ConfirmationModal, Modal, Textarea } from 'shared/ui'

import { useEditPost } from '../model'
import cls from './EditPostModal.module.scss'

interface IProps {
  handleClose: () => void
  id: number
  isOpen: boolean
  postId: number
}

export function EditPostModal({ handleClose, id, isOpen, postId }: IProps) {
  const { response } = useGetProfileData()
  const userData = response?.data
  const { post } = useGetMyPost(postId)
  const { saveChanges } = useEditPost(postId)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      description: post?.description || '',
    },
  })

  const openConfirmModal = () => setIsConfirmModalVisible(true)

  const onPositiveHandler = () => {
    handleClose()
    setIsConfirmModalVisible(false)
  }

  useEffect(() => {
    reset({ description: post?.description })
  }, [post, reset])

  return (
    <Translation ns={['post', 'profile']}>
      {t => (
        <Modal
          className={cls.modalContainer}
          id={id}
          isOpen={isOpen}
          onClose={openConfirmModal}
          title={`${t('editPost', { ns: 'profile' })}`}
        >
          <form className={cls.container} onSubmit={handleSubmit(saveChanges)}>
            <Card
              alt={'card'}
              cardWrapperClassName={cls.cardWrapperClassName}
              src={post?.images[0]?.versions.huge.url || ''}
            />

            <div className={cls.rightBlock}>
              <Header
                avatarURL={userData?.avatars?.thumbnail.url}
                title={userData?.userName || ''}
              />
              <Header
                avatarURL={userData?.avatars?.thumbnail.url || userPhoto.src}
                title={userData?.userName || ''}
              />
              <div className={cls.textareaContainer}>
                <Textarea
                  {...register('description', {
                    maxLength: { message: `${t('maxLengthDescription')}`, value: 500 },
                  })}
                  className={cls.wrapper}
                  errorText={errors.description?.message}
                  id={'description'}
                  label={`${t('addPublicationDescriptions', { ns: 'profile' })}`}
                  labelClassName={cls.label}
                  textareaClassName={cls.textarea}
                />
                <div className={cls.info}>200/500</div>
              </div>
              <Button className={cls.button} theme={'primary'} type={'submit'}>
                {t('saveChanges', { ns: 'profile' })}
              </Button>
            </div>
          </form>

          <ConfirmationModal
            bodyText={`${t('saveConfirmationMessage', { ns: 'post' })}`}
            headerText={t('alert', { ns: 'post' })}
            isModalOpen={isConfirmModalVisible}
            onYesAction={onPositiveHandler}
            setModalOpen={setIsConfirmModalVisible}
          />
        </Modal>
      )}
    </Translation>
  )
}
