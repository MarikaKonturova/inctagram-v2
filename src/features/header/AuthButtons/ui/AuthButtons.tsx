import { useTranslation } from 'next-i18next'
import { BUTTON_VARIANTS } from 'shared/constants'
import { AppRoutes } from 'shared/constants/path'
import { AppLink, Button } from 'shared/ui'

import cls from './AuthButtons.module.scss'

export const AuthButtons = () => {
  const { t } = useTranslation('auth')

  return (
    <div className={cls.wrapper}>
      <AppLink className={cls.link} href={AppRoutes.AUTH.LOGIN}>
        <Button className={cls.loginBtn} theme={BUTTON_VARIANTS.CLEAR}>
          {t('signIn')}
        </Button>
      </AppLink>
      <AppLink className={cls.link} href={AppRoutes.AUTH.REGISTRATION}>
        <Button>{t('signUp')}</Button>
      </AppLink>
    </div>
  )
}
