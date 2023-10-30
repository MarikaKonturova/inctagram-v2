import { type FC, useEffect, useState } from 'react'

import { useModal } from 'shared/hooks/useModal'
import { type ProfileDataModel } from 'shared/types/auth'
import { Button } from 'shared/ui'
import { getInitialValues } from 'shared/utils/getInitialValues'

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
    const defaultValues = getInitialValues(userData)

    const {
        register,
        control,
        handleSubmit,
        reset,
        setError,
        isDirty,
        validErrors,
        setValue,
        watch
    } = useValidationForm(['userName', 'firstName', 'lastName', 'aboutMe'],
        defaultValues)
    const { mutate } = useUpdateProfileData(setError)

    const onAvatarClick = () => {
        setIsOpen(true)
    }

    const addProfilePhotoClick = () => {
        setIsOpen(true)
        setAvatar(undefined)
    }

    const onSubmit = (data: Omit<ProfileDataModel, 'id' | 'avatars'> & { country: string }) => {
        mutate(data)
    }

    useEffect(() => {
        reset(getInitialValues(userData))
        if (userData?.avatars !== null) {
            setAvatar(userData?.avatars.medium.url)
        }
    }, [userData, reset])

    return <form onSubmit={handleSubmit(onSubmit)}>
        <AvatarModal setAvatar={setAvatar} />
        <div className={cls.infoContainer}>
            <AvatarBlock avatar={avatar} onAvatarClick={onAvatarClick} addProfilePhotoClick={addProfilePhotoClick} />
            <Form control={control}
                  register={register}
                  validErrors={validErrors}
                  setValue={setValue}
                  watch={watch} />
        </div>
        <hr className={cls.line} />
        <Button type="submit" theme={'primary'} className={cls.button} disabled={!isDirty}>Save Changes</Button>
    </form>
}
