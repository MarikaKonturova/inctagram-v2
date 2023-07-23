import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { routerPush } from 'shared/lib/routerPush/routerPush'

export const useLogin = () => {
    const queryClient = useQueryClient()

    const { mutate: login, isLoading, error } = useMutation<any, AxiosError<{ message: string }>, any>({
        mutationFn: AuthService.login,
        retry: false,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me']).then(() => {
                routerPush(AppRoutes.PROFILE_SETTINGS.GENERAL_INFORMATION)
            })
        }
    })

    return { login, isLoading, error }
}
