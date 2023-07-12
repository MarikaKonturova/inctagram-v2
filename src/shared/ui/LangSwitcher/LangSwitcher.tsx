import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import { Button } from 'shared/ui/Button/Button'
import i18nextConfig from '../../../../next-i18next.config'
import languageDetector from '../../lib/i18n/languageDetector'

interface LangSwitcherProps {
    className?: string
    locale?: string | string[]
    href?: string
}

const Lang = memo(({ locale, ...rest }: LangSwitcherProps) => {
    const router = useRouter()
    let href = rest.href || router.asPath
    let pName = router.pathname
    Object.keys(router.query).forEach((k) => {
        if (k === 'locale') {
            pName = pName.replace(`[${k}]`, locale as string)
            return
        }
        // @ts-ignore
        pName = pName.replace(`[${k}]`, router.query[k])
    })
    if (locale) {
        href = rest.href ? `/${locale as string}${rest.href}` : pName
    }

    return (
        <Link href={href} onClick={() => {
            languageDetector.cache?.(locale as string)
        }}>
            <Button theme={'clear'}>{locale}</Button>
        </Link>
    )
})

export const LangSwitcher = (props: LangSwitcherProps) => {
    const router = useRouter()
    const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale
    return <>
        {
            i18nextConfig.i18n.locales.map((locale) => {
                if (locale === currentLocale) return null
                return <Lang locale={locale} key={locale} {...props}/>
            })
        }
    </>
}
