/* eslint-disable max-len */
import React, { type FC } from 'react'
import { LikeCommentIconButton } from 'features/post'
import catImg from 'shared/assets/images/MicrosoftTeams-image.png'
import { Avatar } from 'shared/ui'
import cls from './GetCommentaries.module.scss'

const data = [
    { id: 1, userName: 'URLProfiele', avatar: catImg.src, content: 'Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '2 Hours ago', likesCount: 1, isMyComment: true },
    { id: 2, userName: 'URLProfiele', avatar: catImg.src, content: 'Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '2 Hours ago', likesCount: 15, isMyComment: false },
    { id: 3, userName: 'URLProfiele', avatar: catImg.src, content: 'Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '2 Hours ago', likesCount: 9999, isMyComment: false },
    { id: 4, userName: 'URLProfiele', avatar: catImg.src, content: 'Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '2 Hours ago', likesCount: 9999, isMyComment: false }
]

export const GetCommentaries: FC = () => (
    <div className={cls.comments}>
        {data.map(comment => (
            <div className={cls.comment} key={comment.id}>
                <Avatar src={comment.avatar} size={36} alt="avatar" />
                <div>
                    <span className={cls.userName}>{comment.userName} </span>
                    <span className={cls.content}>{comment.content}</span>
                    <div>
                        <span className={cls.time}>{comment.date} </span>
                        <span className={cls.actionButton}>Like: {comment.likesCount} </span>
                        {!comment.isMyComment && <span className={cls.actionButton}>Answer</span>}
                    </div>
                </div>
                <LikeCommentIconButton />
            </div>
        ))}
    </div>
)
