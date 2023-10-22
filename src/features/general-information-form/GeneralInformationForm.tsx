import { type FC, useEffect } from 'react'
import { type ProfileDataModel } from 'shared/types/auth'
import { Button } from 'shared/ui'
import cls from './GeneralInformationForm.module.scss'
import { useValidationForm } from './lib'
import { useUpdateProfileData } from './model'
import { Form } from './ui'

interface IProps {
    userData?: ProfileDataModel
}

export const GeneralInformationForm: FC<IProps> = ({ userData }) => {
    const { mutate } = useUpdateProfileData()

    const {
        register,
        control,
        handleSubmit,
        reset,
        validErrors
    } = useValidationForm(['userName', 'firstName', 'lastName', 'city', 'aboutMe'], userData)

    const onSubmit = (data: Omit<ProfileDataModel, 'id' | 'avatars'>) => {
        mutate(data)
    }

    useEffect(() => {
        reset(userData)
    }, [userData, reset])

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cls.infoContainer}>
            <Form control={control} register={register} validErrors={validErrors} />
        </div>
        <hr className={cls.line} />
        <Button type="submit" theme={'primary'} className={cls.button}>Save Changes</Button>
    </form>
}
