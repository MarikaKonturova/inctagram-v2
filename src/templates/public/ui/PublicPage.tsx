import { AxiosResponse } from 'axios';
import { Description, useGetMyPost } from 'entities/Post'
import { useGetUserProfileData } from 'entities/Profile';
import {RegisteredUsers} from 'entities/Public';
import { useAuth } from 'features/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { MODALS } from 'shared/constants/post';
import { usePostManagement } from 'shared/hooks/usePostManagement';
import {LastPublicationsResponse} from 'shared/types/home';
import {PostResponse} from 'shared/types/post';
import { Commentaries } from 'widgets/commentaries'
import { PostManagementModal } from 'widgets/post'
import {PublicPostList} from 'widgets/public';

import cls from './PublicPage.module.scss'

export interface PublicPageProps {
  data: LastPublicationsResponse
}

export const PublicPage = ({data}: PublicPageProps) => {
  const router = useRouter()
  const { userId } = useAuth()
  const [post, setPost] = useState<PostResponse | null>(null)
  const { post: postData } = useGetMyPost(Number(router.query.postId))
  const {
    closeDeletePostModal,
    closeModal,
    currentModal,
    isDeletePostConfirmationModalOpen,
    openDeletePostModal,
    openEditPostModal,
    openModal,
    setIsDeletePostConfirmationModalOpen,
  } = usePostManagement()
  const [isFollowing, setIsFollowing] = useState(false)
 
  const getUserProfileSuccessHandler = (data: AxiosResponse<PostResponse>) => {
    setIsFollowing(data?.data.isFollowing ?? false)
  }

  useGetUserProfileData<PostResponse>(post?.userName || '', getUserProfileSuccessHandler)

  const openPost = (post: PostResponse) => {
    setPost(post)
    openModal(MODALS.GetPostModal)
 
    router.query.postId = String(post.id)
    router.push(router)
  }

  const handleClose = () => {
    closeModal()
    setPost(null)
  }

  useEffect(() => {
    if(postData) {
      setPost(postData)
      openModal(MODALS.GetPostModal)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cls.container}>
      <RegisteredUsers className={cls.users} userCount={data.countUsers} />
      {data.lastPosts && <PublicPostList openPost={openPost} posts={data.lastPosts} />}
      {!!post && <PostManagementModal
        closeDeletePostModal={closeDeletePostModal}
        closeModal={handleClose}
        content={
          <div className={cls.content}>
            {post?.description && <Description post={post} />}
            <Commentaries post={post} postId={post?.id} />
          </div>
        }
        currentModal={currentModal}
        isDelePostConfirmationModalOpen={isDeletePostConfirmationModalOpen}
        isFollowing={isFollowing}
        isMyProfile={userId === post.ownerId}
        isPublic
        openDeletePostModal={openDeletePostModal}
        openEditPostModal={openEditPostModal}
        post={post}
        setIsDelePostConfirmationModalOpen={setIsDeletePostConfirmationModalOpen}
        userData={{
          id: post.ownerId,
          isFollowing: post.isFollowing,
          userName: post.userName,
        }}
      />}
    </div>
  )
}
