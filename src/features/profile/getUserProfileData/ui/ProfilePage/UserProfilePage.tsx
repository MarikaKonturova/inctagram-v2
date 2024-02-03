import { PostCards } from 'features/profile/getPosts/ui/PostCards/PostCards'
import cls from 'features/profile/getUserProfileData/ui/ProfilePage/UserProfilePage.module.scss'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AppRoutes } from 'shared/constants/path'
import { Avatar, Button } from 'shared/ui'

import { useGetUserProfileData } from '../../model'
import { FollowingAndFollowersModal } from './modals/FollowModal/ui'

export const UserProfilePage = () => {
  const router = useRouter()

  const userName: string =
    typeof router.query.userprofile === 'string' ? router.query.userprofile : ''

  const { data } = useGetUserProfileData(userName)

  const userData = data?.data

  const [isModalOpen, setModalOpen] = useState(false)
  const [isSubscriptionsModalOpen, setIsSubscriptionsModalOpen] = useState(false)
  const [followingCount, setFollowingCount] = useState<number | undefined>(userData?.followingCount)

  useEffect(() => {
    setFollowingCount(userData?.followingCount)
  }, [userData])

  const openModal = () => {
    setModalOpen(true)
  }
  const openSubscriptionModal = () => {
    setIsSubscriptionsModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const closeSubscriptionsModal = () => {
    setIsSubscriptionsModalOpen(false)
  }

  const handleFollowingChange = (action: 'follow' | 'unfollow') => {
    setFollowingCount(prevCount => {
      if (!prevCount) {
        return 0
      }

      return action === 'follow' ? prevCount + 1 : prevCount - 1
    })
  }

  const onClick = () => {
    alert('ok')
  }

  return (
    <div className={cls.container}>
      <div className={cls.flex}>
        <div className={cls.avatar}>
          <Avatar size={192} src={userData?.avatars?.medium.url} />
        </div>
        <div className={cls.rightSide}>
          <div className={cls.main}>
            <div className={cls.userName}>{userData?.userName}</div>
            <div>
              <Button className={cls.buttonPrimary} onClick={onClick}>
                Follow
              </Button>
              <Button className={cls.button} onClick={onClick}>
                Send Message
              </Button>
            </div>
          </div>
          <div className={cls.info}>
            <div onClick={openSubscriptionModal}>
              <div className={cls.subscribe}>{followingCount}</div>
              <div className={cls.subscribeTitle}>Subscriptions</div>
            </div>
            <div onClick={openModal}>
              <div className={cls.subscribe}>{userData?.followersCount}</div>
              <div className={cls.subscribeTitle}>Subscribers</div>
            </div>
            <div>
              <div className={cls.subscribe}>{userData?.publicationsCount}</div>
              <div>Publications</div>
            </div>
          </div>
          <div className={cls.aboutMe}>{userData?.aboutMe}</div>
        </div>
      </div>
      {userData && <PostCards userData={userData} />}
      {isModalOpen && (
        <FollowingAndFollowersModal
          fetchDataName={'followers'}
          isOpen={isModalOpen}
          onClose={closeModal}
          onFollowingChange={handleFollowingChange}
          userName={userData?.userName}
        />
      )}
      {isSubscriptionsModalOpen && (
        <FollowingAndFollowersModal
          fetchDataName={'following'}
          isOpen={isSubscriptionsModalOpen}
          onClose={closeSubscriptionsModal}
          onFollowingChange={handleFollowingChange}
          userName={userData?.userName}
        />
      )}
    </div>
  )
}
