import { useGetProfileData } from 'entities/Profile'
import { ProfileMainInfo } from 'features/profile'
import React from 'react'
import { PostCards } from 'templates/profile'

import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const { response } = useGetProfileData()
  const userData = response?.data

  return (
    <div className={cls.container}>
      <ProfileMainInfo page={'myProfile'} userData={userData} />
      {userData && <PostCards userData={userData} />}
    </div>
  )
}
