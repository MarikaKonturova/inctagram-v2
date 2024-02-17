import { useGetPosts } from 'entities/Home'
import { Description, useGetMyPost } from 'entities/Post'
import {
  DeleteMyPostButton,
  DeletePostModal,
  EditPostModal,
  UpdateMyPostButton,
} from 'features/post'
import { type FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { MODALS, type Values } from 'shared/constants/post'
import { type ProfileDataModel } from 'shared/types/auth'
import { type PostResponse, type ResponseType } from 'shared/types/post'
import { Card, Loader, MoreOptions } from 'shared/ui'
import { Commentaries } from 'widgets/Commentaries'
import { GetPostModal, PostModalActions } from 'widgets/Post'

import cls from './PostCards.module.scss'

interface Props {
  userData: ProfileDataModel
}

export const PostCards: FC<Props> = ({ userData }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useGetPosts(
    userData.userName
  )
  const [currentModal, setCurrentModal] = useState<Values | null>(null)
  const [postId, setPostId] = useState<number | undefined>(undefined)
  const [isDelePostConfirmationModalOpen, setIsDelePostConfirmationModalOpen] = useState(false)
  const { inView, ref } = useInView()
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const [currentPost, setCurrentCurrentPost] = useState<number>(0)

  const { post } = useGetMyPost(currentPost)

  console.log('postId', postId)

  const ids = data && data.pages ? data.pages.flatMap(page => page.items.map(item => item.id)) : []

  console.log(ids)

  const findIndex = ids.findIndex(id => id === postId)

  console.log(findIndex)

  useEffect(() => {
    if (ids[currentIndex]) {
      setCurrentCurrentPost(ids[currentIndex] as number)
    } else {
      setCurrentCurrentPost(postId as number)
    }
  }, [postId, ids, currentIndex])

  useEffect(() => {
    setCurrentIndex(findIndex)
  }, [postId])

  console.log('currentIndex', currentIndex)

  console.log('current', ids[currentIndex])
  const handleClick = (direction: 'back' | 'next') => {
    if (direction === 'back' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (direction === 'next' && currentIndex < ids.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const renderContent = (page: ResponseType) =>
    page.items.map((item: PostResponse) => {
      const onPostCardClick = () => {
        openModal(MODALS.GetPostModal)
        setPostId(item.id)
      }

      return (
        <div className={cls.card} key={item.id} onClick={onPostCardClick}>
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

  const openModal = (id: Values) => {
    if (currentModal !== null) {
      closeModal()
    }
    setCurrentModal(id)
  }

  const closeModal = () => {
    setCurrentModal(null)
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
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <div>
      <div className={cls.cardsList}>{data?.pages.map(page => page && renderContent(page))}</div>

      {postId &&
        post && [
          <GetPostModal
            actionsSlot={<PostModalActions post={post} />}
            content={
              <div className={cls.content}>
                <Description post={post} />
                <Commentaries postId={postId} />
              </div>
            }
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
            post={post}
            userName={userData.userName}
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
      {isSuccess && (
        <div className={cls.loaderContainer} ref={ref}>
          {isFetchingNextPage && <Loader />}
        </div>
      )}
    </div>
  )
}
