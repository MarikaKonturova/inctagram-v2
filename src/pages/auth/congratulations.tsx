import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import CongratulationsImg from 'shared/assets/images/congratulations.png'
import { AppRoutes } from 'shared/constants/routePath'
import useLocale from 'shared/hooks/useLocale'
import { getTranslations } from 'shared/lib/i18n'
import { Info } from 'shared/ui'

export default function Congratulations () {
    const { t } = useTranslation('auth')
    const { push, query, asPath } = useRouter()
    const { locale } = useLocale()

    return (
        <Info title={t('congratulations')}
              text={t('confirmMessage')}
              buttonText={t('signIn')}
              image={CongratulationsImg}
              onClick={() => {
                  void push({ pathname: AppRoutes.AUTH.LOGIN, query }, asPath, { locale })
              }}
        />
    )
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
    props: await getTranslations(ctx.locale, ['auth'])
})

Congratulations.getLayout = getAuthLayout
