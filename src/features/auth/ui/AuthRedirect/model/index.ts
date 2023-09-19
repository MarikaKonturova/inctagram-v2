import { useQuery } from '@tanstack/react-query'
import { useAuth } from 'features/auth'
import { AuthService } from 'shared/api'

export const useAuthMe = () => {
    const { isAuth, setAuth, setUserData } = useAuth()

    const { isError, isLoading } = useQuery({
        queryKey: ['me'],
        queryFn: AuthService.me,
        onSuccess: ({ data }) => {
            const { userId, hasBusinessAccount } = data
            setUserData({ userId, hasBusinessAccount })
            setAuth(true)
        },
        onError: () => {
            setAuth(false)
        },
        retry: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false
    })

    return { isAuth, isError, isLoading }
}
