import { useGetPosts } from 'entities/Home'
import { Description, useGetMyPost } from 'entities/Post'
import { useRouter } from 'next/router'
import React, { type FC, useCallback, useEffect, useState } from 'react'
import { AppRoutes } from 'shared/constants/path'
import { MODALS, type Values } from 'shared/constants/post'
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll'
import { usePostManagement } from 'shared/hooks/usePostManagement'
import { type ProfileDataModel } from 'shared/types/auth'
import { type PostResponse, type ResponseType } from 'shared/types/post'
import { Card, Loader } from 'shared/ui'
import { Commentaries } from 'widgets/commentaries'
import { PostManagementModal } from 'widgets/post'

import cls from './PostCards.module.scss'

interface Props {
  isMyProfile: boolean
  userData: ProfileDataModel
}

export const PostCards: FC<Props> = ({ isMyProfile, userData }) => {
  const router = useRouter()
  const [postId, setPostId] = useState<number>(Number(router.query.postId) || 0)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useGetPosts(
    userData.userName
  )

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

  const {
    currentIndex,
    currentPost,
    firstElement,
    foundIndex,
    idsArray,
    lastElement,
    ref,
    setCurrentIndex,
  } = useInfiniteScroll({
    data,
    fetchNextPage,
    hasNextPage: hasNextPage || false,
    postId,
  })
  const { post } = useGetMyPost(currentPost)

  const handleClick = (direction: 'back' | 'next') => {
    if (direction === 'back' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      router.query.postId = String(idsArray[currentIndex - 1])
    } else if (direction === 'next' && currentIndex < idsArray.length - 1) {
      router.query.postId = String(idsArray[currentIndex + 1])
      setCurrentIndex(currentIndex + 1)
    }

    router.push(router)
  }

  const handleClose = useCallback(() => {
    closeModal()
    setCurrentIndex(foundIndex)
  }, [closeModal, foundIndex, setCurrentIndex])

  const renderContent = (page: ResponseType) =>
    page.items.map((item: PostResponse, index) => {
      const lastElement = index === page.items.length - 1

      const onPostCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setPostId(item.id)
        router.query.postId = String(item.id)
        router.push(router)
        openModal(MODALS.GetPostModal)
      }

      return (
        <div
          className={cls.card}
          key={item.id}
          onClick={onPostCardClick}
          ref={lastElement ? ref : null}
        >
          <Card
            alt={'post'}
            cardWrapperClassName={cls.cardWrapper}
            src={item.images[0]?.versions.huge?.url}
          />
        </div>
      )
    })

  useEffect(() => {
    if (router.query.postId) {
      setPostId(Number(router.query.postId))
    } else {
      handleClose()
    }
  }, [handleClose, router.query.postId])

  useEffect(() => {
    const hasPost = router.query.postId && post
    const isNotMyPost = hasPost && post?.userName !== userData.userName
    const isMyPost = hasPost && post?.userName === userData.userName

    if (isMyPost) {
      openModal(MODALS.GetPostModal)
    }

    if (isNotMyPost) {
      router.push(
        `${AppRoutes.PROFILE.PROFILE}/${post?.userName}?postId=${post?.id ?? router.query.postId}`
      )
    }
  }, [openModal, post, post?.id, post?.userName, router, userData.userName])

  return (
    <>
      <div className={cls.cardsList}>{data?.pages.map(page => page && renderContent(page))}</div>

      {!!post && (
        <PostManagementModal
          closeDeletePostModal={closeDeletePostModal}
          closeModal={handleClose}
          content={
            <div className={cls.content}>
              {post?.description && <Description post={post} />}
              <Commentaries post={post} postId={idsArray[currentIndex] || postId} />
            </div>
          }
          currentModal={currentModal}
          firstElement={firstElement}
          handleClick={handleClick}
          isDelePostConfirmationModalOpen={isDeletePostConfirmationModalOpen}
          isMyProfile={isMyProfile}
          lastElement={lastElement}
          openDeletePostModal={openDeletePostModal}
          openEditPostModal={openEditPostModal}
          post={post}
          postId={postId}
          setIsDelePostConfirmationModalOpen={setIsDeletePostConfirmationModalOpen}
          userData={userData}
        />
      )}
      {isSuccess && isFetchingNextPage && (
        <div className={cls.loaderContainer}>
          <Loader />
        </div>
      )}
    </>
  )
}
