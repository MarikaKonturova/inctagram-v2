import { getAuthLayout } from 'layouts/AuthLayout/AuthLayout'
import { type GetStaticPropsContext } from 'next'
import { getTranslations } from 'shared/lib/i18n'
import { EmailVerification } from 'templates/auth'

export default function Verification() {
  return <EmailVerification />
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
  props: await getTranslations(ctx.locale, ['auth']),
})

Verification.getLayout = getAuthLayout
