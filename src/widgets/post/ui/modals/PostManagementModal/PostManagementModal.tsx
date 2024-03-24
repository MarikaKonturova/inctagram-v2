import {
  CopyToClipboard,
  DeleteMyPostButton,
  DeletePostModal,
  EditPostModal,
  UpdateMyPostButton,
} from 'features/post'
import { FollowAndUnfollowMenuItemButton } from 'features/profile'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { MODALS, Values } from 'shared/constants/post'
import { PostResponse } from 'shared/types/post'
import { MoreOptions } from 'shared/ui'
import { GetPostModal, PostModalActions } from 'widgets/post'

type PropsType = {
  closeDeletePostModal: () => void
  closeModal: () => void
  content: ReactNode
  currentModal: Values | null
  firstElement?: boolean
  handleClick?: (direction: 'back' | 'next') => void
  isDelePostConfirmationModalOpen: boolean
  isFollowing?: boolean
  isMyProfile: boolean
  isPublic?: boolean
  lastElement?: boolean
  openDeletePostModal: () => void
  openEditPostModal: () => void
  post: PostResponse
  postId?: number
  setIsDelePostConfirmationModalOpen: Dispatch<SetStateAction<boolean>>
  userData: {
    id: number
    isFollowing: boolean
    userName: string
  }
}

export const PostManagementModal = ({
  closeDeletePostModal,
  closeModal,
  content,
  currentModal,
  firstElement,
  handleClick,
  isDelePostConfirmationModalOpen,
  isFollowing,
  isMyProfile,
  isPublic,
  lastElement,
  openDeletePostModal,
  openEditPostModal,
  post,
  postId,
  setIsDelePostConfirmationModalOpen,
  userData,
}: PropsType) => {
  const headerOptions = (
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
              isFollowing={isFollowing || userData.isFollowing}
              userId={userData.id}
              userName={userData.userName}
            />
            <CopyToClipboard publ={post} />
          </>
        )
      }
    />
  )

  return (
    <>
      <GetPostModal
        actionsSlot={<PostModalActions post={post} />}
        content={content}
        firstElement={firstElement}
        handleClick={handleClick}
        handleClose={closeModal}
        headerActions={headerOptions}
        id={MODALS.GetPostModal}
        isOpen={currentModal === MODALS.GetPostModal}
        isPublic={isPublic}
        key={'GetPostModal'}
        lastElement={lastElement}
        post={post}
      />
      {currentModal === MODALS.EditPostModal && (
        <EditPostModal
          handleClose={closeModal}
          id={MODALS.EditPostModal}
          isOpen={currentModal === MODALS.EditPostModal}
          key={'EditPostModal'}
          postId={postId || post.id}
        />
      )}
      <DeletePostModal
        handleClose={closeDeletePostModal}
        isOpen={isDelePostConfirmationModalOpen}
        key={'DeletePostModal'}
        postId={postId || post.id}
        setIsOpen={setIsDelePostConfirmationModalOpen}
      />
    </>
  )
}
