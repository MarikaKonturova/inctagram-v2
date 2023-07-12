import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from 'shared/api/auth/authService'

interface LogoutReturnType {
    logout: () => void
    isLoading: boolean
}

export const useLogout = (): LogoutReturnType => {
    const queryClient = useQueryClient()

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: AuthService.logout,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me'])
        }
    })

    return { logout, isLoading }
}
