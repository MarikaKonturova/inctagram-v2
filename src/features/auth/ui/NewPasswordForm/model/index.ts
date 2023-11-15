import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useSnackbar } from 'features/common'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'

export const useCreatePassword = () => {
    const queryClient = useQueryClient()
    const { push } = useRouter()
    const onOpen = useSnackbar((state) => state.onOpen)

    const { mutate: createPassword, isError, isLoading } = useMutation({
        mutationFn: AuthService.createPassword,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me']).then((res) => {
                void push({ pathname: AppRoutes.AUTH.LOGIN })
            })
        },
        onError: () => {
            void push({ pathname: AppRoutes.AUTH.VERIFICATION })
        }

    })

    return { createPassword, isError, isLoading }
}
