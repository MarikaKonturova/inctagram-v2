import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { type ReactNode } from 'react'
import cls from './AppLink.module.scss'

interface AppLinkProps {
    className?: string
    Icon?: any
    text?: string
    href?: string
    locale?: string | string[]
    active?: boolean
    children?: ReactNode
    skipLocaleHandling?: any
}

export const AppLink = (props: AppLinkProps) => {
    const {
        Icon,
        className,
        text,
        active = false,
        children,
        ...rest
    } = props
    let {
        skipLocaleHandling
    } = props

    const router = useRouter()
    const locale = rest.locale || router.query.locale || ''

    let href = rest.href || router.asPath
    if (href.indexOf('http') === 0) skipLocaleHandling = true
    if (locale && !skipLocaleHandling) {
        href = href
            ? `/${locale as string}${href}`
            : router.pathname.replace('[locale]', locale as string)
    }

    const mods = {
        [cls.active]: active
    }
    return (
        <Link href={href} legacyBehavior>
            <a className={clsx(cls.AppLink, mods, className)} {...rest}>{children}</a>
        </Link>
    )
}
