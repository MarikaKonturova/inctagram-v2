import { useMutation } from '@tanstack/react-query'
import { selectSetEmail, useAuth } from 'features/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'
import { useSnackbar } from 'shared/hooks'
import { useModal } from 'shared/hooks/useModal'

export const useResendEmailMutation = () => {
  const { email } = useAuth()
  const onOpen = useSnackbar(state => state.onOpen)
  const { setIsOpen } = useModal()
  const { push } = useRouter()

  const { mutate: resendEmail } = useMutation(AuthService.resendEmail, {
    mutationKey: ['resendEmail'],
    onError: () => {
      onOpen('Email already confirmed or doesnt exist', 'danger', 'left')
    },
    onSuccess: () => {
      void push({ pathname: AppRoutes.AUTH.LOGIN })
      setIsOpen(true)
    },
  })

  const verifyEmailHandler = () => {
    resendEmail({ email })
  }

  return { verifyEmailHandler }
}
