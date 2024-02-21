import { InfiniteData } from '@tanstack/react-query'
import { useGetFavoritesData } from 'entities/Favorites'
import { useGetMyPost } from 'entities/Post'
import { useGetProfileData } from 'entities/Profile'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { MODALS, type Values } from 'shared/constants/post'
import { type FavoritesType } from 'shared/types/post'
import { Card, Loader } from 'shared/ui'
import { Commentaries } from 'widgets/Commentaries'
import { GetPostModal, PostModalActions } from 'widgets/Post'

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
          actionsSlot={<PostModalActions post={post} />}
          content={<Commentaries key={postId} postId={postId} />}
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
