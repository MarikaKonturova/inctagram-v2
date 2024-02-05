import { AppRoutes } from 'shared/constants/path'
import { AppLink, Button } from 'shared/ui'

import cls from './AuthButtons.module.scss'

export const AuthButtons = () => {
  return (
    <div className={cls.wrapper}>
      <AppLink className={cls.link} href={AppRoutes.AUTH.LOGIN}>
        <Button className={cls.loginBtn} theme={'clear'}>
          Log in
        </Button>
      </AppLink>
      <AppLink className={cls.link} href={AppRoutes.AUTH.REGISTRATION}>
        <Button>Sign up</Button>
      </AppLink>
    </div>
  )
}
