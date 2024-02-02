import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { selectEmail, selectSetEmail } from 'features/auth'
import { useAuth } from 'features/auth/model'
import { useCallback } from 'react'
import { type UseFormReset, type UseFormSetError } from 'react-hook-form'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'
import { useSnackbar } from 'shared/hooks'
import { useModal } from 'shared/hooks/useModal'
import { type UserError, type UserRegistrationModel } from 'shared/types/auth'

interface RegisterValidation {
  confPassword?: string
  email: string
  password: string
  userName: string
}

export const useRegistration = (
  setError: UseFormSetError<UserRegistrationModel>,
  reset: UseFormReset<UserRegistrationModel>
) => {
  const setEmail = useAuth(selectSetEmail)
  const email = useAuth(selectEmail)
  const onOpen = useSnackbar(state => state.onOpen)
  const { setIsOpen } = useModal()

  const {
    error,
    isLoading,
    mutate: registration,
  } = useMutation<any, AxiosError<UserError>, UserRegistrationModel, unknown>({
    mutationFn: AuthService.registration,
    onError: err => {
      const error = err.response?.data.messages[0]

      if (error?.message === 'User with this email is already exist') {
        setIsOpen(true)
      }
      // FIX
      setError(error?.field as any, error || {})
      onOpen('Error', 'danger', 'left')
    },
    onSuccess: () => {
      setIsOpen(true)
      localStorage.setItem('email', email) // ?
      reset()
    },
    retry: false,
  })

  const onSubmit = useCallback(
    (data: RegisterValidation): void => {
      const { confPassword, ...registerData } = data

      registration({ ...registerData })
      setEmail(data.email)
    },
    [error]
  )

  return { isLoading, onSubmit }
}
