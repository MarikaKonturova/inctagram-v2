import { useGetUserProfileData } from 'entities/Profile'
import { FollowingAndFollowersModal } from 'features/profile'
import { useTranslation } from 'next-i18next'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import BusinessLogo from 'shared/assets/icons/general/business-logo.svg'
import { BUTTON_VARIANTS } from 'shared/constants'
import { ProfileDataModel } from 'shared/types/auth'
import { AvatarSizes } from 'shared/types/post'
import { Avatar, Button } from 'shared/ui'

import cls from './ProfileMainInfo.module.scss'

type PropsType = {
  actionsSlot: ReactNode
  userData?: ProfileDataModel
}

export const ProfileMainInfo: FC<PropsType> = ({ actionsSlot, userData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [mode, setMode] = useState<'followers' | 'following'>('followers')
  const [followingCount, setFollowingCount] = useState<number | undefined>(userData?.followingCount)
  const { data } = useGetUserProfileData(userData?.userName ?? '')

  const { t } = useTranslation('profile')
  const userNameData = data?.data

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

  useEffect(() => {
    setFollowingCount(userData?.followingCount)
  }, [userData])

  return (
    <div className={cls.flex}>
      <div className={cls.avatar}>
        <Avatar size={AvatarSizes.large} src={userData?.avatars?.medium.url} />
      </div>
      <div className={cls.rightSide}>
        <div className={cls.main}>
          <div className={cls.userName}>
            {userName} {userNameData?.hasBusinessAccount ? <BusinessLogo /> : ''}
          </div>
          {actionsSlot}
        </div>
        <div className={cls.info}>
          <Button onClick={activateFollowingMode} theme={BUTTON_VARIANTS.CLEAR}>
            <div className={cls.subscribe}>{followingCount}</div>
            <div className={cls.subscribeTitle}>{t('subscriptions')}</div>
          </Button>
          <Button onClick={activateFollowersMode} theme={BUTTON_VARIANTS.CLEAR}>
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
