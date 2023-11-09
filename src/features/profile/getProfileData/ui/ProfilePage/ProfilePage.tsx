import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { PostCards } from 'features/profile/getPosts/ui/PostCards/PostCards'
import { AppRoutes } from 'shared/constants/path'
import { Avatar, Button } from 'shared/ui'
import { useGetProfileData } from '../../model'

import { FollowingAndFollowersModal } from './modals/FollowModal/ui'
import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
    const router = useRouter()
    const { response } = useGetProfileData()
    const userData = response?.data

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
            if (!prevCount) return 0
            return action === 'follow' ? prevCount + 1 : prevCount - 1
        })
    }

    const onProfileSettingsClick = () => {
        void router.push(AppRoutes.PROFILE.SETTINGS)
    }

    return (
        <div className={cls.container}>
            <div className={cls.flex}>
                <div className={cls.avatar}>
                    <Avatar size={192} src={userData?.avatars?.medium.url } />
                </div>
                <div className={cls.rightSide}>
                    <div className={cls.main}>
                        <div className={cls.userName}>{userData?.userName}</div>
                        <Button className={cls.button} onClick={onProfileSettingsClick}>Profile Settings</Button>
                    </div>
                    <div className={cls.info}>
                        <div onClick={openSubscriptionModal}>
                            <div className={cls.subscribe}>{followingCount}</div>
                            <div>Subscriptions</div>
                        </div>
                        <div onClick={openModal}>
                            <div className={cls.subscribe}>{userData?.followersCount}</div>
                            <div>Subscribers</div>
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
            {
                isModalOpen && <FollowingAndFollowersModal isOpen={isModalOpen}
                                                           onClose={closeModal}
                                                           userName={userData?.userName}
                                                           fetchDataName={'followers'}
                                                           onFollowingChange={handleFollowingChange}/>
            }
            {
                isSubscriptionsModalOpen && <FollowingAndFollowersModal isOpen={isSubscriptionsModalOpen}
                                                                        onClose={closeSubscriptionsModal}
                                                                        userName={userData?.userName}
                                                                        fetchDataName={'following'}
                                                                        onFollowingChange={handleFollowingChange}
                />
            }
        </div>
    )
}
