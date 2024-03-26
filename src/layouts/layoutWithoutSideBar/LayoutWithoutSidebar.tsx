import { AuthRedirect } from 'features/auth'
import { type NextPage } from 'next'
import { type PropsWithChildren, type ReactElement, Suspense } from 'react'

import { Layout } from '../layout/Layout'
import cls from './LayoutWithoutSidebar.module.scss'

type PropsType = PropsWithChildren & { withAuth?: boolean }

export const LayoutWithoutSidebar: NextPage<PropsType> = ({ children, withAuth = true }) => {
  const content = (
    <div className={cls.wrapper}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={cls.children}>{children}</div>
      </Suspense>
    </div>
  )

  return <Layout>{withAuth ? <AuthRedirect>{content}</AuthRedirect> : content}</Layout>
}

export const getLayoutWithoutSidebar = (page: ReactElement) => {
  return <LayoutWithoutSidebar>{page}</LayoutWithoutSidebar>
}
