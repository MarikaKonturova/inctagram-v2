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

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx(cls.layout, font.className)}>
      <Header />
      <main className={cls.main}>
        <Container>{children}</Container>
        <SnackBar />
      </main>
    </div>
  )
}
