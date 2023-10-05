import React, { useState } from 'react'
import CommentInfo from 'entities/Post/ui/CommentInfo/CommentInfo'
import { useGetPostAnswersForComments } from '../../model'

interface PropsType {
    commentId: number
    postId: number
    openedCommentId: number
}

const GetAnswersForCommentaries = ({ commentId, postId, openedCommentId }: PropsType) => {
    const [isOpen, setIsOpen] = useState(false)
    const { answerForComment } = useGetPostAnswersForComments(postId, openedCommentId)

    const viewAnswerOnClick = (commentId: number) => {
    // setOpenedCommentId(commentId)
        setIsOpen(!isOpen)
    // if (isOpen) {
    //     setOpenedCommentId(0)
    //     setIsOpen(false)
    // }
    }

    return (
        <>
            {answerForComment?.items.map((answer) =>
                answer.commentId === commentId
                    ? (
                        <CommentInfo
            key={answer.id}
            viewAnswerOnClick={viewAnswerOnClick}
            avatarSize={26}
            data={answer}
            postId={postId}
            isOpen={isOpen}
            openedCommentId={openedCommentId}
            isRepliedComment
                        />
                    )
                    : null
            )}
        </>
    )
}

export default GetAnswersForCommentaries
