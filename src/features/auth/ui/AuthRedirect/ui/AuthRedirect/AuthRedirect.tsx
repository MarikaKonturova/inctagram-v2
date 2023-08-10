import { useRouter } from 'next/router'
import { type PropsWithChildren } from 'react'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { PageLoader } from 'shared/ui'
import { useAuthMe } from '../../model'

export const AuthRedirect = ({ children }: PropsWithChildren) => {
    const { pathname } = useRouter()
    const { isAuth, isError, isLoading } = useAuthMe()
    const { push } = useRouter()

    if (isLoading) {
        return <PageLoader/>
    }

    if (!isAuth && isError && !pathname.includes('auth')) {
        void push(AppRoutes.AUTH.LOGIN)
    } else if (pathname.includes('auth') && isAuth) {
        void push(AppRoutes.PROFILE_SETTINGS.GENERAL_INFORMATION)
    }

    return <>{children}</>
}
