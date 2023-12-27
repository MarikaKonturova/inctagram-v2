import { format } from 'date-fns'
import { CreationDate } from 'entities/Post/ui/CreationDate'
import { Header } from 'entities/Post/ui/Header'
import { LikesInfo } from 'entities/Post/ui/LikesInfo'
import { PostModal } from 'entities/Post/ui/Modal'
import { AddCommentBox } from 'features/post'
import React from 'react'
import { type PostResponse } from 'shared/types/post'
import { Card } from 'shared/ui/Card/Card'

import cls from './styles.module.scss'

interface IProps {
  actionsSlot: React.ReactNode
  content: React.ReactNode
  handleClose: () => void
  headerActions?: React.ReactNode
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
