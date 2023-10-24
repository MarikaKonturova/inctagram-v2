import { type FC, useEffect, useState } from 'react'
import { useModal } from 'shared/hooks/useModal'
import { type ProfileDataModel } from 'shared/types/auth'
import { Button } from 'shared/ui'
import cls from './GeneralInformationForm.module.scss'
import { useValidationForm } from './lib'
import { useUpdateProfileData } from './model'
import { AvatarBlock, AvatarModal, Form } from './ui'

interface IProps {
    userData?: ProfileDataModel
}

export const GeneralInformationForm: FC<IProps> = ({ userData }) => {
    const [avatar, setAvatar] = useState<string>()
    const { setIsOpen } = useModal()

    const {
        register,
        control,
        handleSubmit,
        reset,
        setError,
        validErrors
    } = useValidationForm(['userName', 'firstName', 'lastName'], userData)
    const { mutate, responseError } = useUpdateProfileData(setError)

    const onAvatarClick = () => {
        setAvatar(undefined)
    }

    const addProfilePhotoClick = () => {
        setIsOpen(true)
        setAvatar(undefined)
    }

    const onSubmit = (data: Omit<ProfileDataModel, 'id' | 'avatars'>) => {
        mutate(data)
    }

    useEffect(() => {
        reset(userData)
        if (userData?.avatars !== null) {
            setAvatar(userData?.avatars.medium.url)
        }
    }, [userData, reset])

    return <form onSubmit={handleSubmit(onSubmit)}>
        <AvatarModal setAvatar={setAvatar} />
        <div className={cls.infoContainer}>
            <AvatarBlock avatar={avatar} onAvatarClick={onAvatarClick} addProfilePhotoClick={addProfilePhotoClick} />
            <Form control={control} register={register} validErrors={validErrors} responseError={responseError}/>
        </div>
        <hr className={cls.line} />
        <Button type="submit" theme={'primary'} className={cls.button}>Save Changes</Button>
    </form>
}
