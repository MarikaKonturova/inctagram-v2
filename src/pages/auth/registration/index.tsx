
import { type GetServerSidePropsContext } from 'next'
import { RegisterForm } from '../../../features/auth'
import { getAuthLayout } from '../../../layouts/Layout/AuthLayout/AuthLayout'
import { getTranslations } from '../../../shared/lib/i18n'

export default function Registration () {
    return <RegisterForm/>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
    props: await getTranslations(ctx.locale, ['auth'])
})

Registration.getLayout = getAuthLayout
