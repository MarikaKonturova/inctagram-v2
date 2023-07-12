import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { routerPush } from 'shared/lib/routerPush/routerPush'

export const useCreatePassword = () => {
    const queryClient = useQueryClient()
    const { mutate: createPassword, isError, isLoading } = useMutation({
        mutationFn: AuthService.createPassword,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me']).then((res) => { routerPush(AppRoutes.AUTH.LOGIN) })
        }
    })

    return { createPassword, isError, isLoading }
}
