import { useGetProfileData } from 'entities/Profile'
import { useAuth } from 'features/auth'
import { ProfileMainInfo } from 'features/profile'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { AppRoutes } from 'shared/constants/path'
import { Button } from 'shared/ui'
import { PostCards } from 'templates/profile'

import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const { response } = useGetProfileData()
  const userData = response?.data
  const { userId } = useAuth()
  const isMyProfile = userId === userData?.id
  const { t } = useTranslation('profile')
  const router = useRouter()

  const onProfileSettingsClick = () => {
    void router.push(AppRoutes.PROFILE.SETTINGS)
  }
  const button = (
    <Button className={cls.button} onClick={onProfileSettingsClick}>
      {t('settings')}
    </Button>
  )

  return (
    <div className={cls.container}>
      <ProfileMainInfo actionsSlot={button} userData={userData} />
      {userData && <PostCards isMyProfile={isMyProfile} userData={userData} />}
    </div>
  )
}
