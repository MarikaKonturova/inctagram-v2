import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'
import { type UserError } from 'shared/types/auth'

export const useLogin = () => {
    const queryClient = useQueryClient()
    const { push } = useRouter()

    const { mutate: login, isLoading, error, isSuccess } = useMutation<any, AxiosError<UserError>, any>({
        mutationFn: AuthService.login,
        retry: false,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me']).then(() => {
                void push({ pathname: AppRoutes.PROFILE.SETTINGS })
            })
        }
    })

    return { login, isLoading, error, isSuccess }
}
