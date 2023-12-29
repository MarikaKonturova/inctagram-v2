import { LegalContent } from 'entities/LegalContent/ui/LegalContent'
import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { getTranslations } from 'shared/lib/i18n'

export default function TermsOfService() {
  const { t } = useTranslation('terms-of-use')

  return <LegalContent content={t('content')} label={t('backToPrevPage')} title={t('title')} />
}

export const getStaticProps = async (ctx: GetServerSidePropsContext) => ({
  props: await getTranslations(ctx.locale, ['terms-of-use']),
})

TermsOfService.getLayout = getAuthLayout
