import React from 'react'
import CloseIcon from 'shared/assets/icons/general/close.svg'
import { Avatar, Button } from 'shared/ui'

import cls from './AvatarBlock.module.scss'

export const AvatarBlock = ({ avatar, onAvatarClick, addProfilePhotoClick }: any) => (
    <div className={cls.avatarContainer}>
        <div>
            {avatar
                ? (
                    <div className={cls.avatar}>
                        <Avatar size={192} src={avatar} />
                        <button onClick={onAvatarClick} className={cls.imageButton} type="button">
                            <CloseIcon viewBox="0 5 24 24" fill={'#ffffff'} width={'100%'} heigth={'100%'}/>
                        </button>
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
