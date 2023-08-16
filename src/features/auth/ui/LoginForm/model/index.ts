import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/constants/routePath'
import useLocale from 'shared/hooks/useLocale'

export const useLogin = () => {
    const queryClient = useQueryClient()
    const { push, query, asPath } = useRouter()
    const { locale } = useLocale()

    const { mutate: login, isLoading, error } = useMutation<any, AxiosError<{ message: string }>, any>({
        mutationFn: AuthService.login,
        retry: false,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me']).then(() => {
                void push({ pathname: AppRoutes.PROFILE_SETTINGS.GENERAL_INFORMATION, query }, asPath, { locale })
            })
        }
    })

    return { login, isLoading, error }
}
