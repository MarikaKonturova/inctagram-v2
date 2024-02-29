import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { useLogin } from 'features/auth/model'
import { SocialIcons } from 'features/auth/ui/socialIcons/SocialIcons'
import { useTranslation } from 'next-i18next'
import { AppRoutes } from 'shared/constants/path'
import { type UserLoginModel } from 'shared/types/auth'
import { AppLink, Button, FormWrapper, Input } from 'shared/ui'

import cls from './LoginForm.module.scss'

export const LoginForm = () => {
  const { t } = useTranslation('auth')

  const {
    handleSubmit,
    isValid,
    register,
    validErrors: { emailError, passwordError },
  } = useValidationForm(['email', 'password'])

  const { error, isLoading, isSuccess, login } = useLogin()
  const onSubmit = (data: UserLoginModel, event: any): void => {
    event.preventDefault()
    login(data)
  }

  return (
    <FormWrapper className={cls.login} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cls.title}>{t('signIn')}</h2>
      <SocialIcons type={'Login'} />
      <Input
        {...register('email')}
        className={error ? cls.errorBorder : cls.input}
        errorText={emailError}
        placeholder={t('email') ?? ''}
        type={'text'}
      />
      <Input
        {...register('password')}
        className={error ? cls.errorBorder : cls.input}
        errorText={passwordError}
        placeholder={t('password') ?? ''}
        type={'password'}
      />
      {error ? (
        <div className={cls.error}>The email or password are incorrect. Try again please</div>
      ) : null}
      <p className={cls.link}>
        <AppLink href={'/auth/password-recovery'}>{t('forgotPassword')}</AppLink>
      </p>
      <Button
        className={cls.button}
        data-testid={'sign-in-submit'}
        disabled={isLoading || !isValid}
        type={'submit'}
      >
        {t('signIn')}
      </Button>
      <p className={cls.text}>{t('account')}</p>
      <AppLink active className={'active'} href={AppRoutes.AUTH.REGISTRATION}>
        {t('signUp')}
      </AppLink>
    </FormWrapper>
  )
}
