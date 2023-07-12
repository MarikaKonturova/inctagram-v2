import 'app/styles/index.scss'
import { QueryClient } from '@tanstack/query-core'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import { type ReactElement, useState } from 'react'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import type { AppProps } from 'next/app'
import { noRefetch } from 'shared/config/tanstackQuery/noRefetch'
import { useLoader } from 'shared/hooks/useLoader'
import { AdminMenu } from 'shared/ui'
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
    useLoader()

    const getLayout = Component.getLayout ?? ((page) => page)

    return (
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
    )
}

export default appWithTranslation(App)
