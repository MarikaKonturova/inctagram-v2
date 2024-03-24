import clsx from 'clsx'
import { useAuth } from 'features/auth'
import { AuthButtons } from 'features/header'
import { AppLink, Container, ThemeSwitcher } from 'shared/ui'
import { LangSelect } from 'shared/ui/LangSelect'

import cls from './Header.module.scss'

interface HeaderProps {
  className?: string
}

export const Header = (props: HeaderProps) => {
  const { className } = props
  const { isAuth } = useAuth()

  return (
    <header className={clsx(cls.Header, [className])}>
      <Container className={cls.container}>
        <AppLink className={cls.headerText} href={'/'}>
          Inctagram
        </AppLink>
        <div className={cls.rightBlock}>
          <ThemeSwitcher />
          <LangSelect />
          <AuthButtons isAuth={isAuth} />
        </div>
      </Container>
    </header>
  )
}
