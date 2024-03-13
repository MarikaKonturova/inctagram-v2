import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useGetFavoritesData } from 'entities/Favorites'
import { useGetMyPost } from 'entities/Post'
import { useGetProfileData } from 'entities/Profile'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { MyPostService } from 'shared/api'
import { MODALS, type Values } from 'shared/constants/post'
import { type FavoritesType } from 'shared/types/post'
import { Card, Loader } from 'shared/ui'
import { Commentaries } from 'widgets/commentaries'
import { GetPostModal, PostModalActions } from 'widgets/post'

import cls from './Favorites.module.scss'

export const FavoritesPage = () => {
  const queryClient = useQueryClient()
  const { response } = useGetProfileData()
  const userData = response?.data
  const { t } = useTranslation('common')
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useGetFavoritesData(
    userData?.userName || ''
  )
  const { inView, ref } = useInView({ threshold: 1 })
  const [currentModal, setCurrentModal] = useState<Values | null>(null)
  const [postId, setPostId] = useState<number>(0)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [currentPost, setCurrentCurrentPost] = useState<number>(0)
  const { post } = useGetMyPost(currentPost)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const idsArray: number[] =
    data && data.pages
      ? data.pages.flatMap(page => page.items.map((item: { id: number }) => item.id))
      : []

  const findIndex = idsArray.findIndex(id => id === postId)
  const firstElement = idsArray[0] === idsArray[currentIndex]
  const lastElement = idsArray[idsArray.length - 1] === idsArray[currentIndex]

  useEffect(() => {
    if (idsArray[currentIndex]) {
      setCurrentCurrentPost(idsArray[currentIndex])
    } else {
      setCurrentCurrentPost(postId)
    }
  }, [postId, idsArray, currentIndex])

  useEffect(() => {
    setCurrentIndex(findIndex)
  }, [postId])

  useEffect(() => {
    {
      idsArray.map(id => {
        queryClient.prefetchQuery(['post', id], () => MyPostService.getPost(id))
      })
    }
  }, [idsArray])

  const handleClick = (direction: 'back' | 'next') => {
    if (direction === 'back' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (direction === 'next' && currentIndex < idsArray.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const openModal = (id: Values) => {
    if (currentModal !== null) {
      closeModal()
    }
    setCurrentModal(id)
  }

  const closeModal = () => {
    setCurrentModal(null)
    setCurrentIndex(0)
  }
  const renderContent = (page: FavoritesType) => {
    return page.items.map((item, index) => {
      const lastElement = index === page.items.length - 1

      const onPostClick = () => {
        openModal(MODALS.GetPostModal)
        setPostId(item.id)
      }

      return (
        <div
          className={cls.card}
          key={item.id}
          onClick={onPostClick}
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
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div className={cls.favoritesPage}>
      <div className={cls.title}> {t('favorites')} </div>
      <div className={cls.cardsList}>
        {(data as InfiniteData<FavoritesType>)?.pages.map(page => page && renderContent(page))}
      </div>

      {!!postId && !!post && !!userData && (
        <GetPostModal
          actionsSlot={<PostModalActions post={post} />}
          content={
            <Commentaries key={postId} post={post} postId={idsArray[currentIndex] || postId} />
          }
          firstElement={firstElement}
          handleClick={handleClick}
          handleClose={closeModal}
          id={MODALS.GetPostModal}
          isOpen={currentModal === MODALS.GetPostModal}
          key={postId}
          lastElement={lastElement}
          post={post}
          userName={response?.data.userName}
        />
      )}

      {isSuccess && isFetchingNextPage && (
        <div className={cls.loaderContainer}>
          <Loader />
        </div>
      )}
    </div>
  )
}
