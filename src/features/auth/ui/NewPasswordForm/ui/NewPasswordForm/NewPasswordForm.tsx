import clsx from 'clsx'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { type FC } from 'react'

import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { Button, FormWrapper, Input, PageLoader } from 'shared/ui'
import { useCreatePassword } from '../../model'
import cls from './NewPasswordForm.module.scss'

interface NewPasswordValidation {
    password: string
    confPassword?: string
}

export const NewPasswordForm: FC = () => {
    const { t } = useTranslation('auth')
    const {
        register,
        handleSubmit,
        validErrors: { passwordError, confPasswordError }
    } = useValidationForm(['password', 'confPassword'])

    const { query } = useRouter()
    const { code } = query

    const { createPassword, isError, isLoading } = useCreatePassword()
    if (isLoading) return <PageLoader/>

    const onSubmit = (data: NewPasswordValidation): void => {
        createPassword({ recoveryCode: String(code), newPassword: data.password })
    }

    return (
        <FormWrapper className={cls.newPassword} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={cls.title}>{t('createNewPassword')}</h1>
            <Input
                {...register('password')}
                type="password"
                placeholder={t('newPassword') ?? ''}
                errorText={passwordError}
                className={cls.input}
            />
            <Input
                {...register('confPassword')}
                type="password"
                placeholder={t('passwordConfirmation') ?? ''}
                errorText={confPasswordError}
                className={clsx(cls.input, cls.confirmation)}
            />
            <Button type={'submit'}>{t('createNewPassword')}</Button>
        </FormWrapper>
    )
}
