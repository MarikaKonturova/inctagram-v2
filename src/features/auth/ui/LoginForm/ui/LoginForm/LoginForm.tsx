
import { useTranslation } from 'next-i18next'
import { type FC } from 'react'
import { SocialIcons } from 'features/auth'
import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { AppRoutes } from 'shared/constants/path'
import { type UserLoginModel } from 'shared/types/auth'
import { AppLink, Button, FormWrapper, Input } from 'shared/ui'
import { useLogin } from '../../model'
import cls from './LoginForm.module.scss'

export const LoginForm: FC = () => {
    const { t } = useTranslation('auth')

    const { register, handleSubmit, validErrors: { passwordError, emailError } } =
      useValidationForm(['email', 'password'])

    const { login, isLoading, error } = useLogin()
    const onSubmit = (data: UserLoginModel, event: any): void => {
        event.preventDefault()
        login(data)
    }

    return (
        <FormWrapper className={cls.login} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={cls.title}>{t('signIn')}</h2>
            <SocialIcons type={'Login'}/>
            <Input
                {...register('email')}
                type={'text'}
                placeholder={t('email') ?? ''}
                errorText={emailError}
                className={cls.input}/>
            <Input
                {...register('password')}
                type={'password'}
                placeholder={t('password') ?? ''}
                errorText={passwordError}
                className={cls.input}/>
            <p className={cls.link}>
                <AppLink href={'/auth/password-recovery'}>
                    {t('forgotPassword')}
                </AppLink>
            </p>
            {!!error?.response?.data.messages.length && <p className={cls.error}>
                {error.response.data.messages[0].message}</p>}
            <Button data-testid='sign-in-submit'
                    disabled={isLoading}
                    type={'submit'}
                    className={cls.button}>
                {t('signIn')}
            </Button>
            <p className={cls.text}>{t('account')}</p>
            <AppLink
             active
             className={'active'}
             href={AppRoutes.AUTH.REGISTRATION}>
                {t('signUp')}
            </AppLink>
        </FormWrapper>
    )
}
