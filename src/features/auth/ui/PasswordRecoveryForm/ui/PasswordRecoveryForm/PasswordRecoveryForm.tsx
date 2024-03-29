import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { AppRoutes } from 'shared/constants/path'
import { AppLink, Button, FormWrapper, Input, PageLoader } from 'shared/ui'

import { useRecoverPassword } from '../../model'
import cls from './PasswordRecoveryForm.module.scss'

export interface PasswordRecoveryValidation {
  email: string
}

export const PasswordRecoveryForm = () => {
  const { t } = useTranslation('auth')
  const {
    clearErrors,
    getValues,
    handleSubmit,
    register,
    setValue,
    validErrors: { emailError, recaptchaError },
  } = useValidationForm(['email', 'recaptcha'])
  const { error, isInfoTextShown, isLoading, isSuccess, onSubmit } = useRecoverPassword()

  useEffect(() => {
    if (isSuccess) {
      setValue('recaptcha', '')
    }
  }, [isSuccess])

  if (isLoading) {
    return <PageLoader />
  }

  const isDisabledValidation = !!getValues().email && !!getValues().recaptcha

  const getRecaptchaValueHandler = (value: null | string) => {
    if (value) {
      setValue('recaptcha', value)
      clearErrors('recaptcha')
    }
  }

  return (
    <FormWrapper className={cls.rootWrapper} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cls.title}>{t('forgotPassword')}</h2>
      <Input
        {...register('email')}
        className={cls.input}
        errorText={emailError}
        placeholder={`${t('email')}`}
        type={'email'}
      />
      <p className={cls.helperText}>{t('passwordRecovery')}</p>

      {!!error?.response?.data.messages.length && (
        <p className={cls.error}>{error.response.data.messages[0].message}</p>
      )}

      {isInfoTextShown && <p className={cls.infoText}>{t('recoveryMessage')}</p>}
      <Button className={cls.button} disabled={!isDisabledValidation || isLoading} type={'submit'}>
        {isInfoTextShown ? t('sendLinkAgain') : t('sendLink')}
      </Button>
      <AppLink active href={AppRoutes.AUTH.LOGIN}>
        {t('backToSignIn')}
      </AppLink>
      <ReCAPTCHA
        {...register('recaptcha')}
        className={cls.recaptcha}
        hl={'en'}
        onChange={getRecaptchaValueHandler}
        onExpired={() => setValue('recaptcha', '')}
        sitekey={`${process.env.RECAPTCHA_SITE_KEY as string}`}
        theme={'dark'}
      />
      {recaptchaError && <p className={cls.error}>{recaptchaError}</p>}
    </FormWrapper>
  )
}
