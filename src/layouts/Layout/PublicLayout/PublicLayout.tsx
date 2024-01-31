import { AuthRedirect } from 'features/auth'
import { type NextPage } from 'next'
import { type PropsWithChildren, type ReactElement, Suspense } from 'react'

import { Layout } from '../Layout'
import cls from './PublicLayout.module.scss'

export const PublicLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout withAuth>
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

export const getPublicLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>
}
