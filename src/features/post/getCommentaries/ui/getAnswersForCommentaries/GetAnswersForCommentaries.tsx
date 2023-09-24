import React from 'react'
import { Avatar } from '../../../../../shared/ui'
import { formattedDate } from '../../../../../shared/utils'
import { AddAnswerForCommentBox } from '../../../addAnswearForComment/ui/AddAnswerForCommentBox/AddAnswerForCommentBox'
import { LikeAnswerIconButton } from '../../../likeAnswer/ui/LikeAnswerIconButton/LikeAnswerIconButton'
import { useGetPostAnswersForComments } from '../../model'
import cls from './GetAnswersForCommentaries.module.scss'

interface AnswersType {
    commentId: number
    postId: number
    openedCommentId: number
}

const GetAnswersForCommentaries = ({ commentId, postId, openedCommentId }: AnswersType) => {
    const { answerForComment } = useGetPostAnswersForComments(postId, openedCommentId)

    return (
        <>
            {answerForComment?.items.map(answer => (
                answer.commentId === commentId
                    ? <div className={cls.answerContent} key={answer.id}>
                        <div>
                            <Avatar src={answer.from.avatars.thumbnail.url} size={26} alt={'avatar'}/>
                            <span className={cls.userName}>{answer.from.userName} </span>
                            <span className={cls.answer}>{answer.content}</span>
                            <div className={cls.time}>
                                {formattedDate(answer.createdAt)}
                                <span className={cls.actionButton}>Like: {answer.likeCount} </span>
                            </div>
                        </div>
                        <LikeAnswerIconButton
                            postId={postId}
                            commentId={commentId}
                            answerId={answer.id}
                            isLiked={answer.isLiked}
                        />
                    </div>
                    : null
            ))}
            {openedCommentId === commentId ? (<AddAnswerForCommentBox postId={postId} commentId={commentId}/>) : null}
        </>
    )
}

export default GetAnswersForCommentaries
