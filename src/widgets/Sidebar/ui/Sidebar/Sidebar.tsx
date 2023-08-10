import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import { Logout } from 'features/auth'
import Statistics from 'shared/assets/icons/general/trending-up.svg'
import Favorites from 'shared/assets/icons/light/bookmark.svg'
import Home from 'shared/assets/icons/light/home.svg'
import Profile from 'shared/assets/icons/light/person.svg'
import Create from 'shared/assets/icons/light/plus-square.svg'
import FavoritesOutline from 'shared/assets/icons/outline/bookmark-outline.svg'
import HomeOutline from 'shared/assets/icons/outline/home-outline.svg'
import ProfileOutline from 'shared/assets/icons/outline/person-outline.svg'
import CreateOutline from 'shared/assets/icons/outline/plus-square-outline.svg'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import cls from './Sidebar.module.scss'

interface SidebarProps {
    className?: string
    active?: string
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props
    const { t } = useTranslation('common')
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const { asPath } = useRouter()
    const currentPath = asPath.replace(/\/[a-z]*(?=\/)/g, '')

    return (
        <div className={clsx(cls.Sidebar, [className])}>
            <div className={cls.menu}>
                <AppLink
                    href={AppRoutes.HOME}
                    active={currentPath === AppRoutes.HOME}
                    className={clsx(cls.item, { [cls.active]: currentPath === AppRoutes.HOME })}
                >
                    {currentPath === AppRoutes.HOME
                        ? <Home className={cls.icon}/>
                        : <HomeOutline className={cls.icon} fill={fill}/>
                    }
                    <span className={cls.link}>
                        {t('home')}
                    </span>
                </AppLink>
                <AppLink
                    href={AppRoutes.CREATE}
                    active={currentPath === AppRoutes.CREATE}
                    className={clsx(cls.item, { [cls.active]: currentPath === AppRoutes.CREATE })}
                >
                    {currentPath === AppRoutes.CREATE
                        ? <Create className={cls.icon}/>
                        : <CreateOutline className={cls.icon} fill={fill}/>}

                    <span className={cls.link}>
                        {t('create')}
                    </span>
                </AppLink>
                <AppLink
                    href={`${AppRoutes.PROFILE.MY_PROFILE}`}
                    active={currentPath === AppRoutes.PROFILE.MY_PROFILE}
                    className={clsx(cls.item, { [cls.active]: currentPath === AppRoutes.PROFILE.MY_PROFILE })}
                >
                    {currentPath === AppRoutes.PROFILE.MY_PROFILE
                        ? <Profile className={cls.icon}/>
                        : <ProfileOutline className={cls.icon} fill={fill}/>
                    }

                    <span className={cls.link}>
                        {t('myProfile')}
                    </span>
                </AppLink>
            </div>
            <div className={cls.extra}>
                <AppLink
                    href={AppRoutes.STATISTICS}
                    active={currentPath === AppRoutes.STATISTICS}
                    className={clsx(cls.item, { [cls.active]: currentPath === AppRoutes.STATISTICS })}
                >
                    <Statistics className={cls.icon} fill={fill}/>

                    <span className={cls.link}>
                        {t('statistics')}
                    </span>
                </AppLink>
                <AppLink
                    href={AppRoutes.FAVORITES}
                    active={currentPath === AppRoutes.FAVORITES}
                    className={clsx(cls.item, { [cls.active]: currentPath === AppRoutes.FAVORITES })}
                >
                    {currentPath === AppRoutes.FAVORITES
                        ? <Favorites className={cls.icon}/>
                        : <FavoritesOutline className={cls.icon} fill={fill}/>
                    }

                    <span className={cls.link}>
                        {t('favorites')}
                    </span>
                </AppLink>
            </div>
            <Logout className={cls.button} />
        </div>
    )
}
