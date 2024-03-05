import clsx from 'clsx'
import { type GeneralInformationFormValues } from 'features/general-information-form/lib/useValidationForm'
import i18next from 'i18next'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import {
  type Control,
  Controller,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from 'react-hook-form'
import { COUNTRIES_EN, COUNTRIES_RU } from 'shared/constants/countryList'
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
  const lang = i18next.language
  const { control, register, setValue, validErrors, watch } = props
  const { aboutMeError, dateOfBirthError, firstNameError, lastNameError, userNameError } =
    validErrors
  const country = watch('country')
  const city = watch('city')

  useEffect(() => {
    if (
      country &&
      city &&
      !COUNTRIES_EN[country]?.includes(city) &&
      !COUNTRIES_RU[country]?.includes(city)
    ) {
      setValue('city', '')
    } else if (country && city && COUNTRIES_EN[country]?.includes(city)) {
      if (lang === 'ru') {
        setValue('city', ``)
        setValue('country', ``)
      }
    } else if (country && city && COUNTRIES_RU[country]?.includes(city)) {
      if (lang === 'en') {
        setValue('city', ``)
        setValue('country', ``)
      }
    }
  }, [country, city, lang])

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
              className={cls.select}
              label={`${t('selectCountry')}`}
              onChange={onChange}
              options={lang === 'en' ? Object.keys(COUNTRIES_EN) : Object.keys(COUNTRIES_RU)}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name={'city'}
          render={({ field }) => (
            <Select
              className={cls.select}
              label={`${t('selectCity')}`}
              options={
                // eslint-disable-next-line no-nested-ternary
                country
                  ? COUNTRIES_EN[country]
                    ? COUNTRIES_EN[country]
                    : COUNTRIES_RU[country]
                  : []
              }
              {...field}
            />
          )}
        />
      </div>
      <Textarea
        {...register('aboutMe')}
        charactersCount={watch('aboutMe')?.length}
        className={cls.wrapper}
        errorText={aboutMeError}
        id={'aboutMe'}
        label={`${t('aboutMe')}`}
        labelClassName={cls.label}
        maxCharactersCount={200}
        textareaClassName={cls.textarea}
      />
    </div>
  )
}
