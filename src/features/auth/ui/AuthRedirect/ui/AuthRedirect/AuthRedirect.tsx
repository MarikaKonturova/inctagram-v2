import { useRouter } from 'next/router'
import { type PropsWithChildren } from 'react'
import { AppRoutes } from 'shared/constants/path'
import { PageLoader } from 'shared/ui'

import { useAuthMe } from '../../model'

export const AuthRedirect = ({ children }: PropsWithChildren) => {
  const { pathname, push } = useRouter()
  const { isAuth, isError, isLoading } = useAuthMe()

  if (isLoading) {
    return <PageLoader />
  }

  if (!isAuth && isError && !pathname.includes('auth') && !pathname.includes('public')) {
    void push({ pathname: AppRoutes.PUBLIC })
  } else if (pathname.includes('auth') && isAuth) {
    void push({ pathname: AppRoutes.PROFILE.SETTINGS })
  }

  return <>{children}</>
}
