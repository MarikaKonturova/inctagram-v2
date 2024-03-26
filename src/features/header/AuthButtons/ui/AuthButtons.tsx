import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { BUTTON_VARIANTS } from 'shared/constants'
import { AppRoutes } from 'shared/constants/path'
import { Button } from 'shared/ui'

import cls from './AuthButtons.module.scss'

export const AuthButtons = () => {
  const { t } = useTranslation(['auth', 'common'])
  const router = useRouter()

  const navigateToSignIn = () => {
    router.push(AppRoutes.AUTH.LOGIN)
  }

  const navigateToLogin = () => {
    router.push(AppRoutes.AUTH.REGISTRATION)
  }

  return (
    <div className={cls.wrapper}>
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
    </div>
  )
}
