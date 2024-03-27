import clsx from 'clsx'
import { type NextPage } from 'next'
import { Inter } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { Container, SnackBar } from 'shared/ui'
import { Header } from 'widgets/header'

import cls from './Layout.module.scss'

const font = Inter({
  display: 'swap',
  subsets: ['latin'],
})

interface LayoutProps extends PropsWithChildren {}

export const Layout: NextPage<LayoutProps> = props => {
  const { children } = props
  const inDevEnvironment = !!process && process.env.NODE_ENV === 'development'

  return (
    <div className={clsx(cls.layout, font.className)}>
      <Header />
      <main className={cls.main}>
        <Container>{children}</Container>
        {inDevEnvironment && <SnackBar />}
      </main>
    </div>
  )
}
