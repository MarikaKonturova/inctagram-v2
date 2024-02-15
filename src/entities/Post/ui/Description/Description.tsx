import React, { FC } from 'react'
import userPhoto from 'shared/assets/images/user.png'
import { PostResponse } from 'shared/types/post'
import { Avatar } from 'shared/ui'

import { CreationDate } from '../CreationDate'
import cls from './Description.module.scss'

type PropsType = {
  post: PostResponse
}

export const Description: FC<PropsType> = ({ post }) => {
  return (
    <div className={cls.container}>
      <Avatar src={post.avatars?.thumbnail.url || userPhoto.src} />
      <div className={cls.content}>
        <p className={cls.info}>
          <span className={cls.userName}>{post.userName}</span>
          <span>{post.description}</span>
        </p>
        <CreationDate date={post.updatedAt} type={'agoTime'} />
      </div>
    </div>
  )
}
