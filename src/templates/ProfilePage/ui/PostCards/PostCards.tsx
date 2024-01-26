import clsx from 'clsx'
import { useGetPosts } from 'entities/Home'
import { MyPostDropdown } from 'entities/MyPostDropdown/MyPostDropdown'
import { useGetMyPost } from 'entities/Post'
import {
  AddPostToFavoutitesIconButton,
  DeleteMyPostButton,
  GetCommentaries,
  LikePostIconButton,
  SharePostIconButton,
  UpdateMyPostButton,
} from 'features/post'
import { DeletePostModal, EditPostModal } from 'features/profile'
import { type FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { MODALS, type Values } from 'shared/constants/post'
import { type ProfileDataModel } from 'shared/types/auth'
import { type PostResponse, type ResponseType } from 'shared/types/post'
import { Card, Loader } from 'shared/ui'
import { GetPostModal } from 'widgets/GetPostModal'

import cls from './PostCards.module.scss'

interface Props {
  userData: ProfileDataModel
}

export const PostCards: FC<Props> = ({ userData }) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess } =
    useGetPosts(userData.userName)
  const [currentModal, setCurrentModal] = useState<Values | null>(null)
  const [postId, setPostId] = useState<number | undefined>(undefined)

  const { post } = useGetMyPost(postId || 0)

  const { inView, ref } = useInView()

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
    openModal(MODALS.DeletePostModal)
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
            actionsSlot={
              <div className={clsx(cls.container)}>
                <div className={clsx(cls.left_group)}>
                  <LikePostIconButton postId={post.id} postIsLiked={post.isLiked} />
                  <SharePostIconButton />
                </div>
                <AddPostToFavoutitesIconButton postId={post.id} postIsFavourite={post.isFavorite} />
              </div>
            }
            content={<GetCommentaries postId={postId} userData={userData} />}
            handleClose={closeModal}
            headerActions={
              <MyPostDropdown
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
            handleClose={closeModal}
            id={MODALS.DeletePostModal}
            isOpen={currentModal === MODALS.DeletePostModal}
            key={'DeletePostModal'}
            openEditPostModal={openEditPostModal}
            postId={postId}
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
