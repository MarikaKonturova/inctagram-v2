import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetServerSidePropsContext } from 'next'
import { RegisterForm } from 'features/auth'
import { getTranslations } from 'shared/utils/getTranslations'

export default function Registration () {
    return <RegisterForm/>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
    props: await getTranslations(ctx.locale, ['auth'])
})

Registration.getLayout = getAuthLayout
