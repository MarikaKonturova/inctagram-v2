import clsx from 'clsx'
import React from 'react'
import { LikeCommentIconButton } from 'features/post'
import { useCommentStore } from 'features/profile/getPosts/model'
import { type AnswerType } from 'shared/types/comment'
import { type Comment } from 'shared/types/post'
import { Avatar } from 'shared/ui'
import { formattedDate } from 'shared/utils'
import cls from './CommentInfo.module.scss'

interface PropsType {
    viewAnswerOnClick?: (id: number) => void
    data: Omit<AnswerType | Comment, 'commentId' | 'answerCount' | 'postId'> & {
        postId?: number
        answerCount?: number
        commentId?: number
    }
    postId: number
    avatarSize: number
    isOpen: boolean
    openedCommentId?: number
    isRepliedComment?: boolean
}

function CommentInfo ({
    viewAnswerOnClick,
    isOpen,
    data,
    postId,
    openedCommentId,
    avatarSize,
    isRepliedComment = false
}: PropsType) {
    const {
        id,
        isLiked,
        commentId,
        content,
        createdAt,
        from: { id: fromId, userName, avatars: { thumbnail: { url } } },
        likeCount,
        answerCount
    } = data
    const { setRepliedComment } = useCommentStore()

    const onAnswerHandler = () => {
        setRepliedComment({ id: isRepliedComment && commentId ? commentId : id, userName })
    }

    return (
        <div className={clsx(cls.avatarCommentGroup, { [cls.additionalStyle]: isRepliedComment })}>
            <Avatar src={url} size={avatarSize} alt="avatar" />
            <div className={cls.commentInfo}>
                <span className={cls.userName}>{userName} </span>
                <span className={cls.content}>{content}</span>
                <div className={cls.bottomInfo}>
                    <p className={cls.time}>{formattedDate(createdAt)} </p>
                    <p className={cls.actionButton}>Like: {likeCount} </p>
                    <button type="button"
                            className={cls.button}
                            onClick={onAnswerHandler}>Answer</button>
                </div>
                {!!answerCount && (
                    <button type="button"
                            onClick={() => { void viewAnswerOnClick?.(id) }}
                            className={cls.button}>
                        <div className={cls.line} />
                        <span>
                            {isOpen && (openedCommentId === id || openedCommentId === commentId)
                                ? 'Hide answers'
                                : `View answers (${answerCount})`}
                        </span>
                    </button>
                )}
            </div>
            <LikeCommentIconButton commentId={commentId || id} postId={postId} isLiked={isLiked}/>
        </div>
    )
}

export default CommentInfo
