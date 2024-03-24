import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { selectSetEmail } from 'features/auth'
import { useAuth } from 'features/auth/model/useAuth'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { AuthService } from 'shared/api'
import { useModal } from 'shared/hooks/useModal'
import { type UserError } from 'shared/types/auth'

import { type PasswordRecoveryValidation } from '../ui/passwordRecoveryForm/PasswordRecoveryForm'

export const useRecoverPassword = (setValue: any) => {
  const [isInfoTextShown, setIsInfoTextShown] = useState(false)
  const setEmail = useAuth(selectSetEmail)
  const { setIsOpen } = useModal()
  const { t } = useTranslation('auth')
  const {
    error,
    isLoading,
    isSuccess,
    mutate: passwordRecovery,
  } = useMutation<any, AxiosError<UserError>, any>({
    mutationFn: AuthService.passwordRecovery,
    onSettled: () => {
      setValue('recaptcha', '')
    },
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

  const localizedError = error
    ? error.response?.data.messages.map(el => {
        if (el.message.includes('registered')) {
          const email = el.message.split(' ').find(el => el.includes('@'))

          return {
            ...el,
            message: t('userNotRegistered', { email: email || '' }),
          }
        } else if (el.message.includes('Recaptcha')) {
          return {
            ...el,
            message: t('recaptchaBackError'),
          }
        } else {
          return el
        }
      })
    : null

  return { isInfoTextShown, isLoading, isSuccess, localizedError, onSubmit, setIsInfoTextShown }
}
