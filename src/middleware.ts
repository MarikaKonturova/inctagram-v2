import { type NextRequest, NextResponse } from 'next/server'
import i18nextConfig from '../next-i18next.config'

const { locales, defaultLocale } = i18nextConfig.i18n

const PUBLIC_FILE = /\.(.*)$/

export function middleware (request: NextRequest) {
    const { pathname, search } = request.nextUrl
    const storedLocale = request.headers.get('cookie')?.split('=')[1] || defaultLocale

    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        pathname.startsWith('/favicon.ico') ||
        PUBLIC_FILE.test(request.nextUrl.pathname)
    ) {
        return NextResponse.next()
    }

    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) &&
        pathname !== `/${locale}` &&
        !request.url.includes(storedLocale)
    )

    if (pathnameIsMissingLocale) {
        return NextResponse.rewrite(
            new URL(`/${storedLocale}${pathname}${search}`, request.url)
        )
    }
}

export const config = {
    matcher: [
        '/((?!_next).*)'
    ]
}
