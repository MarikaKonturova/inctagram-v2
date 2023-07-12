import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import { useTranslation } from 'next-i18next'
import CongratulationsImg from 'shared/assets/images/congratulations.png'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { makeStaticProps, getStaticPaths } from 'shared/lib/i18n/getStatic'
import { routerPush } from 'shared/lib/routerPush/routerPush'
import { Info } from 'shared/ui'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

export default function Congratulations () {
    const { t } = useTranslation()
    return (
        <Info title={t('congratulations-title')} // Поздравляю!
              text={t('congratulations-text')} // Ваше сообщение было подтверждено
              buttonText={t('congratulations-button')} // Войти
              image={CongratulationsImg}
              onClick={() => { routerPush(AppRoutes.AUTH.LOGIN) }}
        />
    )
}
Congratulations.getLayout = getAuthLayout
