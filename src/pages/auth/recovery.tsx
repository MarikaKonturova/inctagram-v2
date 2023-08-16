import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetServerSidePropsContext } from 'next'
import { NewPasswordForm } from 'features/auth'
import { getTranslations } from 'shared/utils/getTranslations'

export default function Recovery () {
    return <NewPasswordForm/>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
    props: await getTranslations(ctx.locale, ['auth'])
})

Recovery.getLayout = getAuthLayout
