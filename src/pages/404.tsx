import { getAuthLayout } from 'layouts'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import NotFoundImg from 'shared/assets/images/404error.png'
import { getTranslations } from 'shared/lib/i18n'
import { Info } from 'shared/ui'

export default function NotFound() {
  const { t } = useTranslation('common')

  return (
    <Info
      buttonText={t('back')}
      image={NotFoundImg}
      onClick={() => {
        history.back()
      }}
      text={t('notFoundText')}
      title={t('notFoundTitle')}
    />
  )
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
  props: await getTranslations(ctx.locale, ['common']),
})

NotFound.getLayout = getAuthLayout
