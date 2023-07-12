import React from 'react'
import { Avatar, Button } from 'shared/ui'

import cls from './AvatarBlock.module.scss'

export const AvatarBlock = ({ avatar, onAvatarClick, addProfilePhotoClick }: any) => (
    <div className={cls.avatarContainer}>
        <div>
            {avatar
                ? (
                    <div className={cls.avatar}>
                        <Avatar size={192} src={avatar} />
                        <button className={cls.imageButton} onClick={onAvatarClick} type="button" />
                    </div>
                )
                : (
                    <Avatar size={192} src={avatar} />
                )}
        </div>
        <Button theme={'outline'} type="button" onClick={addProfilePhotoClick}>
            Add a profile photo
        </Button>
    </div>
)
