import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { AuthService } from 'shared/api'
import { type UserAuthModel } from 'shared/types/auth'

import { useAuth } from './useAuth'

interface LogoutReturnType {
  email: string | undefined
  isLoading: boolean
  logout: () => void
}

export const useLogout = (): LogoutReturnType => {
  const queryClient = useQueryClient()
  const { setAuth } = useAuth()
  const email = queryClient.getQueryState<AxiosResponse<UserAuthModel>, AxiosError<any>>(['me'])
    ?.data?.data.email

  const { isLoading, mutate: logout } = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: async () => {
      setAuth(false)
      await queryClient.invalidateQueries(['me'])
    },
  })

  return { email, isLoading, logout }
}
