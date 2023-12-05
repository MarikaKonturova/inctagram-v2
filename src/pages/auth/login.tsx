import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { ConfirmModal, LoginForm } from 'features/auth'
import { getTranslations } from 'shared/lib/i18n'

export default function Login () {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return <>
        <LoginForm/>
        <ConfirmModal/>
    </>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
    props: await getTranslations(ctx.locale, ['auth'])
})

Login.getLayout = getAuthLayout
