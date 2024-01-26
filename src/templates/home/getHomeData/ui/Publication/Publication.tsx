import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { CreationDate } from 'entities/Post/ui/CreationDate'
import { Header } from 'entities/Post/ui/Header'
import { LikesInfo } from 'entities/Post/ui/LikesInfo'
import { Description } from 'entities/Publication/ui/Description'
import {
  AddCommentBox,
  AddCommentIconButton,
  AddPostToFavoutitesIconButton,
  LikePostIconButton,
  SharePostIconButton,
} from 'features/post'
import Image, { type ImageProps } from 'next/image'
import React, { useState } from 'react'
import { type ResponseItem } from 'shared/types/home'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

import cls from './Publication.module.scss'

type PropsType = ImageProps & {
  cardWrapperClassName?: string
  createdAt: string
  fallbackSrc?: string
  publ: ResponseItem
  skeletonHeight?: number | string
  skeletonWidth?: number | string
}

export const Publication: React.FC<PropsType> = props => {
  const {
    alt,
    createdAt,
    fallbackSrc,
    publ,
    skeletonHeight = 'inherit',
    skeletonWidth,
    src,
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
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true, includeSeconds: true })
    : ''

  return (
    <div className={clsx(cls.container)}>
      {isLoaded && <Skeleton height={skeletonHeight} width={skeletonWidth} />}
      <div className={cls.header}>
        <Header avatarURL={publ.avatars?.medium.url} title={publ.userName} />
        <div style={{ margin: '8px' }}>•</div>
        <CreationDate date={creationDate} />
      </div>
      <Image
        alt={alt}
        className={cls.cardImg}
        height={504}
        onError={handleOnError}
        onLoadingComplete={onImageLoadingComplete}
        src={onErrorSrc || src}
        width={491}
      />
      <div className={clsx(cls.actionContainer)}>
        <div className={clsx(cls.actionLeft_group)}>
          <LikePostIconButton postId={publ.id} postIsLiked={publ.isLiked} />
          <AddCommentIconButton />
          <SharePostIconButton />
        </div>
        <AddPostToFavoutitesIconButton postId={publ.id} postIsFavourite={publ.isFavorite} />
      </div>
      <Description
        avatarURL={publ.avatars?.medium.url}
        description={publ.description}
        title={publ.userName}
      />
      <div className={cls.likesInfo}>
        <LikesInfo likeCount={publ.likeCount} newLikes={publ.newLikes} />
      </div>
      <div className={cls.allComments}>View All Comments ({publ.likeCount})</div>
      <AddCommentBox className={clsx(cls.containerAddComment)} postId={publ.id} />
    </div>
  )
}
