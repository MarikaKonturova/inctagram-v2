import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'

export const useConfirmEmailMutation = (code: string) => {
  const { push } = useRouter()

  const { mutate: confirmEmail } = useMutation(AuthService.confirmEmail, {
    mutationKey: ['confirm-email'],
    onError: () => {
      void push({ pathname: AppRoutes.AUTH.VERIFICATION })
    },
    onSuccess: () => {
      void push({ pathname: AppRoutes.AUTH.CONGRATULATIONS })
    },
  })

  useEffect(() => {
    if (code) {
      confirmEmail(code)
    }
  }, [code])

  return {}
}
