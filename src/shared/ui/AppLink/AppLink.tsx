import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { type ReactNode } from 'react'
import useLocale from 'shared/hooks/useLocale'
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

    const router = useRouter()
    const { locale } = useLocale()

    const href = rest.href || router.asPath

    const mods = {
        [cls.active]: active
    }

    return (
        <Link href={href} legacyBehavior locale={locale}>
            <a className={clsx(cls.AppLink, mods, className)} {...rest}>{children}</a>
        </Link>
    )
}
