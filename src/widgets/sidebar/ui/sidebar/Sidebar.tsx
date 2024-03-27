import clsx from 'clsx'
import { Logout } from 'features/auth'
import { CreatePostModal } from 'features/post'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { ReactNode, useState } from 'react'
import IconStatistics from 'shared/assets/icons/general/trending-up.svg'
import IconFavorites from 'shared/assets/icons/light/bookmark.svg'
import IconHome from 'shared/assets/icons/light/home.svg'
import IconProfile from 'shared/assets/icons/light/person.svg'
import IconCreate from 'shared/assets/icons/light/plus-square.svg'
import IconSearch from 'shared/assets/icons/light/search.svg'
import IconFavoritesOutline from 'shared/assets/icons/outline/bookmark-outline.svg'
import { AppRoutes } from 'shared/constants/path'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { AppLink } from 'shared/ui'

import cls from './Sidebar.module.scss'

interface SidebarProps {
  active?: string
  className?: string
}

type ParamsType = {
  createPost: () => void
  fill: string
}

type MenuItemsType = {
  icon: ReactNode | Record<'active' | 'inactive', ReactNode>
  label: string
  onClick?: () => void
  route?: string
}

const getMenuItems = ({ createPost, fill }: ParamsType): MenuItemsType[] => [
  {
    icon: <IconHome className={cls.icon} />,
    label: 'home',
    route: AppRoutes.HOME,
  },
  {
    icon: <IconCreate className={cls.icon} fill={fill} />,
    label: 'create',
    onClick: createPost,
  },
  {
    icon: <IconProfile className={cls.icon} />,
    label: 'myProfile',
    route: AppRoutes.PROFILE.MY_PROFILE,
  },
  {
    icon: <IconSearch className={cls.icon} />,
    label: 'search',
    route: AppRoutes.SEARCH,
  },
  {
    icon: <IconStatistics className={cls.icon} fill={fill} />,
    label: 'statistics',
    route: AppRoutes.STATISTICS,
  },
  {
    icon: {
      active: <IconFavorites className={cls.icon} />,
      inactive: <IconFavoritesOutline className={cls.icon} fill={fill} />,
    },
    label: 'favorites',
    route: AppRoutes.FAVORITES,
  },
]

export const Sidebar = (props: SidebarProps) => {
  const { className } = props

  const [open, setOpen] = useState(false)
  const { t } = useTranslation('common')
  const { theme } = useTheme()
  const { asPath } = useRouter()

  const currentPath = asPath
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

  const createPost = () => {
    setOpen(true)
  }

  const menuItems = getMenuItems({ createPost, fill })

  const onModalClose = () => {
    setOpen(false)
  }

  return (
    <div className={clsx(cls.Sidebar, [className])}>
      <div className={cls.menu}>
        {menuItems.map(item => {
          // @ts-ignore
          const { active, inactive } = item.icon || {}

          let iconElement

          if (active && inactive) {
            iconElement = currentPath === item.route ? active : inactive
          } else {
            iconElement = item.icon
          }

          if (item.onClick) {
            return (
              <button
                className={cls.item}
                key={item.route || item.label}
                onClick={item.onClick}
                type={'button'}
              >
                {iconElement}
                <span className={cls.link}>{t(item.label)}</span>
              </button>
            )
          }

          return (
            <div
              className={clsx('', { [cls.extra]: item.label === 'statistics' })}
              key={item.route || item.label}
            >
              <AppLink
                active={currentPath === item.route}
                className={clsx(cls.item, {
                  [cls.active]: currentPath === item.route,
                })}
                href={item.route}
              >
                {iconElement}
                <span className={cls.link}>{t(item.label)}</span>
              </AppLink>
            </div>
          )
        })}
      </div>
      <CreatePostModal handleClose={onModalClose} isOpen={open} />
      <Logout className={cls.button} />
    </div>
  )
}
