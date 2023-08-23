import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useGetMyPost } from 'features/profile/getPosts/model'
import { useGetProfileData } from 'features/profile/getProfileData/model'
import { Header } from 'entities/Post/ui/Header'
import { MyPostService } from 'shared/api/post/myPostService'
import catImg from 'shared/assets/images/MicrosoftTeams-image.png'
import { Button, Card, Modal, Textarea } from 'shared/ui'

import cls from './styles.module.scss'

interface IProps {
    isOpen: boolean
    postId: number
    id: number
    handleClose: () => void
}

function EditPostModal ({ id, isOpen, handleClose, postId }: IProps) {
    const { response } = useGetProfileData()
    const userData = response?.data
    const { post } = useGetMyPost(postId)

    const {
        register, formState: { errors }, handleSubmit, reset
    } = useForm({
        defaultValues: {
            description: post?.description || ''
        }
    })

    const { mutate } = useMutation({
        mutationFn: ({ postId, data }: { postId: number, data: Record<'description', string> }) =>
            MyPostService.editPost(postId, data),
        retry: false
    })

    const saveChanges = (data: Record<'description', string>) => {
        mutate({ postId, data })
    }

    useEffect(() => {
        reset({ description: post?.description })
    }, [post, reset])

    return (
        <Modal id={id} isOpen={isOpen} onClose={handleClose} title="Edit Post" className={cls.modalContainer}>
            <form className={cls.container} onSubmit={handleSubmit(saveChanges)}>
                <Card cardWrapperClassName={cls.cardWrapperClassName}
                      src={post?.images[0]?.versions.huge.url || ''}
                      alt="card" />

                <div className={cls.rightBlock}>
                    <Header avatarURL={catImg.src} title={userData?.userName || ''} />
                    <div className={cls.textareaContainer}>
                        <Textarea
                            {...register('description',
                                { maxLength: { value: 500, message: 'Max length of description is 500 characters' } })}
                            id="description"
                            label="Add publication descriptions"
                            labelClassName={cls.label}
                            textareaClassName={cls.textarea}
                            className={cls.wrapper}
                            errorText={errors.description?.message}
                        />
                        <div className={cls.info}>200/500</div>
                    </div>
                    <Button type="submit" theme="primary" className={cls.button}>Save Changes</Button>
                </div>
            </form>
        </Modal>
    )
}

export default EditPostModal
