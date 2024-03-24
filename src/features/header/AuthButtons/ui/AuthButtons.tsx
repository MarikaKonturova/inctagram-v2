import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { BUTTON_VARIANTS } from 'shared/constants'
import { AppRoutes } from 'shared/constants/path'
import { Button } from 'shared/ui'

import cls from './AuthButtons.module.scss'

type PropsType = {
  isAuth: boolean
}

export const AuthButtons: FC<PropsType> = ({ isAuth }) => {
  const { t } = useTranslation(['auth', 'common'])
  const router = useRouter()
  const isPublicPage = router.pathname === AppRoutes.PUBLIC

  const navigateToSignIn = () => {
    router.push(AppRoutes.AUTH.LOGIN)
  }

  const navigateToLogin = () => {
    router.push(AppRoutes.AUTH.REGISTRATION)
  }

  const navigateToHome = () => {
    router.push(AppRoutes.HOME)
  }

  const navigateToPublic = () => {
    router.push(AppRoutes.PUBLIC)
  }

  return (
    <div className={cls.wrapper}>
      {isAuth ? (
        <>
          {isPublicPage ? (
            <Button
              className={cls.loginBtn}
              onClick={navigateToHome}
              suppressHydrationWarning
              theme={BUTTON_VARIANTS.CLEAR}
              type={'button'}
            >
              {t('common:home')}
            </Button>
          ) : (
            <Button onClick={navigateToPublic} suppressHydrationWarning type={'button'}>
              {t('common:public')}
            </Button>
          )}
        </>
      ) : (
        <>
          <Button
            className={cls.loginBtn}
            onClick={navigateToSignIn}
            suppressHydrationWarning
            theme={BUTTON_VARIANTS.CLEAR}
            type={'button'}
          >
            {t('signIn')}
          </Button>
          <Button onClick={navigateToLogin} suppressHydrationWarning type={'button'}>
            {t('signUp')}
          </Button>
        </>
      )}
    </div>
  )
}
