import { useGetUserProfileData } from 'entities/Profile'
import { useAuth } from 'features/auth'
import { FollowAndUnfollowButton, ProfileMainInfo, SendMessageButton } from 'features/profile'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { AppRoutes } from 'shared/constants/path'
import { ProfileDataModel } from 'shared/types/auth'
import { Button } from 'shared/ui'
import { PostCards } from 'templates/profile'

import cls from './UserProfilePage.module.scss'

export const UserProfilePage = () => {
  const router = useRouter()

  const userName: string =
    typeof router.query.userprofile === 'string' ? router.query.userprofile : ''

  const { data } = useGetUserProfileData<ProfileDataModel>(userName)

  const userData = data?.data
  const { isAuth, userId } = useAuth()
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
      {userData && (
        <FollowAndUnfollowButton
          isFollowing={userData.isFollowing}
          userId={userData.id}
          userName={userData.userName}
        />
      )}
    </div>
  )
  const button = isMyProfile ? myProfileActions : userActions

  return (
    <div className={cls.container}>
      <ProfileMainInfo actionsSlot={button} isAuth={isAuth} userData={userData} />
      {userData && <PostCards isMyProfile={isMyProfile} userData={userData} />}
    </div>
  )
}
