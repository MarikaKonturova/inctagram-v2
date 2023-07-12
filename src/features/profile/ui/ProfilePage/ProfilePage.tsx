import React from 'react'
import { Avatar, Card } from 'shared/ui'
import { useGetProfileData } from '../../model'

import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
    const { response } = useGetProfileData()
    const userData = response?.data

    return (
        <div className={cls.container}>
            <div className={cls.flex}>
                <div className={cls.avatar}>
                    <Avatar size={192} src={userData ? userData.avatarUrl : undefined} />
                </div>
                <div>
                    <div className={cls.userName}>{userData?.userName}</div>
                    <div className={cls.info}>
                        <div>
                            <div className={cls.subscribe}>2 218</div>
                            <div>Subscriptions</div>
                        </div>
                        <div>
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
            <div className={cls.cardsList}>
                <div className={cls.card}>
                    <Card src={''} alt={''} />
                </div>
            </div>
        </div>
    )
}
