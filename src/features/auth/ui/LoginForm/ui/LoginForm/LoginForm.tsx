
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

    const { register, isValid, handleSubmit, validErrors: { passwordError, emailError } } =
      useValidationForm(['email', 'password'])

    const { login, isLoading, error, isSuccess } = useLogin()
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
                className={error ? cls.errorBorder : cls.input}
            />
            <Input
                {...register('password')}
                type={'password'}
                placeholder={t('password') ?? ''}
                errorText={passwordError}
                className={error ? cls.errorBorder : cls.input}
            />
            {error ? <div className={cls.error}>The email or password are incorrect. Try again please</div> : null}
            <p className={cls.link}>
                <AppLink href={'/auth/password-recovery'}>
                    {t('forgotPassword')}
                </AppLink>
            </p>
            <Button data-testid='sign-in-submit'
                    disabled={isLoading || !isValid}
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
