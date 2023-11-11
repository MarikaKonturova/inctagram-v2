import clsx from 'clsx'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { memo, type FC } from 'react'
import { SocialIcons } from 'features/auth'
import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { AppRoutes } from 'shared/constants/path'

import { AppLink, Button, Checkbox, FormWrapper, Input } from 'shared/ui'

import { useRegistration } from '../../model'
import cls from './RegisterForm.module.scss'

export const RegisterForm: FC = memo(() => {
    const { t } = useTranslation('auth')

    const {
        register, setError, handleSubmit, isValid, watch, reset,
        validErrors: { passwordError, emailError, confPasswordError, userNameError }
    } =
      useValidationForm(['email', 'password', 'userName', 'confPassword'])
    const { isLoading, onSubmit } = useRegistration(setError, reset)
    const isAgree = watch('isAgree')

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
                <div className={cls.agreementField}>
                <Checkbox {...register('isAgree')} defaultChecked={false} />
                I agree to the 
                <Link href={AppRoutes.AUTH.TERMS_OF_SERVICE} className={cls.link}>Terms of Service</Link> and
                 <Link href={AppRoutes.AUTH.PRIVACY_POLICY} className={cls.link}>
                    Privacy Policy
                </Link>
            </div>
            <Button
            data-testid='sign-up-submit'
            disabled={!isAgree || !isValid || isLoading}
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
