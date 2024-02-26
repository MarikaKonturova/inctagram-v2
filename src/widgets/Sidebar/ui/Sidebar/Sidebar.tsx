import clsx from 'clsx'
import { Logout } from 'features/auth'
import { CreatePostModal } from 'features/post'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import IconStatistics from 'shared/assets/icons/general/trending-up.svg'
import IconFavorites from 'shared/assets/icons/light/bookmark.svg'
import IconHome from 'shared/assets/icons/light/home.svg'
import IconProfile from 'shared/assets/icons/light/person.svg'
import IconCreate from 'shared/assets/icons/light/plus-square.svg'
import IconFavoritesOutline from 'shared/assets/icons/outline/bookmark-outline.svg'
import IconHomeOutline from 'shared/assets/icons/outline/home-outline.svg'
import IconProfileOutline from 'shared/assets/icons/outline/person-outline.svg'
import IconCreateOutline from 'shared/assets/icons/outline/plus-square-outline.svg'
import { AppRoutes } from 'shared/constants/path'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { AppLink } from 'shared/ui'

import cls from './Sidebar.module.scss'

interface SidebarProps {
  active?: string
  className?: string
}

export const Sidebar = (props: SidebarProps) => {
  const [open, setOpen] = useState(false)
  const { className } = props
  const { t } = useTranslation('common')
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const { asPath } = useRouter()
  const currentPath = asPath

  return (
    <div className={clsx(cls.Sidebar, [className])}>
      <div className={cls.menu}>
        <AppLink
          active={currentPath === AppRoutes.HOME}
          className={clsx(cls.item, { [cls.active]: currentPath === AppRoutes.HOME })}
          href={AppRoutes.HOME}
        >
          {currentPath === AppRoutes.HOME ? (
            <IconHome className={cls.icon} />
          ) : (
            <IconHomeOutline className={cls.icon} fill={fill} />
          )}
          <span className={cls.link}>{t('home')}</span>
        </AppLink>
        <button
          className={cls.item}
          onClick={() => {
            setOpen(true)
          }}
          type={'button'}
        >
          {!open ? (
            <IconCreateOutline className={cls.icon} fill={fill} />
          ) : (
            <IconCreate className={cls.icon} fill={fill} />
          )}
          <span className={cls.link}>{t('create')}</span>
        </button>
        <CreatePostModal
          handleClose={() => {
            setOpen(false)
          }}
          isOpen={open}
        />
        <AppLink
          active={currentPath === AppRoutes.PROFILE.MY_PROFILE}
          className={clsx(cls.item, { [cls.active]: currentPath === AppRoutes.PROFILE.MY_PROFILE })}
          href={`${AppRoutes.PROFILE.MY_PROFILE}`}
        >
          {currentPath === AppRoutes.PROFILE.MY_PROFILE ? (
            <IconProfile className={cls.icon} />
          ) : (
            <IconProfileOutline className={cls.icon} fill={fill} />
          )}

          <span className={cls.link}>{t('myProfile')}</span>
        </AppLink>
      </div>
      <div className={cls.extra}>
        <AppLink
          active={currentPath === AppRoutes.STATISTICS}
          className={clsx(cls.item, { [cls.active]: currentPath === AppRoutes.STATISTICS })}
          href={AppRoutes.STATISTICS}
        >
          <IconStatistics className={cls.icon} fill={fill} />

          <span className={cls.link}>{t('statistics')}</span>
        </AppLink>
        <AppLink
          active={currentPath === AppRoutes.FAVORITES}
          className={clsx(cls.item, { [cls.active]: currentPath === AppRoutes.FAVORITES })}
          href={AppRoutes.FAVORITES}
        >
          {currentPath === AppRoutes.FAVORITES ? (
            <IconFavorites className={cls.icon} />
          ) : (
            <IconFavoritesOutline className={cls.icon} fill={fill} />
          )}

          <span className={cls.link}>{t('favorites')}</span>
        </AppLink>
      </div>
      <Logout className={cls.button} />
    </div>
  )
}
