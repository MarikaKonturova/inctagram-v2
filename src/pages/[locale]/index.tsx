import { getLayoutWithSidebar } from 'layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'
import Head from 'next/head'
import { AppRoutes } from 'shared/config/routeConfig/path'
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
