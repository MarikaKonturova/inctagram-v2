import { type NextPage } from 'next'
import { type PropsWithChildren, type ReactElement } from 'react'

import { Layout } from '../layout/Layout'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => <Layout>{children}</Layout>

export const getAuthLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
