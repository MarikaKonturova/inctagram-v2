import { InfiniteData } from '@tanstack/react-query'
import { useGetFavoritesData } from 'entities/Favorites'
import { useGetMyPost } from 'entities/Post'
import { useGetProfileData } from 'entities/Profile'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { MODALS, type Values } from 'shared/constants/post'
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll'
import { type FavoritesType } from 'shared/types/post'
import { Card, Loader } from 'shared/ui'
import { Commentaries } from 'widgets/commentaries'
import { GetPostModal, PostModalActions } from 'widgets/post'

import cls from './Favorites.module.scss'

export const FavoritesPage = () => {
  const [currentModal, setCurrentModal] = useState<Values | null>(null)
  const [postId, setPostId] = useState<number>(0)

  const router = useRouter()
  const { t } = useTranslation('common')
  const { response } = useGetProfileData()
  const userData = response?.data
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useGetFavoritesData(
    userData?.userName || ''
  )
  const { currentIndex, currentPost, firstElement, idsArray, lastElement, ref, setCurrentIndex } =
    useInfiniteScroll({
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

  const openModal = (id: Values) => {
    if (currentModal !== null) {
      closeModal()
    }
    setCurrentModal(id)
  }

  const closeModal = () => {
    setCurrentModal(null)
    setCurrentIndex(0)
    if (router.query.postId) {
      delete router.query.postId
      router.push(router, undefined, { shallow: true })
    }
  }

  const renderContent = (page: FavoritesType) => {
    return page.items.map((item, index) => {
      const lastElement = index === page.items.length - 1

      const onPostClick = () => {
        openModal(MODALS.GetPostModal)
        router.query.postId = String(item.id)
        router.push(router)
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
    if (router.query.postId) {
      setPostId(Number(router.query.postId))
      openModal(MODALS.GetPostModal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
