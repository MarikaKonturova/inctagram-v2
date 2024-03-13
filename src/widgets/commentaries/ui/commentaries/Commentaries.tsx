import { useGetPostComments } from 'entities/Comment'
import { Comment, LikeCommentIconButton } from 'features/post'
import React, { type FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { PostResponse } from 'shared/types/post'
import { Loader } from 'shared/ui'

import { AnswersForCommentaries } from '../answersForCommentaries/AnswersForCommentaries'
import cls from './Commentaries.module.scss'

interface Props {
  post?: PostResponse
  postId: number
}

export const Commentaries: FC<Props> = ({ post, postId }) => {
  const { inView, ref } = useInView()
  const { comments, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess } =
    useGetPostComments(postId)
  const [openedComments, setOpenedComments] = useState<{ [id: number]: boolean }>({})
  const [heightDescription, setHeightDescription] = useState<number>()
  const [heightAddComment, setHeightAddComment] = useState<number>()
  const [heightBottomSection, setHeightBottomSection] = useState<number>()
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

  useEffect(() => {
    const descriptionElement = document.getElementById('descriptionHeight')
    const addCommentElement = document.getElementById('addCommentHeight')
    const bottomSectionElement = document.getElementById('bottomSection')

    const descriptionHeight = descriptionElement?.offsetHeight || 0

    setHeightDescription(descriptionHeight)

    const addCommentHeight = addCommentElement?.offsetHeight || 0

    setHeightAddComment(addCommentHeight)

    const bottomSectionHeight = bottomSectionElement?.offsetHeight || 0

    setHeightBottomSection(bottomSectionHeight)
  }, [postId, post])

  if (isLoading) {
    return <div className={cls.comments} />
  }

  return (
    <div
      className={cls.comments}
      style={{
        maxHeight: `calc(85vh - (58px + ${heightDescription}px + ${heightBottomSection}px + ${heightAddComment}px))`,
      }}
    >
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
