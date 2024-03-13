import { useGetPostAnswersForComment } from 'entities/Comment'
import { useAuth } from 'features/auth'
import { Comment, LikeAnswerIconButton } from 'features/post'
import React from 'react'

interface PropsType {
  commentId: number
  openedCommentId: number
  openedComments: {
    [id: number]: boolean
  }
  postId: number
}

export const AnswersForCommentaries = ({
  commentId,
  openedCommentId,
  openedComments,
  postId,
}: PropsType) => {
  const { answerForComment } = useGetPostAnswersForComment(postId, openedCommentId)
  const { isAuth } = useAuth()

  return (
    <>
      {openedComments[commentId] !== undefined && openedComments[commentId]
        ? answerForComment?.items.map(answer =>
            answer.commentId === commentId ? (
              <Comment
                actionSlot={
                  <LikeAnswerIconButton
                    answerId={answer.id}
                    commentId={answer.commentId}
                    isLiked={answer.isLiked}
                    postId={postId}
                  />
                }
                avatarSize={36}
                commentId={openedCommentId}
                data={answer}
                isAuth={isAuth}
                isRepliedComment
                key={answer.id}
              />
            ) : null
          )
        : null}
    </>
  )
}
