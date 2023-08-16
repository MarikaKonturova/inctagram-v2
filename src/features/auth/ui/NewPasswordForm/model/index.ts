import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/constants/routePath'
import useLocale from 'shared/hooks/useLocale'

export const useCreatePassword = () => {
    const queryClient = useQueryClient()
    const { push, query, asPath } = useRouter()
    const { locale } = useLocale()

    const { mutate: createPassword, isError, isLoading } = useMutation({
        mutationFn: AuthService.createPassword,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me']).then((res) => {
                void push({ pathname: AppRoutes.AUTH.LOGIN, query }, asPath, { locale })
            })
        }
    })

    return { createPassword, isError, isLoading }
}
