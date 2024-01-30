import { LegalContent } from 'entities/LegalContent'
import { getAuthLayout } from 'layouts/AuthLayout/AuthLayout'
import { type GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { getTranslations } from 'shared/lib/i18n'

export default function PrivacyPolicy() {
  const { t } = useTranslation('privacy-policy')

  return <LegalContent content={t('content')} label={t('backToSignUp')} title={t('title')} />
}

export const getStaticProps = async (ctx: GetServerSidePropsContext) => ({
  props: await getTranslations(ctx.locale, ['privacy-policy']),
})

PrivacyPolicy.getLayout = getAuthLayout
