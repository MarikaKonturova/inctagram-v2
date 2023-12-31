import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetStaticPropsContext } from 'next'
import { EmailVerification } from 'templates/auth'
import { getTranslations } from 'shared/lib/i18n'

export default function Verification () {
    return (
        <EmailVerification />
    )
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
    props: await getTranslations(ctx.locale, ['auth'])
})

Verification.getLayout = getAuthLayout
