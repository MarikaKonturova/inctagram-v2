import { InfiniteData } from '@tanstack/react-query'
import clsx from 'clsx'
import { useGetMyPost } from 'entities/Post/model'
import { useGetProfileData } from 'entities/Profile'
import {
  AddPostToFavoutitesIconButton,
  GetCommentaries,
  LikePostIconButton,
  SharePostIconButton,
} from 'features/post'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { MODALS, type Values } from 'shared/constants/post'
import { type FavoritesType } from 'shared/types/post'
import { Card, Loader } from 'shared/ui'
import { GetPostModal } from 'widgets/GetPostModal'

import { useGetFavoritesData } from '../model'
import cls from './Favorites.module.scss'

export const FavoritesPage = () => {
  const { response } = useGetProfileData()
  const userData = response?.data
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useGetFavoritesData(
    response?.data.userName
  )
  const { inView, ref } = useInView({ threshold: 0.0 })
  const [currentModal, setCurrentModal] = useState<Values | null>(null)
  const [postId, setPostId] = useState<number | undefined>(undefined)
  const { post } = useGetMyPost(postId || 0)

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage])

  const openModal = (id: Values) => {
    if (currentModal !== null) {
      closeModal()
    }
    setCurrentModal(id)
  }

  const closeModal = () => {
    setCurrentModal(null)
  }
  const renderContent = (page: FavoritesType) => {
    return page.items.map(item => {
      const onPostClick = () => {
        openModal(MODALS.GetPostModal)
        setPostId(item.id)
      }

      return (
        <div className={cls.card} key={item.id} onClick={onPostClick}>
          <Card
            alt={'post'}
            cardWrapperClassName={cls.cardWrapper}
            skeletonHeight={item.images[0]?.versions.huge?.height}
            skeletonWidth={item.images[0]?.versions.huge?.width}
            src={item.images[0]?.versions.huge?.url}
          />
        </div>
      )
    })
  }

  return (
    <div className={cls.favoritesPage}>
      <div className={cls.cardsList}>
        {(data as InfiniteData<FavoritesType>)?.pages.map(page => page && renderContent(page))}
      </div>

      {postId && post && userData && (
        <GetPostModal
          actionsSlot={
            <div className={clsx(cls.container)}>
              <div className={clsx(cls.left_group)}>
                <LikePostIconButton postId={post.id} postIsLiked={post.isLiked} />
                <SharePostIconButton />
              </div>
              <AddPostToFavoutitesIconButton postId={post.id} postIsFavourite={post.isFavorite} />
            </div>
          }
          content={<GetCommentaries key={postId} postId={postId} userData={userData} />}
          handleClose={closeModal}
          id={MODALS.GetPostModal}
          isOpen={currentModal === MODALS.GetPostModal}
          key={postId}
          post={post}
          userName={response?.data.userName}
        />
      )}

      {isSuccess && (
        <div className={cls.loaderContainer} ref={ref}>
          {isFetchingNextPage && <Loader />}
        </div>
      )}
    </div>
  )
}
