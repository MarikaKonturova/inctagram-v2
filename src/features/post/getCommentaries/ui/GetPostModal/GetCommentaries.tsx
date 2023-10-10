import React, { type FC, useState } from 'react'
import CommentInfo from 'entities/Post/ui/CommentInfo/CommentInfo'
import { type ProfileDataModel } from 'shared/types/auth'
import { useGetPostComments } from '../../model'
import GetAnswersForCommentaries from '../getAnswersForCommentaries/GetAnswersForCommentaries'
import cls from './GetCommentaries.module.scss'

interface Props {
    postId: number
    userData: ProfileDataModel
}

export const GetCommentaries: FC<Props> = ({ postId, userData }) => {
    const [openedCommentId, setOpenedCommentId] = useState<number>()
    const [isOpen, setIsOpen] = useState(false)
    const { comments, isLoading } = useGetPostComments(postId)

    if (isLoading) {
        return <div className={cls.comments}/>
    }

    const viewAnswerOnClick = (commentId: number) => {
        setOpenedCommentId(commentId)
        setIsOpen(!isOpen)
        if (isOpen) {
            setOpenedCommentId(0)
            setIsOpen(false)
        }
    }

    return (
        <div className={cls.comments}>
            {comments?.items.map(comment => (
                <div className={cls.comment} key={comment.id}>
                    <CommentInfo
                    viewAnswerOnClick={viewAnswerOnClick}
                    isOpen={isOpen}
                    openedCommentId={openedCommentId}
                    avatarSize={36}
                    postId={postId}
                    data={comment} />
                    <GetAnswersForCommentaries
                    postId={postId}
                    commentId={comment.id}
                    openedCommentId={openedCommentId as number} />
                </div>
            ))}

        </div>
    )
}
