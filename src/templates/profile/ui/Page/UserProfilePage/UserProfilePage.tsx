import { useGetUserProfileData } from 'entities/Profile'
import { ProfileMainInfo } from 'features/profile'
import { useRouter } from 'next/router'
import React from 'react'

import { PostCards } from '../../PostCards'
import cls from './UserProfilePage.module.scss'

export const UserProfilePage = () => {
  const router = useRouter()

  const userName: string =
    typeof router.query.userprofile === 'string' ? router.query.userprofile : ''

  const { data } = useGetUserProfileData(userName)

  const userData = data?.data

  return (
    <div className={cls.container}>
      <ProfileMainInfo page={'userProfile'} userData={userData} />
      {userData && <PostCards userData={userData} />}
    </div>
  )
}
