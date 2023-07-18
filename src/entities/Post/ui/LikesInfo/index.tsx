/* eslint-disable max-len */
import React from 'react'
import { Avatar } from 'shared/ui'
import cls from './styles.module.scss'

const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
]

export const LikesInfo = () => (
    <div className={cls.container}>
        <div className={cls.avatars}>
            {avatars.map(el => (
                <Avatar key={el} className={cls.avatar}
                        src={el}
                        size={24}
                        alt="avatar" />
            ))}
        </div>
        <div className={cls.likes}>2 243 &quot;Like&quot;</div>
    </div>
)
