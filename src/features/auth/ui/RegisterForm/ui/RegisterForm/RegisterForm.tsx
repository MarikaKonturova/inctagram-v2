import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { type FC, memo } from 'react'
import { SocialIcons } from 'features/auth'
import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { AppRoutes } from 'shared/constants/path'

import { AppLink, Button, FormWrapper, Input } from 'shared/ui'

import { useRegistration } from '../../model'
import cls from './RegisterForm.module.scss'

export const RegisterForm: FC = memo(() => {
    const { t } = useTranslation('auth')

    const {
        register, setError, handleSubmit, isValid,
        validErrors: { passwordError, emailError, confPasswordError, userNameError }
    } =
      useValidationForm(['email', 'password', 'userName', 'confPassword'])
    const { isLoading, onSubmit } = useRegistration(setError)

    return (
        <FormWrapper className={cls.register} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={cls.title}>{t('signUp')}</h2>
            <SocialIcons type={'Registration'}/>
            <Input
                {...register('userName')}
                type={'text'}
                placeholder={`${t('userName')}`}
                errorText={userNameError}
                className={cls.input}/>
            <Input
                {...register('email')}
                type={'email'}
                placeholder={`${t('email')}`}
                errorText={emailError}
                className={cls.input}/>
            <Input
                {...register('password')}
                type={'password'}
                placeholder={`${t('password')}`}
                errorText={passwordError}
                className={cls.input}/>
            <Input
                {...register('confPassword')}
                type={'password'}
                errorText={confPasswordError}
                placeholder={`${t('passwordConfirmation')}`}
                className={clsx(cls.input, cls.confirmation)}/>

            <Button
            data-testid='sign-up-submit'
            disabled={!isValid || isLoading}
            type={'submit'}
            className={cls.button}>
                {t('signUp')}
            </Button>
            <p className={cls.text}>{t('account')}</p>
            <AppLink
            active
            className={'active'}
            href={AppRoutes.AUTH.LOGIN}>
                {t('signIn')}
            </AppLink>
        </FormWrapper>
    )
})
