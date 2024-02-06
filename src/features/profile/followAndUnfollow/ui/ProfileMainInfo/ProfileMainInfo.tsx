import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { FC, useEffect, useState } from 'react'
import { AppRoutes } from 'shared/constants/path'
import { ProfileDataModel } from 'shared/types/auth'
import { Avatar, Button } from 'shared/ui'

import { FollowingAndFollowersModal } from '../FollowingAndFollowersModal'
import cls from './ProfileMainInfo.module.scss'

type PropsType = {
  page: 'myProfile' | 'userProfile'
  userData?: ProfileDataModel
}

export const ProfileMainInfo: FC<PropsType> = ({ page, userData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [mode, setMode] = useState<'followers' | 'following'>('followers')
  const [followingCount, setFollowingCount] = useState<number | undefined>(userData?.followingCount)
  const router = useRouter()
  const { t } = useTranslation('profile')

  const { aboutMe, followersCount, publicationsCount, userName } = userData || {}

  const openModal = () => setIsModalVisible(true)

  const closeModal = () => {
    setMode('followers')
    setIsModalVisible(false)
  }

  const activateFollowersMode = () => {
    openModal()
    setMode('followers')
  }

  const activateFollowingMode = () => {
    openModal()
    setMode('following')
  }

  const handleFollowingChange = (action: 'follow' | 'unfollow') => {
    setFollowingCount(prevCount => {
      if (!prevCount) {
        return 0
      }

      return action === 'follow' ? prevCount + 1 : prevCount - 1
    })
  }

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

  useEffect(() => {
    setFollowingCount(userData?.followingCount)
  }, [userData])

  return (
    <div className={cls.flex}>
      <div className={cls.avatar}>
        <Avatar size={192} src={userData?.avatars?.medium.url} />
      </div>
      <div className={cls.rightSide}>
        <div className={cls.main}>
          <div className={cls.userName}>{userName}</div>
          {page === 'myProfile' ? myButton : userButton}
        </div>
        <div className={cls.info}>
          <Button onClick={activateFollowingMode} theme={'clear'}>
            <div className={cls.subscribe}>{followingCount}</div>
            <div className={cls.subscribeTitle}>{t('subscriptions')}</div>
          </Button>
          <Button onClick={activateFollowersMode} theme={'clear'}>
            <div className={cls.subscribe}>{followersCount}</div>
            <div className={cls.subscribeTitle}>{t('subscribers')}</div>
          </Button>
          <div>
            <div className={cls.subscribe}>{publicationsCount}</div>
            <div>{t('publications')}</div>
          </div>
        </div>
        <div className={cls.aboutMe}>{aboutMe}</div>
      </div>
      {isModalVisible && (
        <FollowingAndFollowersModal
          fetchDataName={mode}
          isOpen={isModalVisible}
          onClose={closeModal}
          onFollowingChange={handleFollowingChange}
          userName={userData?.userName}
        />
      )}
    </div>
  )
}
