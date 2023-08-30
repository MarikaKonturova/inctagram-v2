import { useTranslation } from 'next-i18next'
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { AppLink, Button, FormWrapper, Input, PageLoader } from 'shared/ui'

import { useRecoverPassword } from '../../model'
import cls from './PasswordRecoveryForm.module.scss'

export interface PasswordRecoveryValidation {
    email: string
}

export const PasswordRecoveryForm = () => {
    const { t } = useTranslation('auth')
    const {
        register,
        handleSubmit,
        clearErrors,
        setValue,
        validErrors: { emailError, recaptchaError }
    } = useValidationForm(['email', 'recaptcha'])
    const { isInfoTextShown, onSubmit, isLoading, error } = useRecoverPassword()

    if (isLoading) return <PageLoader/>

    const getRecaptchaValueHandler = (value: string | null) => {
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
                type={'email'}
                placeholder={`${t('email')}`}
                error={!!emailError}
                errorText={emailError}
                className={cls.input}
            />
            <p className={cls.helperText}>{t('passwordRecovery')}</p>

            {error?.response?.data.message && <p className={cls.error}>
                {error.response.data.message}
            </p>}

            {isInfoTextShown && <p className={cls.infoText}>
                {t('recoveryMessage')}
            </p>}
            <Button
                disabled={isLoading}
                type={'submit'}
                className={cls.button}
            >
                {isInfoTextShown ? t('sendLinkAgain') : t('sendLink')}
            </Button>
            <AppLink active href={AppRoutes.AUTH.LOGIN}>{t('backToSignIn')}</AppLink>
            <ReCAPTCHA
                {...register('recaptcha')}
                theme="dark"
                hl="en"
                className={cls.recaptcha}
                onChange={getRecaptchaValueHandler}
                sitekey={`${process.env.RECAPTCHA_SITE_KEY as string}`}
            />
            {recaptchaError && <p className={cls.error}>{recaptchaError}</p>}
        </FormWrapper>
    )
}
