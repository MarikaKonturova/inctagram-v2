import clsx from 'clsx'
import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { useRegistration } from 'features/auth/model'
import { SocialIcons } from 'features/auth/ui/socialIcons/SocialIcons'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { type FC, memo } from 'react'
import { AppRoutes } from 'shared/constants/path'
import { AppLink, Button, Checkbox, FormWrapper, Input } from 'shared/ui'

import cls from './RegisterForm.module.scss'

export const RegisterForm: FC = memo(() => {
  const { t } = useTranslation('auth')

  const {
    handleSubmit,
    isValid,
    register,
    reset,
    setError,
    validErrors: { confPasswordError, emailError, passwordError, userNameError },
    watch,
  } = useValidationForm(['email', 'password', 'userName', 'confPassword'])
  const { isLoading, onSubmit } = useRegistration(setError, reset)
  const isAgree = watch('isAgree')

  return (
    <FormWrapper className={cls.register} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cls.title}>{t('signUp')}</h2>
      <SocialIcons type={'Registration'} />
      <Input
        {...register('userName')}
        className={cls.input}
        errorText={userNameError}
        placeholder={`${t('userName')}`}
        type={'text'}
      />
      <Input
        {...register('email')}
        className={cls.input}
        errorText={emailError}
        placeholder={`${t('email')}`}
        type={'text'}
      />
      <Input
        {...register('password')}
        className={cls.input}
        errorText={passwordError}
        placeholder={`${t('password')}`}
        type={'password'}
      />
      <Input
        {...register('confPassword')}
        className={clsx(cls.input, cls.confirmation)}
        errorText={confPasswordError}
        placeholder={`${t('passwordConfirmation')}`}
        type={'password'}
      />
      <div className={cls.agreementField}>
        <Checkbox {...register('isAgree')} defaultChecked={false} />
        {t('iAgree')}
        <Link className={cls.link} href={AppRoutes.AUTH.TERMS_OF_SERVICE}>
          {t('termsOfService')}
        </Link>{' '}
        {t('and')}
        <Link className={cls.link} href={AppRoutes.AUTH.PRIVACY_POLICY}>
          {t('privacyPolicy')}
        </Link>
      </div>
      <Button
        className={cls.button}
        data-testid={'sign-up-submit'}
        disabled={!isAgree || !isValid || isLoading}
        type={'submit'}
      >
        {t('signUp')}
      </Button>
      <p className={cls.text}>{t('account')}</p>
      <AppLink active className={'active'} href={AppRoutes.AUTH.LOGIN}>
        {t('signIn')}
      </AppLink>
    </FormWrapper>
  )
})
