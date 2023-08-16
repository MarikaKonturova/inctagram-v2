import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/constants/routePath'
import useLocale from 'shared/hooks/useLocale'

export const useConfirmEmailMutation = (code: string) => {
    const { push, query, asPath } = useRouter()
    const { locale } = useLocale()

    const { mutate: confirmEmail } = useMutation(AuthService.confirmEmail, {
        mutationKey: ['confirm-email'],
        onSuccess: () => {
            void push({ pathname: AppRoutes.AUTH.CONGRATULATIONS, query }, asPath, { locale })
        },
        onError: () => {
            void push({ pathname: AppRoutes.AUTH.VERIFICATION, query }, asPath, { locale })
        }
    })

    useEffect(() => {
        if (code) {
            confirmEmail(code)
        }
    }, [code])

    return {}
}
