import { Description, useGetMyPost } from 'entities/Post'
import {RegisteredUsers} from 'entities/Public';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import {LastPublicationsResponse} from 'shared/types/home';
import {PostResponse} from 'shared/types/post';
import { Commentaries } from 'widgets/commentaries'
import { GetPostModal } from 'widgets/post'
import {PublicPostList} from 'widgets/public';

import cls from './PublicPage.module.scss'

export interface PublicPageProps {
  data: LastPublicationsResponse
}

export const PublicPage = ({data}: PublicPageProps) => {
  const router = useRouter()
  const [post, setPost] = useState<PostResponse | null>(null)
  const { post: postData } = useGetMyPost(Number(router.query.postId))
  
  const openPost = (post: PostResponse) => {
    setPost(post)
    router.replace(`${router.route}?postId=${post.id}`)
  }

  const handleClose = () => {
    setPost(null)
    router.replace(`${router.route}`)
  }

    useEffect(() => {
      if(postData) {
        setPost(postData)
      }
    }, [postData])

  return (
    <div className={cls.container}>
      <RegisteredUsers className={cls.users} userCount={data.countUsers} />
      {data.lastPosts && <PublicPostList openPost={openPost} posts={data.lastPosts} />}
      {post && <GetPostModal
              content={
                <div className={cls.content}>
                  {post.description && <Description post={post} />}
                  <Commentaries postId={post.id} />
                </div>
              }
              handleClose={handleClose}
              isOpen={post !== null}
              key={'GetPostModal'}
              post={post}
            />}
    </div>
  )
}
