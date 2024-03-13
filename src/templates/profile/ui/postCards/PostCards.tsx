import { useQueryClient } from '@tanstack/react-query'
import { useGetPosts } from 'entities/Home'
import { Description, useGetMyPost } from 'entities/Post'
import {
  DeleteMyPostButton,
  DeletePostModal,
  EditPostModal,
  UpdateMyPostButton,
} from 'features/post'
import React, { type FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { MyPostService } from 'shared/api'
import { MODALS, type Values } from 'shared/constants/post'
import { type ProfileDataModel } from 'shared/types/auth'
import { type PostResponse, type ResponseType } from 'shared/types/post'
import { Card, Loader, MoreOptions } from 'shared/ui'
import { Commentaries } from 'widgets/commentaries'
import { GetPostModal, PostModalActions } from 'widgets/post'

import cls from './PostCards.module.scss'

interface Props {
  userData: ProfileDataModel
}

export const PostCards: FC<Props> = ({ userData }) => {
  const queryClient = useQueryClient()
  const { inView, ref } = useInView({
    threshold: 1,
  })
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useGetPosts(
    userData.userName
  )

  const [currentModal, setCurrentModal] = useState<Values | null>(null)
  const [postId, setPostId] = useState<number>(0)
  const [isDelePostConfirmationModalOpen, setIsDelePostConfirmationModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [currentPost, setCurrentPost] = useState<number>(0)

  const { post } = useGetMyPost(currentPost)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const idsArray =
    data && data.pages ? data.pages.flatMap(page => page.items.map(item => item.id)) : []

  const foundIndex = idsArray.findIndex(id => id === postId)
  const firstElement = idsArray[0] === idsArray[currentIndex]
  const lastElement = idsArray[idsArray.length - 1] === idsArray[currentIndex]

  const handleClick = (direction: 'back' | 'next') => {
    if (direction === 'back' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (direction === 'next' && currentIndex < idsArray.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const renderContent = (page: ResponseType) =>
    page.items.map((item: PostResponse, index) => {
      const lastElement = index === page.items.length - 1

      const onPostCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setPostId(item.id)

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
    setCurrentIndex(foundIndex)
  }, [postId])

  useEffect(() => {
    if (idsArray[currentIndex]) {
      setCurrentPost(idsArray[currentIndex])
    } else {
      setCurrentPost(postId)
    }
  }, [currentIndex, idsArray, postId])

  useEffect(() => {
    idsArray.map(id => {
      queryClient.prefetchQuery(['post', id], () => MyPostService.getPost(id))
    })
  }, [idsArray])

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

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
                  <>
                    <UpdateMyPostButton openEditPostModal={openEditPostModal} />
                    <DeleteMyPostButton openDeletePostModal={openDeletePostModal} />
                  </>
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
