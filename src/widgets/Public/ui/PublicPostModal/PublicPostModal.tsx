import { CreationDate } from 'entities/Post/ui/CreationDate'
import { Header } from 'entities/Post/ui/Header'
import { LikesInfo } from 'entities/Post/ui/LikesInfo'
import { PostModal } from 'entities/Post/ui/Modal'
import { GetCommentaries } from 'features/post'
import moment from 'moment/moment'
import { ResponseItem } from 'shared/types/home'
import { Card } from 'shared/ui'

import cls from './PublicPostModal.module.scss'

interface PublicPostModalProps {
  handleClose: () => void
  isOpen: boolean
  post: ResponseItem
}

export const PublicPostModal = ({ handleClose, isOpen, post }: PublicPostModalProps) => {
  const creationDate = moment(post.createdAt).format('LL')

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
              <Header avatarURL={post.avatars?.medium.url} title={post.userName} />
            </div>
            <GetCommentaries postId={post.id} />
            <div className={cls.bottomSection}>
              <div className={cls.wrapper}>
                <LikesInfo likeCount={post.likeCount} newLikes={post.newLikes} />
                <CreationDate className={cls.creationDate} date={creationDate} />
              </div>
            </div>
          </div>
        </>
      }
      handleClose={handleClose}
      id={post.id}
      isOpen={isOpen}
    />
  )
}
