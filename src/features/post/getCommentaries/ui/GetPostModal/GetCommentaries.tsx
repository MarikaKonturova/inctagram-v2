import React, { type FC } from 'react'
import { LikeCommentIconButton } from 'features/post'
import { type ProfileDataModel } from 'shared/types/auth'
import { Avatar } from 'shared/ui'
import { useGetPostComments } from '../../model'
import cls from './GetCommentaries.module.scss'

interface Props {
    postId: number
    userData: ProfileDataModel
}

export const GetCommentaries: FC<Props> = ({ postId, userData }) => {
    const { comments, isLoading } = useGetPostComments(postId)

    if (isLoading) {
        return <div className={cls.comments}/>
    }

    return (
        <div className={cls.comments}>
            {comments?.items.map(comment =>
                (<div className={cls.comment} key={comment.id}>
                    <div className={cls.avatarCommentGroup}>

                        <Avatar
                         src={comment.from.avatars?.thumbnail.url}
                         size={36}
                         alt="avatar"
                        />
                        <div>
                            <span className={cls.userName}>{userData.userName} </span>
                            <span className={cls.content}>{comment.content}</span>
                            <div>
                                <span className={cls.time}>{comment.createdAt} </span>
                                <span className={cls.actionButton}>Like: {comment.likeCount} </span>
                                {userData.id !== comment.from.id && <span className={cls.actionButton}>Answer</span>}
                            </div>
                        </div>
                    </div>

                    <LikeCommentIconButton />
                </div>)
            )
            }
        </div>
    )
}
