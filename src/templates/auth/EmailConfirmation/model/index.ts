import { useMutation } from '@tanstack/react-query'
import { selectSetEmail, useAuth } from 'features/auth'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'

export const useConfirmEmailMutation = (queryParams: NextPageContext['query']) => {
  const { code, email } = queryParams

  const { push } = useRouter()
  const setEmail = useAuth(selectSetEmail)

  const { mutate: confirmEmail } = useMutation(AuthService.confirmEmail, {
    mutationKey: ['confirm-email'],
    onError: () => {
      setEmail(email as string)
      void push({ pathname: AppRoutes.AUTH.VERIFICATION })
    },
    onSuccess: () => {
      void push({ pathname: AppRoutes.AUTH.CONGRATULATIONS })
    },
  })

  useEffect(() => {
    if (code) {
      confirmEmail(code as string)
    }
  }, [code, confirmEmail])

  return {}
}
