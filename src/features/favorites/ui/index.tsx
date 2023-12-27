import { InfiniteData } from '@tanstack/react-query'
import React, { ReactNode, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { MODALS, type Values } from 'shared/constants/post'
import { type FavoritesType } from 'shared/types/post'
import { Card, Loader } from 'shared/ui'
import { PostModalActions } from 'widgets/Post/actions/PostModalActions/PostModalActions'

import { GetCommentaries } from '../../post'
import { useGetMyPost } from '../../profile/getPosts/model'
import { GetPostModal } from '../../profile/getPosts/ui/modals/GetPostModal'
import { useGetProfileData } from '../../profile/getProfileData/model'
import { useGetFavoritesData } from '../model'
import cls from './favorites.module.scss'

const Favorites = () => {
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
          actionsSlot={<PostModalActions post={post} />}
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

export default Favorites
