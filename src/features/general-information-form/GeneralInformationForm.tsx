import { type FC, useEffect, useState } from 'react'

import { useModal } from 'shared/hooks/useModal'
import { type ProfileInfoType } from 'shared/types/profile'
import { Button } from 'shared/ui'

import cls from './GeneralInformationForm.module.scss'
import { useValidationForm } from './lib'
import { useUpdateProfileData } from './model'
import { AvatarBlock, AvatarModal, Form } from './ui'

interface IProps {
    userData?: ProfileInfoType
}

export const GeneralInformationForm: FC<IProps> = ({ userData }) => {
    const [avatar, setAvatar] = useState<string>()
    const { setIsOpen } = useModal()
    const { mutate } = useUpdateProfileData()

    const {
        register,
        control,
        handleSubmit,
        reset,
        validErrors
    } = useValidationForm(['userName', 'name', 'surName', 'city', 'aboutMe'], userData)

    const onAvatarClick = () => {
        setIsOpen(true)
    }

    const addProfilePhotoClick = () => {
        setAvatar(undefined)
    }

    const onSubmit = (data: ProfileDataModel) => {
        mutate(data)
    }

    useEffect(() => {
        reset(userData)
        setAvatar(userData?.avatarUrl?.replace('FILES_URL=', ''))
    }, [userData, reset])

    return <form onSubmit={handleSubmit(onSubmit)}>
        <AvatarModal setAvatar={setAvatar} />
        <div className={cls.infoContainer}>
            <AvatarBlock avatar={avatar} onAvatarClick={onAvatarClick} addProfilePhotoClick={addProfilePhotoClick} />
            <Form control={control} register={register} validErrors={validErrors} />
        </div>
        <hr className={cls.line} />
        <Button type="submit" theme={'primary'} className={cls.button}>Save Changes</Button>
    </form>
}
