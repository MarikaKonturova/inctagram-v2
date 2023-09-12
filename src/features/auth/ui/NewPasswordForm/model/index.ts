import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'

export const useCreatePassword = () => {
    const queryClient = useQueryClient()
    const { push } = useRouter()

    const { mutate: createPassword, isError, isLoading } = useMutation({
        mutationFn: AuthService.createPassword,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me']).then((res) => {
                void push({ pathname: AppRoutes.AUTH.LOGIN })
            })
        }
    })

    return { createPassword, isError, isLoading }
}
