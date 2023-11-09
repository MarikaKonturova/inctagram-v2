import { type FC, useEffect } from 'react'
import { type ProfileDataModel } from 'shared/types/auth'
import { Button } from 'shared/ui'
import { getInitialValues } from 'shared/utils/getInitialValues'

import cls from './GeneralInformationForm.module.scss'
import { useValidationForm } from './lib'
import { useUpdateProfileData } from './model'
import { Form } from './ui'

interface IProps {
    userData?: ProfileDataModel
}

export const GeneralInformationForm: FC<IProps> = ({ userData }) => {
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
    } = useValidationForm(['userName', 'firstName', 'lastName', 'aboutMe', 'dateOfBirth'],
        defaultValues)
    const { mutate } = useUpdateProfileData(setError)

    const onSubmit = (data: Omit<ProfileDataModel, 'id' | 'avatars'> & { country: string }) => {
        mutate(data)
    }

    useEffect(() => {
        reset(getInitialValues(userData))
    }, [userData, reset])

    return <form onSubmit={handleSubmit(onSubmit)} className={cls.formContainer}>
        <div className={cls.infoContainer}>
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
