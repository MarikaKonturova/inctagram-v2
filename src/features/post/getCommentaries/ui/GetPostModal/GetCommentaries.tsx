/* eslint-disable max-len */
import React, { type FC, useState } from 'react'
import { LikeCommentIconButton } from 'features/post'
import { type ProfileDataModel } from 'shared/types/auth'
import { Avatar } from 'shared/ui'
import { formattedDate } from 'shared/utils'
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

    const viewAnswerOnClick = async (commentId: number) => {
        setOpenedCommentId(commentId)
        setIsOpen(true)
        if (isOpen) {
            setOpenedCommentId(0)
            setIsOpen(false)
        }
    }

    return (
        <div className={cls.comments}>
            {comments?.items.map(comment =>
                (<div className={cls.comment} key={comment.id}>
                    <div className={cls.avatarCommentGroup}>
                        <Avatar src={comment.from.avatars.thumbnail.url} size={36} alt="avatar" />
                        <div>
                            <span className={cls.userName}>{userData.userName} </span>
                            <span className={cls.content}>{comment.content}</span>
                            <div>
                                <span className={cls.time}>{formattedDate(comment.createdAt)} </span>
                                <span className={cls.actionButton}>Like: {comment.likeCount} </span>
                                {comment.answerCount < 1
                                    ? <span className={cls.showAnswerButton} onClick={ () => { void viewAnswerOnClick(comment.id) }}>Answer</span>
                                    : <span className={cls.showAnswerButton} onClick={() => { void viewAnswerOnClick(comment.id) }}>{isOpen && openedCommentId === comment.id ? 'Hide answers' : 'View answers'}</span>}
                                <GetAnswersForCommentaries postId={postId} commentId={comment.id} openedCommentId={openedCommentId as number}/>
                            </div>
                        </div>
                    </div>
                    <LikeCommentIconButton commentId={comment.id} postId={postId} isLiked={comment.isLiked}/>
                </div>)
            )
            }
        </div>
    )
}
