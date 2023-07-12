import clsx from 'clsx'

import { Logout, useAuth } from 'features/auth'

import { AppLink, Container } from 'shared/ui'
import cls from './Header.module.scss'

interface HeaderProps {
    className?: string
}

export const Header = (props: HeaderProps) => {
    const { className } = props
    const isAuth = useAuth()

    return (
        <header className={clsx(cls.Header, [className])}>
            <Container className={cls.container}>
                <AppLink className={cls.HeaderText} href={'/'}>Inctagram</AppLink>
                {isAuth && <Logout />}
            </Container>
        </header>
    )
}
