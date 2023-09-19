import React, { useEffect, useState } from 'react'
import { PostCards } from 'features/profile/getPosts/ui/PostCards/PostCards'
import { Avatar } from 'shared/ui'
import { useGetProfileData } from '../../model'

import { SubscribersModal } from './modals/FollowModal/ui'
import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
    const { response } = useGetProfileData()
    const userData = response?.data

    const [isModalOpen, setModalOpen] = useState(false)
    const [followingCount, setFollowingCount] = useState<number | undefined>(userData?.followingCount)

    useEffect(() => {
        setFollowingCount(userData?.followingCount)
    }, [userData])

    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    const handleFollowingChange = (action: 'follow' | 'unfollow') => {
        setFollowingCount(prevCount => {
            if (!prevCount) return 0
            return action === 'follow' ? prevCount + 1 : prevCount - 1
        })
    }

    return (
        <div className={cls.container}>
            <div className={cls.flex}>
                <div className={cls.avatar}>
                    <Avatar size={192} src={userData?.avatars?.medium.url } />
                </div>
                <div>
                    <div className={cls.userName}>{userData?.userName}</div>
                    <div className={cls.info}>
                        <div>
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
            {isModalOpen && <SubscribersModal isOpen={isModalOpen}
                                              onClose={closeModal}
                                              userName={userData?.userName}
                                              onFollowingChange={handleFollowingChange} />}
        </div>
    )
}
