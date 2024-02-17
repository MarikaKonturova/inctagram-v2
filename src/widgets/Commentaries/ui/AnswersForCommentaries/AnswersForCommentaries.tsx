import { useGetPostAnswersForComment } from 'entities/Comment'
import { Comment } from 'features/post'
import { LikeAnswerIconButton } from 'features/post/likeAnswer/ui/LikeAnswerIconButton/LikeAnswerIconButton'
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
                isRepliedComment
                key={answer.id}
              />
            ) : null
          )
        : null}
    </>
  )
}
