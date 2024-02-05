import clsx from 'clsx'
import { type NextPage } from 'next'
import { Inter } from 'next/font/google'
import { type PropsWithChildren } from 'react'
import { Container, SnackBar } from 'shared/ui'
import { Header } from 'widgets/Header'

import cls from './Layout.module.scss'

const font = Inter({
  display: 'swap',
  subsets: ['latin'],
})

interface LayoutProps extends PropsWithChildren {
  withAuth?: boolean
}

export const Layout: NextPage<LayoutProps> = props => {
  const { children, withAuth = false } = props

  return (
    <div className={clsx(cls.layout, font.className)}>
      <Header withAuth={withAuth} />
      <main className={cls.main}>
        <Container>{children}</Container>
        <SnackBar />
      </main>
    </div>
  )
}
