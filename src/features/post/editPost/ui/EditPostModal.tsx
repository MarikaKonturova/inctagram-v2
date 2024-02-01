import { Header, useGetMyPost } from 'entities/Post'
import { useGetProfileData } from 'entities/Profile'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
      title={'Edit Post'}
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
                maxLength: { message: 'Max length of description is 500 characters', value: 500 },
              })}
              className={cls.wrapper}
              errorText={errors.description?.message}
              id={'description'}
              label={'Add publication descriptions'}
              labelClassName={cls.label}
              textareaClassName={cls.textarea}
            />
            <div className={cls.info}>200/500</div>
          </div>
          <Button className={cls.button} theme={'primary'} type={'submit'}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}
