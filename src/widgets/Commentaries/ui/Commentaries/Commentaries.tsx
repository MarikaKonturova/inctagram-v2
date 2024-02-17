import { useGetPostComments } from 'entities/Comment'
import { Comment, LikeCommentIconButton } from 'features/post'
import React, { type FC, useState } from 'react'

import { AnswersForCommentaries } from '../AnswersForCommentaries/AnswersForCommentaries'
import cls from './Commentaries.module.scss'

interface Props {
  postId: number
}

export const Commentaries: FC<Props> = ({ postId }) => {
  const [openedComments, setOpenedComments] = useState<{ [id: number]: boolean }>({})
  const { comments, isLoading } = useGetPostComments(postId)

  const idsArray = Object.keys(openedComments).map(Number)

  const viewAnswerOnClick = (commentId: number) => {
    setOpenedComments(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }))
  }

  if (isLoading) {
    return <div className={cls.comments} />
  }

  return (
    <div className={cls.comments}>
      {comments?.items.map(comment => (
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
            commentId={comment.id}
            data={comment}
            openedComments={openedComments}
            viewAnswerOnClick={viewAnswerOnClick}
          />
          {idsArray?.map(id => (
            <AnswersForCommentaries
              commentId={comment.id}
              key={id}
              openedCommentId={id}
              openedComments={openedComments}
              postId={postId}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
