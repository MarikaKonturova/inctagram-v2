import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { AuthService } from 'shared/api'
import { type UserAuthModel } from 'shared/types/auth'

interface LogoutReturnType {
    logout: () => void
    isLoading: boolean
    email: string | undefined
}

export const useLogout = (): LogoutReturnType => {
    const queryClient = useQueryClient()
    const email = queryClient.getQueryState<AxiosResponse<UserAuthModel>, AxiosError<any>>(['me'])?.data?.data.email

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: AuthService.logout,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me'])
        }
    })

    return { logout, isLoading, email }
}
