import React, { useEffect, useState } from 'react'
import { useDeleteAvatar } from 'features/profile/avatar/model/deleteAvatar'
import cls from 'features/profile/avatar/ui/AvatarBlock/AvatarBlock.module.scss'
import { AvatarModal } from 'features/profile/avatar/ui/AvatarModal/AvatarModal'
import CloseIcon from 'shared/assets/icons/general/close.svg'
import { type AvatarPostModel } from 'shared/types/post'
import { Avatar, Button } from 'shared/ui'

export const AvatarBlock = ({ avatars }: { avatars: AvatarPostModel | null | undefined }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<string | undefined>(avatars?.medium.url)
    const { deleteAvatar } = useDeleteAvatar(setIsOpen, setAvatar)

    const onDeleteAvatarClick = () => {
        deleteAvatar()
    }

    const addProfilePhotoClick = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        if (avatars) {
            setAvatar(avatars.medium.url)
        }
    }, [avatars])

    return (
        <div className={cls.avatarContainer}>
            <AvatarModal setAvatar={setAvatar} isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div>
                {avatar
                    ? (
                        <div className={cls.avatar}>
                            <Avatar size={192} src={avatar}/>
                            <button onClick={onDeleteAvatarClick} className={cls.imageButton} type="button">
                                <CloseIcon viewBox="0 5 24 24" fill={'#ffffff'} width={'100%'} heigth={'100%'}/>
                            </button>
                        </div>
                    )
                    : (
                        <Avatar size={192} src={avatar}/>
                    )}
            </div>
            <Button theme={'outline'} type="button" onClick={addProfilePhotoClick}>
                Add a profile photo
            </Button>
        </div>
    )
}
