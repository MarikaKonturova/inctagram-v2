import { type GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getTranslations } from 'shared/lib/i18n'
import { useAuth } from '../features/auth'
import { SelectIsAuth } from '../features/auth/model/selectors'
import { getLayoutWithSidebar } from '../layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'
import { AppRoutes } from '../shared/constants/path'

export default function Home () {
    const isAuth = useAuth(SelectIsAuth)
    const { push } = useRouter()

    void (isAuth ? push(AppRoutes.PROFILE.MY_PROFILE) : push(AppRoutes.AUTH.LOGIN))

    return (
        <>
            <Head>
                <title>Inctagram</title>
                <meta name="description" content="Inctagram" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
    props: await getTranslations(ctx.locale, ['common', 'auth'])
})

Home.getLayout = getLayoutWithSidebar
