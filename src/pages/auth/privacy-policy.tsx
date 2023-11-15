import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { LegalContent } from 'entities/LegalContent/ui/LegalContent'
import { getTranslations } from 'shared/lib/i18n'

export default function PrivacyPolicy () {
    const { t } = useTranslation('privacy-policy')

    return <LegalContent label={t('backToSignUp')} title={t('title')} content={t('content')} />
}

export const getStaticProps = async (ctx: GetServerSidePropsContext) => ({
    props: await getTranslations(ctx.locale, ['privacy-policy'])
})

PrivacyPolicy.getLayout = getAuthLayout
