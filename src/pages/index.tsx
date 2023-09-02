import { getLayoutWithSidebar } from 'layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'
import { type GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { AppRoutes } from 'shared/constants/path'
import { getTranslations } from 'shared/lib/i18n'
import { AppLink } from 'shared/ui'

export default function Home () {
    return (
        <>
            <Head>
                <title>Inctagram</title>
                <meta name="description" content="Inctagram" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <>
                    <AppLink href={AppRoutes.AUTH.CONGRATULATIONS}>Congratulations</AppLink>
                    <AppLink href={AppRoutes.AUTH.VERIFICATION}>Verification</AppLink>
                    <AppLink href={AppRoutes.AUTH.REGISTRATION}>registration</AppLink>
                </>
            </main>

        </>
    )
}

Home.getLayout = getLayoutWithSidebar

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
    props: await getTranslations(ctx.locale, ['common', 'auth'])
})
