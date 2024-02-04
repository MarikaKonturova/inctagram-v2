import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { AppRoutes } from 'shared/constants/path'
import { ProfileDataModel } from 'shared/types/auth'
import { Avatar, Button } from 'shared/ui'

import cls from './ProfileMainInfoStyles.module.scss'

type PropsType = {
  activateFollowersMode: () => void
  activateFollowingMode: () => void
  button: 'myProfile' | 'userProfile'
  followingCount?: number
  userData?: ProfileDataModel
}

export const ProfileMainInfo: FC<PropsType> = ({
  activateFollowersMode,
  activateFollowingMode,
  button,
  followingCount,
  userData,
}) => {
  const router = useRouter()
  const { t } = useTranslation('profile')

  const { aboutMe, followersCount, publicationsCount, userName } = userData || {}

  const onProfileSettingsClick = () => {
    void router.push(AppRoutes.PROFILE.SETTINGS)
  }
  const onClick = () => {
    alert('Заглушка')
  }

  const userButton = (
    <div>
      <Button className={cls.buttonPrimary} onClick={onClick}>
        {t('sendMessage')}
      </Button>
      <Button className={cls.buttonSecondary} onClick={onClick}>
        {t('follow')}
      </Button>
    </div>
  )

  const myButton = (
    <Button className={cls.button} onClick={onProfileSettingsClick}>
      {t('settings')}
    </Button>
  )

  return (
    <div className={cls.flex}>
      <div className={cls.avatar}>
        <Avatar size={192} src={userData?.avatars?.medium.url} />
      </div>
      <div className={cls.rightSide}>
        <div className={cls.main}>
          <div className={cls.userName}>{userName}</div>
          {button === 'myProfile' ? myButton : userButton}
        </div>
        <div className={cls.info}>
          <div onClick={activateFollowingMode}>
            <div className={cls.subscribe}>{followingCount}</div>
            <div className={cls.subscribeTitle}>{t('subscriptions')}</div>
          </div>
          <div onClick={activateFollowersMode}>
            <div className={cls.subscribe}>{followersCount}</div>
            <div className={cls.subscribeTitle}>{t('subscribers')}</div>
          </div>
          <div>
            <div className={cls.subscribe}>{publicationsCount}</div>
            <div>{t('publications')}</div>
          </div>
        </div>
        <div className={cls.aboutMe}>{aboutMe}</div>
      </div>
    </div>
  )
}
