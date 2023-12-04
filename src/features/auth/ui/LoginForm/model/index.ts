import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useSnackbar } from 'features/common'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'
import { type UserError } from 'shared/types/auth'

export const useLogin = () => {
    const queryClient = useQueryClient()
    const onOpen = useSnackbar(state => state.onOpen)
    const { push } = useRouter()

    const { mutate: login, isLoading, error } = useMutation<any, AxiosError<UserError>, any>({
        mutationFn: AuthService.login,
        retry: false,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me']).then(() => {
                void push({ pathname: AppRoutes.PROFILE.SETTINGS })
            })
        },
        onError: () => {
            onOpen('The email or password are incorrect. Try again please', 'danger', 'right')
        }
    })

    return { login, isLoading, error }
}
