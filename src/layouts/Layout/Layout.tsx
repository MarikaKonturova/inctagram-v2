import clsx from 'clsx'
import { type NextPage } from 'next'
import { Inter } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { Header } from 'widgets/Header'
import { SnackBar } from 'widgets/SnackBar'
import { Container } from 'shared/ui'
import cls from './Layout.module.scss'

const font = Inter({
    subsets: ['latin'],
    display: 'swap'
})
export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
    return (
        <div className={clsx(cls.layout, font.className)}>
            <Header/>
            <main className={cls.main}>
                <Container>
                    {children}
                </Container>
                <SnackBar/>
            </main>
        </div>
    )
}
