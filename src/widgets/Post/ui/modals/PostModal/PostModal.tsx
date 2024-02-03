import { format } from 'date-fns'
import { CreationDate, Header, LikesInfo, PostModal } from 'entities/Post'
import { AddCommentBox } from 'features/post'
import React, { ReactNode } from 'react'
import { type PostResponse } from 'shared/types/post'
import { Card } from 'shared/ui'

import cls from './PostModal.module.scss'

interface IProps {
  actionsSlot: ReactNode
  content: ReactNode
  handleClose: () => void
  headerActions?: ReactNode
  id: number
  isOpen: boolean
  post: PostResponse
  userName: string
}

export const GetPostModal: React.FC<IProps> = props => {
  const { actionsSlot, content, handleClose, headerActions, id, isOpen, post, userName } = props

  const creationDate = post?.createdAt ? format(new Date(post?.createdAt), 'MMMM d, Y') : ''

  return (
    <PostModal
      content={
        <>
          <Card
            alt={'card'}
            cardWrapperClassName={cls.cardWrapperClassName}
            src={post?.images[0]?.versions.huge.url || ''}
          />

          <div className={cls.rightBlock}>
            <div className={cls.header}>
              <Header avatarURL={post.avatars?.medium.url} title={userName} />
              <div>{headerActions}</div>
            </div>
            {content}
            <div className={cls.bottomSection}>
              {actionsSlot}
              <div className={cls.wrapper}>
                <LikesInfo likeCount={post.likeCount} newLikes={post.newLikes} />
                <CreationDate date={creationDate} />
              </div>
            </div>
            <AddCommentBox postId={post.id} />
          </div>
        </>
      }
      handleClose={handleClose}
      id={id}
      isOpen={isOpen}
    />
  )
}
