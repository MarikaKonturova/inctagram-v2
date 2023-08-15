import 'app/styles/index.scss'
import { QueryClient } from '@tanstack/query-core'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import { type ReactElement, useState, useEffect } from 'react'
import { CookiesProvider } from 'react-cookie'
import { I18nextProvider } from 'react-i18next'
import { noRefetch } from 'app/config/tanstackQuery/noRefetch'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import type { AppProps } from 'next/app'
import { useLoader } from 'shared/hooks/useLoader'
import useLocale from 'shared/hooks/useLocale'
import { AdminMenu } from 'shared/ui'
import i18n from '../app/config/i18next'
import 'app/styles/nprogress.scss'

export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App ({ Component, pageProps }: AppPropsWithLayout) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                ...noRefetch
            }
        }
    }))
    const { locale } = useLocale()
    useLoader()

    useEffect(() => {
        document.documentElement.lang = locale
    }, [locale])

    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <CookiesProvider>
            <I18nextProvider i18n={i18n}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>
                        {getLayout(
                            <>
                                <AdminMenu/>
                                <Hydrate state={pageProps.dehydrateState}>
                                    <Component {...pageProps} />
                                </Hydrate></>
                        )}
                    </ThemeProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </I18nextProvider>
        </CookiesProvider>
    )
}

export default appWithTranslation(App)
