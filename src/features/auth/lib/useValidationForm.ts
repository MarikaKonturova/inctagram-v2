import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { type ValidateUnion, createValidationSchema } from './loginFormSchema'

export interface IFormValidate {
  confPassword?: string
  email: string
  isAgree?: boolean
  password: string
  recaptcha?: string
  userName: string
}

export const useValidationForm = (arr: ValidateUnion[]) => {
  const { clearErrors, formState, handleSubmit, register, reset, setError, setValue, watch } =
    useForm<IFormValidate>({
      mode: 'onTouched',
      reValidateMode: 'onChange',
      resolver: yupResolver(createValidationSchema(arr)),
    })

  const { errors, isValid } = formState

  const emailError = errors?.email && errors.email.message
  const passwordError = errors?.password && errors.password.message
  const confPasswordError = errors?.confPassword && errors.confPassword.message
  const userNameError = errors?.userName && errors.userName.message
  const recaptchaError = errors?.recaptcha && errors.recaptcha.message

  const validErrors = {
    confPasswordError,
    emailError,
    passwordError,
    recaptchaError,
    userNameError,
  }

  return {
    clearErrors,
    handleSubmit,
    isValid,
    register,
    reset,
    setError,
    setValue,
    validErrors,
    watch,
  }
}
