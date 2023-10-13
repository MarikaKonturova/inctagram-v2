import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import Image, { type ImageProps } from 'next/image'
import React, { useState } from 'react'
import { CreationDate } from '../../../entities/Post/ui/CreationDate'
import { Header } from '../../../entities/Post/ui/Header'
import { LikesInfo } from '../../../entities/Post/ui/LikesInfo'
import { Description } from '../../../entities/Publication/ui/Description'
import {
    AddCommentBox,
    AddCommentIconButton,
    AddPostToFavoutitesIconButton,
    LikePostIconButton,
    SharePostIconButton
} from '../../../features/post'
import { type ResponseItem } from '../../types/home'
import { Skeleton } from '../Skeleton/Skeleton'

import cls from './Publication.module.scss'

type PropsType = ImageProps & {
    publ: ResponseItem
    cardWrapperClassName?: string
    skeletonWidth?: string | number
    skeletonHeight?: string | number
    fallbackSrc?: string
    createdAt: string
}

export const Publication: React.FC<PropsType> = (props) => {
    const {
        createdAt,
        publ,
        src,
        alt,
        // sizes = '100vw',
        skeletonWidth,
        skeletonHeight = 'inherit',
        // cardWrapperClassName,
        fallbackSrc
    } = props
    const [isLoaded, setIsLoaded] = useState(true)
    const [onErrorSrc, setOnErrorSrc] = useState<string | undefined>(undefined)

    const onImageLoadingComplete = () => {
        setIsLoaded(false)
    }

    const handleOnError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e?.currentTarget?.src !== fallbackSrc && setOnErrorSrc(fallbackSrc)
    }
    const creationDate = createdAt
        ? formatDistanceToNow(new Date(createdAt),
            { addSuffix: true, includeSeconds: true })
        : ''

    return (
        <div className={clsx(cls.container)}>
            {isLoaded && <Skeleton width={skeletonWidth} height={skeletonHeight}/>}
            <div className={cls.header}>
                <Header avatarURL={publ.avatars?.medium.url} title={publ.userName}/>
                <div style={{ margin: '8px' }}>•</div>
                <CreationDate date={creationDate} />
            </div>
            <Image
                alt={alt}
                src={onErrorSrc || src}
                className={cls.cardImg}
                width={491}
                height={504}
                // sizes={sizes}
                onError={handleOnError}
                onLoadingComplete={onImageLoadingComplete}
            />
            <div className={clsx(cls.actionContainer)}>
                <div className={clsx(cls.actionLeft_group)}>
                    <LikePostIconButton postIsLiked={publ.isLiked} postId={publ.id}/>
                    <AddCommentIconButton />
                    <SharePostIconButton />
                </div>
                <AddPostToFavoutitesIconButton postIsFavourite={publ.isFavorite} postId={publ.id} />
            </div>
            <Description avatarURL={publ.avatars?.medium.url} title={publ.userName} description = {publ.description}/>
            <div style={{ marginTop: '14px', marginBottom: '24px' }}>
                < LikesInfo newLikes={publ.newLikes} likeCount={publ.likeCount}/>
            </div>
            <div className={cls.allComments}>View All Comments ({publ.likeCount})</div>
            <AddCommentBox postId={publ.id} className={clsx(cls.containerAddComment)}/>
        </div>
    )
}
