
import clsx from 'clsx'
import { type FC, memo } from 'react'
import { useValidationForm } from 'features/auth/lib/useValidationForm'
import { AppRoutes } from 'shared/config/routeConfig/path'

import { AppLink, Button, FormWrapper, Input, SocialIcons } from 'shared/ui'

import { useRegistration } from '../../model'
import cls from './RegisterForm.module.scss'

export const RegisterForm: FC = memo(() => {
    const { register, handleSubmit, validErrors: { passwordError, emailError, confPasswordError, userNameError } } =
      useValidationForm(['email', 'password', 'userName', 'confPassword'])
    const { isLoading, onSubmit, responseError } = useRegistration()

    return (
        <FormWrapper className={cls.register} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={cls.title}>Sign Up</h2>
            <SocialIcons/>
            <Input
                {...register('userName')}
                type={'text'}
                placeholder={'Login'}
                error={!!userNameError}
                errorText={userNameError || responseError?.login}
                className={cls.input}/>
            <Input
                {...register('email')}
                type={'email'}
                placeholder={'Email'}
                error={!!emailError}
                errorText={emailError || responseError?.email}
                className={cls.input}/>
            <Input
                {...register('password')}
                type={'password'}
                placeholder={'Password'}
                error={!!passwordError}
                errorText={passwordError}
                className={cls.input}/>
            <Input
                {...register('confPassword')}
                type={'password'}
                error={!!confPasswordError}
                errorText={confPasswordError}
                placeholder={'Password confirmation'}
                className={clsx(cls.input, cls.confirmation)}/>

            <Button data-testid='sign-up-submit' disabled={isLoading} type={'submit'} className={cls.button}>
                Sign Up
            </Button>
            <p className={cls.text}>Do you have an account?</p>
            <AppLink active className={'active'} href={AppRoutes.AUTH.LOGIN}>Sign In</AppLink>
        </FormWrapper>
    )
})
