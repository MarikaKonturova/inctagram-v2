import { useGetUserProfileData } from 'entities/Profile'
import { useAuth } from 'features/auth'
import { FollowAndUnfollowButton, ProfileMainInfo, SendMessageButton } from 'features/profile'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AppRoutes } from 'shared/constants/path'
import { Button } from 'shared/ui'
import { PostCards } from 'templates/profile'

import cls from './UserProfilePage.module.scss'

export const UserProfilePage = () => {
  const router = useRouter()

  const userName: string =
    typeof router.query.userprofile === 'string' ? router.query.userprofile : ''

  const { data } = useGetUserProfileData(userName)

  const userData = data?.data
  const { userId } = useAuth()
  const isMyProfile = userId === userData?.id
  const { t } = useTranslation('profile')

  const onProfileSettingsClick = () => {
    void router.push(AppRoutes.PROFILE.SETTINGS)
  }

  const myProfileActions = (
    <Button className={cls.button} onClick={onProfileSettingsClick}>
      {t('settings')}
    </Button>
  )

  const userActions = (
    <div>
      <SendMessageButton />
      <FollowAndUnfollowButton
        isFollowing={userData?.isFollowing}
        userId={userData?.id}
        userName={userData?.userName}
      />
    </div>
  )

  return (
    <div className={cls.container}>
      <ProfileMainInfo
        actionsSlot={isMyProfile ? myProfileActions : userActions}
        userData={userData}
      />
      {userData && <PostCards isMyProfile={isMyProfile} userData={userData} />}
    </div>
  )
}
