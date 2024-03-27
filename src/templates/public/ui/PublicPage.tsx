import {RegisteredUsers} from 'entities/Public';
import { useAuth } from 'features/auth';
import { useRouter } from 'next/router';
import React from 'react'
import { AppRoutes } from 'shared/constants/path';
import {LastPublicationsResponse} from 'shared/types/home';
import {PostResponse} from 'shared/types/post';
import {PublicPostList} from 'widgets/public';

import cls from './PublicPage.module.scss'

export interface PublicPageProps {
  data: LastPublicationsResponse
}

export const PublicPage = ({data}: PublicPageProps) => {
  const router = useRouter()
  const { userId } = useAuth()

  const openPost = (post: PostResponse) => {
    const hasPost = post && post.id
    const isMyPost = hasPost && post.ownerId === userId
    const path = isMyPost ? AppRoutes.PROFILE.MY_PROFILE : `${AppRoutes.PROFILE.PROFILE}/${post.userName}`

    if(hasPost) {
      router.push(`${path}?postId=${post.id}`)
    }
  }

  return (
    <div className={cls.container}>
      <RegisteredUsers className={cls.users} userCount={data.countUsers} />
      {data.lastPosts && <PublicPostList openPost={openPost} posts={data.lastPosts} />}
    </div>
  )
}
