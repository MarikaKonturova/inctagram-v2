import React from 'react'
import { type Control, Controller, type UseFormRegister } from 'react-hook-form'

import { type ProfileInfoType } from 'shared/types/profile'
import { DatePicker, Input, Textarea } from 'shared/ui'
import cls from './Form.module.scss'

interface IProps {
    register: UseFormRegister<ProfileInfoType>
    validErrors: Record<
    'nameError'
    | 'userNameError'
    | 'surNameError'
    | 'cityError'
    | 'aboutMeError', string | undefined>
    control: Control<ProfileInfoType, any>
}

export const Form: React.FC<IProps> = ({ register, validErrors, control }) => {
    const {
        userNameError,
        nameError,
        surNameError,
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
                {...register('name')}
                id="name"
                type={'text'}
                label="First Name"
                error={!!nameError}
                errorText={nameError}
                className={cls.wrapper}
                labelClassName={cls.label}
            />

            <Input
                {...register('surName')}
                id="surName"
                type={'text'}
                label="Last Name"
                error={!!surNameError}
                errorText={surNameError}
                className={cls.wrapper}
                labelClassName={cls.label}
            />

            <Controller
                control={control}
                name="dateOfBirthday"
                render={({ field: { onChange, value } }) => (
                    <div className={cls.wrapper}>
                        <label className={cls.label}>Date of birthday</label>
                        <DatePicker value={value} onChange={onChange} />
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
