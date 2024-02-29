import clsx from 'clsx'
import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { useCreatePassword } from 'features/auth/model'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { type FC } from 'react'
import { Button, FormWrapper, Input, PageLoader } from 'shared/ui'

import cls from './NewPasswordForm.module.scss'

interface NewPasswordValidation {
  confPassword?: string
  password: string
}

export const NewPasswordForm: FC = () => {
  const { t } = useTranslation('auth')
  const {
    handleSubmit,
    register,
    validErrors: { confPasswordError, passwordError },
  } = useValidationForm(['password', 'confPassword'])

  const { query } = useRouter()
  const { code } = query

  const { createPassword, isError, isLoading } = useCreatePassword()

  if (isLoading) {
    return <PageLoader />
  }

  const onSubmit = (data: NewPasswordValidation): void => {
    createPassword({ newPassword: data.password, recoveryCode: String(code) })
  }

  return (
    <FormWrapper className={cls.newPassword} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={cls.title}>{t('createNewPassword')}</h1>
      <Input
        {...register('password')}
        className={cls.input}
        errorText={passwordError}
        placeholder={t('newPassword') ?? ''}
        type={'password'}
      />
      <Input
        {...register('confPassword')}
        className={clsx(cls.input, cls.confirmation)}
        errorText={confPasswordError}
        placeholder={t('passwordConfirmation') ?? ''}
        type={'password'}
      />
      <Button type={'submit'}>{t('createNewPassword')}</Button>
    </FormWrapper>
  )
}
