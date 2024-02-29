import clsx from 'clsx'
import { AuthButtons } from 'features/header'
import { AppLink, Container, ThemeSwitcher } from 'shared/ui'
import { LangSelect } from 'shared/ui/LangSelect'

import cls from './Header.module.scss'

interface HeaderProps {
  className?: string
  withAuth?: boolean
}

export const Header = (props: HeaderProps) => {
  const { className, withAuth = false } = props

  return (
    <header className={clsx(cls.Header, [className])}>
      <Container className={cls.container}>
        <AppLink className={cls.headerText} href={'/'}>
          Inctagram
        </AppLink>
        <div className={cls.rightBlock}>
          <ThemeSwitcher />
          <LangSelect />
          {withAuth && <AuthButtons />}
        </div>
      </Container>
    </header>
  )
}
