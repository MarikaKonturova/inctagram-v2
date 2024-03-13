import { useGetPostComments } from 'entities/Comment'
import { useAuth } from 'features/auth'
import { Comment, LikeCommentIconButton } from 'features/post'
import React, { type FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Loader } from 'shared/ui'

import { AnswersForCommentaries } from '../answersForCommentaries/AnswersForCommentaries'
import cls from './Commentaries.module.scss'

interface Props {
  postId: number
}

export const Commentaries: FC<Props> = ({ postId }) => {
  const { inView, ref } = useInView()
  const { isAuth } = useAuth()
  const { comments, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess } =
    useGetPostComments(postId)
  const [openedComments, setOpenedComments] = useState<{ [id: number]: boolean }>({})

  const idsArray = Object.keys(openedComments).map(Number)

  const viewAnswerOnClick = (commentId: number) => {
    setOpenedComments(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }))
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
            commentId={comment.id}
            data={comment}
            isAuth={isAuth}
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
      {isSuccess && (
        <div className={cls.loaderContainer} ref={ref}>
          {isFetchingNextPage && <Loader />}
        </div>
      )}
    </div>
  )
}
