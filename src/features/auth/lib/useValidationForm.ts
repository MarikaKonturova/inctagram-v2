import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { createValidationSchema, type ValidateUnion } from './loginFormSchema'

export interface IFormValidate {
    userName: string
    password: string
    email: string
    confPassword?: string
    recaptcha?: string
}

export const useValidationForm = (arr: ValidateUnion[]) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        clearErrors,
        formState: { errors }
    } = useForm<IFormValidate>({
        resolver: yupResolver(createValidationSchema(arr)),
        mode: 'onTouched',
        reValidateMode: 'onChange'
    })

    const emailError = errors?.email && errors.email.message
    const passwordError = errors?.password && errors.password.message
    const confPasswordError = errors?.confPassword && errors.confPassword.message
    const userNameError = errors?.userName && errors.userName.message
    const recaptchaError = errors?.recaptcha && errors.recaptcha.message

    const validErrors = {
        emailError,
        passwordError,
        confPasswordError,
        userNameError,
        recaptchaError
    }

    return {
        validErrors,
        register,
        handleSubmit,
        reset,
        clearErrors,
        setValue
    }
}
