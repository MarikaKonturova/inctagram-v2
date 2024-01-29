import clsx from 'clsx'
import { type GeneralInformationFormValues } from 'features/general-information-form/lib/useValidationForm'
import React, { useEffect } from 'react'
import {
  type Control,
  Controller,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { COUNTRIES } from 'shared/constants/countryList'
import { DatePicker, Input, Select, Textarea } from 'shared/ui'

import cls from './Form.module.scss'

interface IProps {
  control: Control<GeneralInformationFormValues, any>
  register: UseFormRegister<GeneralInformationFormValues>
  setValue: UseFormSetValue<GeneralInformationFormValues>
  validErrors: Record<
    'aboutMeError' | 'dateOfBirthError' | 'firstNameError' | 'lastNameError' | 'userNameError',
    string | undefined
  >
  watch: UseFormWatch<GeneralInformationFormValues>
}

export const Form: React.FC<IProps> = props => {
  const { t } = useTranslation(['profile'])
  const { control, register, setValue, validErrors, watch } = props
  const { aboutMeError, dateOfBirthError, firstNameError, lastNameError, userNameError } =
    validErrors
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
        className={cls.wrapper}
        errorText={userNameError}
        id={'userName'}
        isRequired
        label={`${t('username')}`}
        labelClassName={cls.label}
        type={'text'}
        variant={'outline'}
      />

      <Input
        {...register('firstName')}
        className={cls.wrapper}
        errorText={firstNameError}
        id={'name'}
        isRequired
        label={`${t('firstName')}`}
        labelClassName={cls.label}
        type={'text'}
        variant={'outline'}
      />

      <Input
        {...register('lastName')}
        className={cls.wrapper}
        errorText={lastNameError}
        id={'surName'}
        isRequired
        label={`${t('lastName')}`}
        labelClassName={cls.label}
        type={'text'}
        variant={'outline'}
      />

      <Controller
        control={control}
        name={'dateOfBirth'}
        render={({ field: { onChange, value } }) => (
          <div className={cls.wrapper}>
            <label className={cls.label}>{`${t('dateOfBirth')}`}</label>
            <DatePicker
              // to fix touch issue with DatePicker and yup
              errorText={dateOfBirthError}
              onChange={onChange}
              setValue={setValue}
              value={value || new Date().toISOString()}
            />
          </div>
        )}
      />

      <div className={clsx(cls.wrapper, cls.selectContainer)}>
        <Controller
          control={control}
          name={'country'}
          render={({ field: { onChange, value } }) => (
            <Select
              label={`${t('selectCountry')}`}
              onChange={onChange}
              options={Object.keys(COUNTRIES)}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name={'city'}
          render={({ field }) => (
            <Select
              label={`${t('selectCity')}`}
              options={country ? COUNTRIES[country] : []}
              {...field}
            />
          )}
        />
      </div>
      <Textarea
        {...register('aboutMe')}
        className={cls.wrapper}
        errorText={aboutMeError}
        id={'aboutMe'}
        label={`${t('aboutMe')}`}
        labelClassName={cls.label}
        textareaClassName={aboutMeError ? cls.error : cls.textarea}
      />
    </div>
  )
}
