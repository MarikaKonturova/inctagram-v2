import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useAuth } from 'features/auth/model'
import { SelectSetEmail } from 'features/auth/model/selectors'
import { useState } from 'react'
import { AuthService } from 'shared/api'
import { useModal } from 'shared/hooks/useModal'
import { type UserError } from 'shared/types/auth'

import { type PasswordRecoveryValidation } from '../ui/PasswordRecoveryForm/PasswordRecoveryForm'

export const useRecoverPassword = () => {
  const [isInfoTextShown, setIsInfoTextShown] = useState(false)
  const setEmail = useAuth(SelectSetEmail)
  const { setIsOpen } = useModal()

  const {
    error,
    isLoading,
    mutate: passwordRecovery,
  } = useMutation<any, AxiosError<UserError>, any>({
    mutationFn: AuthService.passwordRecovery,
    onSuccess: async () => {
      setIsInfoTextShown(true)
      setIsOpen(true)
    },
    retry: false,
  })

  const onSubmit = (data: PasswordRecoveryValidation) => {
    passwordRecovery(data)
    setEmail(data.email)
  }

  return { error, isInfoTextShown, isLoading, onSubmit }
}
