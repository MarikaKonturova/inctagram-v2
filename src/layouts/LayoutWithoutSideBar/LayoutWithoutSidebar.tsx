import { AuthRedirect } from 'features/auth'
import { type NextPage } from 'next'
import { type PropsWithChildren, type ReactElement, Suspense } from 'react'

import { Layout } from '../Layout/Layout'
import cls from './LayoutWithoutSidebar.module.scss'

export const LayoutWithoutSidebar: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <AuthRedirect>
        <div className={cls.wrapper}>
          <Suspense fallback={<div>Loading...</div>}>
            <div className={cls.children}>{children}</div>
          </Suspense>
        </div>
      </AuthRedirect>
    </Layout>
  )
}

export const getLayoutWithoutSidebar = (page: ReactElement) => {
  return <LayoutWithoutSidebar>{page}</LayoutWithoutSidebar>
}
