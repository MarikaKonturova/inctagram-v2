import { Header, useGetMyPost } from 'entities/Post'
import { useGetProfileData } from 'entities/Profile'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import catImg from 'shared/assets/images/MicrosoftTeams-image.png'
import { Button, Card, Modal, Textarea } from 'shared/ui'

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
  const { t } = useTranslation(['profile'])

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

  useEffect(() => {
    reset({ description: post?.description })
  }, [post, reset])

  return (
    <Modal
      className={cls.modalContainer}
      id={id}
      isOpen={isOpen}
      onClose={handleClose}
      title={`${t('editPost')}`}
    >
      <form className={cls.container} onSubmit={handleSubmit(saveChanges)}>
        <Card
          alt={'card'}
          cardWrapperClassName={cls.cardWrapperClassName}
          src={post?.images[0]?.versions.huge.url || ''}
        />

        <div className={cls.rightBlock}>
          <Header avatarURL={catImg.src} title={userData?.userName || ''} />
          <div className={cls.textareaContainer}>
            <Textarea
              {...register('description', {
                maxLength: { message: `${t('maxLengthDescription')}`, value: 500 },
              })}
              className={cls.wrapper}
              errorText={errors.description?.message}
              id={'description'}
              label={`${t('addPublicationDescriptions')}`}
              labelClassName={cls.label}
              textareaClassName={cls.textarea}
            />
            <div className={cls.info}>200/500</div>
          </div>
          <Button className={cls.button} theme={'primary'} type={'submit'}>
            {t('saveChanges')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
