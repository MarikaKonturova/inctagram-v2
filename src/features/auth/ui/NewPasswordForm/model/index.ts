import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/config/routeConfig/path'

export const useCreatePassword = () => {
    const queryClient = useQueryClient()
    const { push } = useRouter()

    const { mutate: createPassword, isError, isLoading } = useMutation({
        mutationFn: AuthService.createPassword,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me']).then((res) => {
                void push(AppRoutes.AUTH.LOGIN)
            })
        }
    })

    return { createPassword, isError, isLoading }
}
