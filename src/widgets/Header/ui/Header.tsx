import clsx from 'clsx'

import { AppLink, Container } from 'shared/ui'
import { LangSelect } from 'shared/ui/LangSelect'
import cls from './Header.module.scss'

interface HeaderProps {
    className?: string
}

export const Header = (props: HeaderProps) => {
    const { className } = props

    return (
        <header className={clsx(cls.Header, [className])}>
            <Container className={cls.container}>
                <AppLink className={cls.HeaderText} href={'/'}>Inctagram</AppLink>
                <LangSelect />
            </Container>
        </header>
    )
}
