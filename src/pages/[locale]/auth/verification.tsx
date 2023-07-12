import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { EmailVerification } from 'templates/auth'
import { makeStaticProps, getStaticPaths } from 'shared/lib/i18n/getStatic'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

export default function Verification () {
    return (
        <EmailVerification />
    )
}

Verification.getLayout = getAuthLayout
