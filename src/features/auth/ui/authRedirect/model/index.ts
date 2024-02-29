import { useQuery } from '@tanstack/react-query'
import { useAuth } from 'features/auth'
import { AuthService } from 'shared/api'

export const useAuthMe = () => {
  const { isAuth, setAuth, setUserData } = useAuth()

  const { isError, isLoading } = useQuery({
    onError: () => {
      setAuth(false)
    },
    onSuccess: ({ data }) => {
      const { hasBusinessAccount, userId } = data

      setUserData({ hasBusinessAccount, userId })
      setAuth(true)
    },
    queryFn: AuthService.me,
    queryKey: ['me'],
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  })

  return { isAuth, isError, isLoading }
}
