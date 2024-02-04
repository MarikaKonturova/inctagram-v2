import { useGetUserProfileData } from 'entities/Profile'
import { ProfileMainInfo } from 'entities/Profile/MainInfo'
import { FollowingAndFollowersModal } from 'features/profile'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button } from 'shared/ui'
import { PostCards } from 'templates/profile/ui/PostCards'

import cls from './UserProfilePage.module.scss'

export const UserProfilePage = () => {
  const router = useRouter()

  const userName: string =
    typeof router.query.userprofile === 'string' ? router.query.userprofile : ''

  const { data } = useGetUserProfileData(userName)

  const userData = data?.data

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [mode, setMode] = useState<'followers' | 'following'>('followers')
  const [followingCount, setFollowingCount] = useState<number | undefined>(userData?.followingCount)
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
    <div className={cls.container}>
      <ProfileMainInfo
        activateFollowersMode={activateFollowersMode}
        activateFollowingMode={activateFollowingMode}
        button={'userProfile'}
        followingCount={followingCount}
        userData={userData}
      />
      {userData && <PostCards userData={userData} />}
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