import { useRouter } from 'next/router'
import { type PropsWithChildren } from 'react'
import { AppRoutes } from 'shared/constants/routePath'
import useLocale from 'shared/hooks/useLocale'
import { PageLoader } from 'shared/ui'
import { useAuthMe } from '../../model'

export const AuthRedirect = ({ children }: PropsWithChildren) => {
    const { pathname, query, asPath, push } = useRouter()
    const { locale } = useLocale()
    const { isAuth, isError, isLoading } = useAuthMe()

    if (isLoading) {
        return <PageLoader/>
    }

    if (!isAuth && isError && !pathname.includes('auth')) {
        void push({ pathname: AppRoutes.AUTH.LOGIN, query }, asPath, { locale })
    } else if (pathname.includes('auth') && isAuth) {
        void push({ pathname: AppRoutes.PROFILE_SETTINGS.GENERAL_INFORMATION, query }, asPath, { locale })
    }

    return <>{children}</>
}
