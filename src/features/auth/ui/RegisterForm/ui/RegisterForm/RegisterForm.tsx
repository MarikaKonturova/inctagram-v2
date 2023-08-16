import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { type FC, memo } from 'react'
import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { AppRoutes } from 'shared/constants/routePath'

import { AppLink, Button, FormWrapper, Input, SocialIcons } from 'shared/ui'

import { useRegistration } from '../../model'
import cls from './RegisterForm.module.scss'

export const RegisterForm: FC = memo(() => {
    const { t } = useTranslation('auth')

    const { register, handleSubmit, validErrors: { passwordError, emailError, confPasswordError, userNameError } } =
      useValidationForm(['email', 'password', 'userName', 'confPassword'])
    const { isLoading, onSubmit, responseError } = useRegistration()

    return (
        <FormWrapper className={cls.register} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={cls.title}>{t('signUp')}</h2>
            <SocialIcons/>
            <Input
                {...register('userName')}
                type={'text'}
                placeholder={`${t('userName')}`}
                error={!!userNameError}
                errorText={userNameError || responseError?.login}
                className={cls.input}/>
            <Input
                {...register('email')}
                type={'email'}
                placeholder={`${t('email')}`}
                error={!!emailError}
                errorText={emailError || responseError?.email}
                className={cls.input}/>
            <Input
                {...register('password')}
                type={'password'}
                placeholder={`${t('password')}`}
                error={!!passwordError}
                errorText={passwordError}
                className={cls.input}/>
            <Input
                {...register('confPassword')}
                type={'password'}
                error={!!confPasswordError}
                errorText={confPasswordError}
                placeholder={`${t('passwordConfirmation')}`}
                className={clsx(cls.input, cls.confirmation)}/>

            <Button
            data-testid='sign-up-submit'
            disabled={isLoading}
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
