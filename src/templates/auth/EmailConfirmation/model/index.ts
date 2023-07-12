import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { routerPush } from 'shared/lib/routerPush/routerPush'

export const useConfirmEmailMutation = (code: string) => {
    const { mutate: confirmEmail } = useMutation(AuthService.confirmEmail, {
        mutationKey: ['confirm-email'],
        onSuccess: () => {
            routerPush(AppRoutes.AUTH.CONGRATULATIONS)
        },
        onError: () => {
            routerPush(AppRoutes.AUTH.VERIFICATION)
        }
    })

    useEffect(() => {
        if (code) {
            confirmEmail(code)
        }
    }, [code])

    return {}
}
