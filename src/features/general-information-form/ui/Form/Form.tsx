import React from 'react'
import { type Control, Controller, type UseFormRegister } from 'react-hook-form'

import { type ProfileDataModel } from 'shared/types/auth'
import { DatePicker, Input, Textarea } from 'shared/ui'
import cls from './Form.module.scss'

interface IProps {
    register: UseFormRegister<ProfileDataModel>
    validErrors: Record<
    'firstNameError'
    | 'userNameError'
    | 'lastNameError'
    | 'cityError'
    | 'aboutMeError', string | undefined>
    control: Control<ProfileDataModel, any>
}

export const Form: React.FC<IProps> = ({ register, validErrors, control }) => {
    const {
        userNameError,
        firstNameError,
        lastNameError,
        cityError,
        aboutMeError
    } = validErrors

    return (
        <div className={cls.formsContainer}>
            <Input
                {...register('userName')}
                id="userName"
                type={'text'}
                error={!!userNameError}
                errorText={userNameError}
                className={cls.wrapper}
                label="Username"
                labelClassName={cls.label}
            />

            <Input
                {...register('firstName')}
                id="name"
                type={'text'}
                label="First Name"
                error={!!firstNameError}
                errorText={firstNameError}
                className={cls.wrapper}
                labelClassName={cls.label}
            />

            <Input
                {...register('lastName')}
                id="surName"
                type={'text'}
                label="Last Name"
                error={!!lastNameError}
                errorText={lastNameError}
                className={cls.wrapper}
                labelClassName={cls.label}
            />

            <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, value } }) => (
                    <div className={cls.wrapper}>
                        <label className={cls.label}>Date of birthday</label>
                        <DatePicker value={value || new Date().toISOString()} onChange={onChange} />
                    </div>
                )}
            />

            <Input
                {...register('city')}
                id="city"
                type={'text'}
                label="City"
                className={cls.wrapper}
                labelClassName={cls.label}
                error={!!cityError}
                errorText={cityError}
            />

            <Textarea
                {...register('aboutMe')}
                id="aboutMe"
                label="About me"
                labelClassName={cls.label}
                textareaClassName={cls.textarea}
                className={cls.wrapper}
                errorText={aboutMeError}
            />
        </div>
    )
}
