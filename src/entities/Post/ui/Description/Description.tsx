import React, { FC } from 'react'
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
      <Avatar
        alt={'avatar'}
        size={36}
        src={post.avatars?.thumbnail.url}
        viewBox={'-11 -11 70 70'}
      />
      <div className={cls.content}>
        <p className={cls.info}>
          <b className={cls.userName}>{post.userName}</b>
          {post.description}
        </p>
        <CreationDate date={post.updatedAt} />
      </div>
    </div>
  )
}
