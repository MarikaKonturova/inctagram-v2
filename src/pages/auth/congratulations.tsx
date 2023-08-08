import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { type GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import CongratulationsImg from 'shared/assets/images/congratulations.png'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { getTranslations } from 'shared/lib/i18n'
import { routerPush } from 'shared/lib/routerPush/routerPush'
import { Info } from 'shared/ui'

export default function Congratulations () {
    const { t } = useTranslation('auth')
    return (
        <Info title={t('congratulations')}
              text={t('confirmMessage')}
              buttonText={t('signIn')}
              image={CongratulationsImg}
              onClick={() => { routerPush(AppRoutes.AUTH.LOGIN) }}
        />
    )
}

export const getStaticProps = (ctx: GetStaticPropsContext) => ({
    props: getTranslations(ctx.locale, ['auth'])
})

Congratulations.getLayout = getAuthLayout
