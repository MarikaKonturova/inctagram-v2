import { AuthRedirect } from 'features/auth'
import { type NextPage } from 'next'
import { type PropsWithChildren, type ReactElement, Suspense } from 'react'
import { Sidebar } from 'widgets/Sidebar'

import { Layout } from '../Layout/Layout'
import cls from './LayoutWithSidebar.module.scss'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <AuthRedirect>
        <div className={cls.wrapper}>
          <Sidebar />
          <Suspense fallback={<div>Loading...</div>}>
            <div className={cls.children}>{children}</div>
          </Suspense>
        </div>
      </AuthRedirect>
    </Layout>
  )
}

export const getLayoutWithSidebar = (page: ReactElement) => {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>
}
