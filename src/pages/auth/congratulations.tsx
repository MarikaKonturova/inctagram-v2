import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import CongratulationsImg from 'shared/assets/images/congratulations.png'
import { AppRoutes } from 'shared/constants/path'
import { getTranslations } from 'shared/lib/i18n'
import { Info } from 'shared/ui'

export default function Congratulations() {
  const { t } = useTranslation('auth')
  const { push } = useRouter()

  return (
    <Info
      buttonText={t('signIn')}
      image={CongratulationsImg}
      onClick={() => {
        void push({ pathname: AppRoutes.AUTH.LOGIN })
      }}
      text={t('confirmMessage')}
      title={t('congratulations')}
    />
  )
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
  props: await getTranslations(ctx.locale, ['auth']),
})

Congratulations.getLayout = getAuthLayout
