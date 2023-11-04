import clsx from 'clsx'
import React, { useEffect, useTransition } from 'react'
import {
    Controller,
    type Control,
    type UseFormRegister,
    type UseFormSetValue,
    type UseFormWatch
} from 'react-hook-form'

import { useTranslation } from 'react-i18next'
import { type GeneralInformationFormValues } from 'features/general-information-form/lib/useValidationForm'
import { COUNTRIES } from 'shared/constants/countryList'
import { DatePicker, Input, Select, Textarea } from 'shared/ui'
import cls from './Form.module.scss'

interface IProps {
    register: UseFormRegister<GeneralInformationFormValues>
    validErrors: Record<
    'firstNameError'
    | 'userNameError'
    | 'lastNameError'
    | 'aboutMeError' | 'dateOfBirthError', string | undefined>
    control: Control<GeneralInformationFormValues, any>
    setValue: UseFormSetValue<GeneralInformationFormValues>
    watch: UseFormWatch<GeneralInformationFormValues>
}

export const Form: React.FC<IProps> = (props) => {
    const { t } = useTranslation()
    const {
        register,
        validErrors,
        control,
        setValue,
        watch
    } = props
    const {
        userNameError,
        firstNameError,
        lastNameError,
        aboutMeError,
        dateOfBirthError
    } = validErrors
    const country = watch('country')
    const city = watch('city')
    useEffect(() => {
        if (country && city && !COUNTRIES[country]?.includes(city)) {
            setValue('city', '')
        }
    }, [country, city])

    return (
        <div className={cls.formsContainer}>
            <Input
                {...register('userName')}
                id="userName"
                type={'text'}
                errorText={userNameError}
                className={cls.wrapper}
                variant='outline'
                isRequired
                label="Username"
                labelClassName={cls.label}
            />

            <Input
                {...register('firstName')}
                id="name"
                type={'text'}
                label="First Name"
                errorText={firstNameError}
                className={cls.wrapper}
                variant='outline'
                isRequired
                labelClassName={cls.label}
            />

            <Input
                {...register('lastName')}
                id="surName"
                type={'text'}
                label="Last Name"
                errorText={lastNameError}
                className={cls.wrapper}
                variant='outline'
                isRequired
                labelClassName={cls.label}
            />

            <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, value } }) => (
                    <div className={cls.wrapper}>
                        <label className={cls.label}>{`${t('dateOfBirth')}`}</label>
                        <DatePicker
                            value={value || new Date().toISOString()}
                            onChange={onChange}
                            setValue={setValue}
                            // to fix touch issue with DatePicker and yup
                            errorText={dateOfBirthError}/>
                    </div>
                )}
            />

            <div className={clsx(cls.wrapper, cls.selectContainer)}>
                <Controller
                control={control}
                name="country"
                render={({ field: { onChange, value } }) => (
                    <Select options={Object.keys(COUNTRIES)}
                            label="Select your country"
                            value={value}
                            onChange={onChange} />
                )} />
                <Controller
                control={control}
                name="city"
                render={({ field }) => (
                    <Select options={country ? COUNTRIES[country] : []} label="Select your city" {...field} />
                )} />
            </div>
            <Textarea
                {...register('aboutMe')}
                id="aboutMe"
                label="About me"
                errorText={aboutMeError}
                labelClassName={cls.label}
                textareaClassName={aboutMeError ? cls.error : cls.textarea}
                className={cls.wrapper}
            />
        </div>
    )
}
