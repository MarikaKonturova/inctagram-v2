import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useAuth } from 'features/auth/model'
import { SelectEmail, SelectSetEmail } from 'features/auth/model/selectors'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/constants/routePath'
import useLocale from 'shared/hooks/useLocale'
import { useModal } from 'shared/hooks/useModal'
import {
    type UserRegistrationError,
    type UserRegistrationModel
} from 'shared/types/auth'

interface RegisterValidation {
    userName: string
    email: string
    password: string
    confPassword?: string
}

export const useRegistration = () => {
    const setEmail = useAuth(SelectSetEmail)
    const email = useAuth(SelectEmail)
    const { setIsOpen } = useModal()
    const { push, query, asPath } = useRouter()
    const { locale } = useLocale()

    const { mutate: registration, isLoading, error } =
      useMutation<any, AxiosError<UserRegistrationError>, UserRegistrationModel, unknown>({
          mutationFn: AuthService.registration,
          retry: false,
          onSuccess: () => {
              void push({ pathname: AppRoutes.AUTH.LOGIN, query }, asPath, { locale })
              setIsOpen(true)
              localStorage.setItem('email', email)
          }
      })

    const onSubmit = useCallback((data: RegisterValidation): void => {
        const { confPassword, ...registerData } = data
        registration({ ...registerData })
        setEmail(data.email)
    }, [error])

    const responseError = useMemo(() => {
        return error?.response?.data?.errorsMessages.reduce((accum, item) => {
            accum[item.field] = item.message
            return accum
        }, {} as Record<string, string>)
    }, [error])

    return { isLoading, onSubmit, responseError }
}
