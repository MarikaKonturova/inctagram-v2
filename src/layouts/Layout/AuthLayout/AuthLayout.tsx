import { type NextPage } from 'next'
import { type PropsWithChildren, type ReactElement } from 'react'
import { Layout } from '../Layout'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
    return (
        <Layout>
            {children}
        </Layout>
    )
}

export const getAuthLayout = (page: ReactElement) => {
    return <AuthLayout>{page}</AuthLayout>
}
