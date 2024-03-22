import { useGetPosts } from 'entities/Home'
import { Description, useGetMyPost } from 'entities/Post'
import {
  CopyToClipboard,
  DeleteMyPostButton,
  DeletePostModal,
  EditPostModal,
  UpdateMyPostButton,
} from 'features/post'
import { FollowAndUnfollowMenuItemButton } from 'features/profile'
import { useRouter } from 'next/router'
import React, { type FC, useEffect, useState } from 'react'
import { MODALS, type Values } from 'shared/constants/post'
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll'
import { type ProfileDataModel } from 'shared/types/auth'
import { type PostResponse, type ResponseType } from 'shared/types/post'
import { Card, Loader, MoreOptions } from 'shared/ui'
import { Commentaries } from 'widgets/commentaries'
import { GetPostModal, PostModalActions } from 'widgets/post'

import cls from './PostCards.module.scss'

interface Props {
  isMyProfile: boolean
  userData: ProfileDataModel
}

export const PostCards: FC<Props> = ({ isMyProfile, userData }) => {
  const [currentModal, setCurrentModal] = useState<Values | null>(null)
  const [postId, setPostId] = useState<number>(0)
  const [isDelePostConfirmationModalOpen, setIsDelePostConfirmationModalOpen] = useState(false)

  const router = useRouter()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useGetPosts(
    userData.userName
  )
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
      router.query.postId = String(idsArray[currentIndex] + 1)
    } else if (direction === 'next' && currentIndex < idsArray.length - 1) {
      setCurrentIndex(currentIndex + 1)
      router.query.postId = String(idsArray[currentIndex] - 1)
    }

    router.push(router)
  }

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

  const openModal = (id: Values) => {
    if (currentModal !== null) {
      closeModal()
    }
    setCurrentModal(id)
  }

  const closeModal = () => {
    setCurrentModal(null)
    setCurrentIndex(foundIndex)
    if (router.query.postId) {
      delete router.query.postId
      router.push(router, undefined, { shallow: true })
    }
  }

  const openEditPostModal = () => {
    openModal(MODALS.EditPostModal)
  }

  const openDeletePostModal = () => {
    setIsDelePostConfirmationModalOpen(true)
  }

  const closeDeletePostModal = () => {
    setIsDelePostConfirmationModalOpen(false)
    closeModal()
  }

  useEffect(() => {
    if (router.query.postId) {
      setPostId(Number(router.query.postId))
      openModal(MODALS.GetPostModal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={cls.cardsList}>{data?.pages.map(page => page && renderContent(page))}</div>

      {!!postId &&
        !!post && [
          <GetPostModal
            actionsSlot={<PostModalActions post={post} />}
            content={
              <div className={cls.content}>
                {post.description && <Description post={post} />}
                <Commentaries post={post} postId={idsArray[currentIndex] || postId} />
              </div>
            }
            firstElement={firstElement}
            handleClick={handleClick}
            handleClose={closeModal}
            headerActions={
              <MoreOptions
                content={
                  isMyProfile ? (
                    <>
                      <UpdateMyPostButton openEditPostModal={openEditPostModal} />
                      <DeleteMyPostButton openDeletePostModal={openDeletePostModal} />
                    </>
                  ) : (
                    <>
                      <FollowAndUnfollowMenuItemButton
                        isFollowing={userData.isFollowing}
                        userId={userData.id}
                        userName={userData.userName}
                      />
                      <CopyToClipboard publ={post} />
                    </>
                  )
                }
              />
            }
            id={MODALS.GetPostModal}
            isOpen={currentModal === MODALS.GetPostModal}
            key={'GetPostModal'}
            lastElement={lastElement}
            post={post}
          />,
          <EditPostModal
            handleClose={closeModal}
            id={MODALS.EditPostModal}
            isOpen={currentModal === MODALS.EditPostModal}
            key={'EditPostModal'}
            postId={postId}
          />,
          <DeletePostModal
            handleClose={closeDeletePostModal}
            isOpen={isDelePostConfirmationModalOpen}
            key={'DeletePostModal'}
            postId={postId}
            setIsOpen={setIsDelePostConfirmationModalOpen}
          />,
        ]}
      {isSuccess && isFetchingNextPage && (
        <div className={cls.loaderContainer}>
          <Loader />
        </div>
      )}
    </>
  )
}
