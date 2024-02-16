import { useGetPostComments } from 'entities/Comment'
import { Comment, LikeCommentIconButton } from 'features/post'
import React, { type FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Loader } from 'shared/ui'

import { AnswersForCommentaries } from '../AnswersForCommentaries/AnswersForCommentaries'
import cls from './Commentaries.module.scss'

interface Props {
  postId: number
}

export const Commentaries: FC<Props> = ({ postId }) => {
  const { inView, ref } = useInView()
  const { comments, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess } =
    useGetPostComments(postId)
  const [openedCommentId, setOpenedCommentId] = useState<number>()
  const [isOpen, setIsOpen] = useState(false)

  const viewAnswerOnClick = (commentId: number) => {
    setOpenedCommentId(commentId)
    setIsOpen(!isOpen)
    if (isOpen) {
      setOpenedCommentId(0)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage])

  if (isLoading) {
    return <div className={cls.comments} />
  }

  return (
    <div className={cls.comments}>
      {comments?.map(comment => (
        <div className={cls.comment} key={comment.id}>
          <Comment
            actionSlot={
              <LikeCommentIconButton
                commentId={comment.id}
                isLiked={comment.isLiked}
                postId={comment.postId}
              />
            }
            avatarSize={36}
            data={comment}
            isOpen={isOpen}
            openedCommentId={openedCommentId}
            viewAnswerOnClick={viewAnswerOnClick}
          />
          <AnswersForCommentaries
            commentId={comment.id}
            openedCommentId={openedCommentId as number}
            postId={postId}
          />
        </div>
      ))}
      {isSuccess && (
        <div className={cls.loaderContainer} ref={ref}>
          {isFetchingNextPage && <Loader />}
        </div>
      )}
    </div>
  )
}
