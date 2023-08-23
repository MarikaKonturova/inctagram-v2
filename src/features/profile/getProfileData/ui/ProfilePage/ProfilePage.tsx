import React, { useState } from 'react'
import { PostCards } from 'features/profile/getPosts/ui/PostCards/PostCards'
import { SubscribersModal } from 'features/profile/getProfileData/ui/modals/FollowModal/ui'
import { Avatar } from 'shared/ui'
import { useGetProfileData } from '../../model'

import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
    const { response } = useGetProfileData()
    const userData = response?.data

    const [isModalOpen, setModalOpen] = useState(false)
    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className={cls.container}>
            <div className={cls.flex}>
                <div className={cls.avatar}>
                    <Avatar size={192}
                            src={(userData?.avatars && userData.avatars.length > 1)
                                ? userData.avatars[1]?.url
                                : undefined} />

                </div>
                <div>
                    <div className={cls.userName}>{userData?.userName}</div>
                    <div className={cls.info}>
                        <div onClick={openModal}>
                            <div className={cls.subscribe}>2 218</div>
                            <div>Subscriptions</div>
                        </div>
                        <div onClick={openModal}>
                            <div className={cls.subscribe}>2358</div>
                            <div>Subscribers</div>
                        </div>

                        <div>
                            <div className={cls.subscribe}>2764</div>
                            <div>Publications</div>
                        </div>
                    </div>
                    <div className={cls.aboutMe}>{userData?.aboutMe}</div>
                </div>
            </div>
            {userData && <PostCards userData={userData} />}
            {isModalOpen && <SubscribersModal onClose={closeModal} userName={userData?.userName} />}
        </div>
    )
}
