import { useRouter } from 'next/router'
import { type PropsWithChildren } from 'react'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { routerPush } from 'shared/lib/routerPush/routerPush'
import { PageLoader } from 'shared/ui'
import { useAuthMe } from '../../model'

export const AuthRedirect = ({ children }: PropsWithChildren) => {
    const { pathname } = useRouter()
    const { isAuth, isError, isLoading } = useAuthMe()

    if (isLoading) {
        return <PageLoader/>
    }

    if (!isAuth && isError && !pathname.includes('auth')) {
        routerPush(AppRoutes.AUTH.LOGIN)
    } else if (pathname.includes('auth') && isAuth) {
        routerPush(AppRoutes.PROFILE_SETTINGS.GENERAL_INFORMATION)
    }

    return <>{children}</>
}
