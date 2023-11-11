import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useCallback } from 'react'
import { UseFormReset, type UseFormSetError } from 'react-hook-form'
import { useAuth } from 'features/auth/model'
import { SelectEmail, SelectSetEmail } from 'features/auth/model/selectors'
import { useSnackbar } from 'features/common'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'
import { useModal } from 'shared/hooks/useModal'
import {
    type UserError,
    type UserRegistrationModel
} from 'shared/types/auth'

interface RegisterValidation {
    userName: string
    email: string
    password: string
    confPassword?: string
}

export const useRegistration = (setError: UseFormSetError<UserRegistrationModel>, reset: UseFormReset<UserRegistrationModel>) => {
    const setEmail = useAuth(SelectSetEmail)
    const email = useAuth(SelectEmail)
    const onOpen = useSnackbar((state) => state.onOpen)
    const { setIsOpen } = useModal()

    const { mutate: registration, isLoading, error } =
      useMutation<any, AxiosError<UserError>, UserRegistrationModel, unknown>({
          mutationFn: AuthService.registration,
          retry: false,
          onSuccess: () => {
             setIsOpen(true)
              localStorage.setItem('email', email) // ?
              reset()
          },
          onError: (err) => {
              const error = err.response?.data.messages[0]
              if(error?.message === 'User with this email is already exist'){
                setIsOpen(true)
              }
              // FIX
              setError(error?.field as any, error || {})
              onOpen('Error', 'danger', 'left')
          }
      })

    const onSubmit = useCallback((data: RegisterValidation): void => {
        const { confPassword, ...registerData } = data
        registration({ ...registerData })
        setEmail(data.email)
    }, [error])

    return { isLoading, onSubmit }
}
