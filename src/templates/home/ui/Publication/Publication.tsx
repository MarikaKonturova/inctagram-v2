import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { CreationDate, Header, LikesInfo } from 'entities/Post'
import { Description } from 'entities/Publication'
import { AddCommentBox } from 'features/post'
import Image, { type ImageProps } from 'next/image'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { PostResponse } from 'shared/types/post'
import { Skeleton } from 'shared/ui'
import { PostActions } from 'widgets/Post'

import { Commentaries } from '../../../../widgets/Commentaries'
import cls from './Publication.module.scss'

type PropsType = ImageProps & {
  cardWrapperClassName?: string
  createdAt: string
  fallbackSrc?: string
  publ: PostResponse
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
  const [openComments, setOpenComments] = useState(false)

  const { t } = useTranslation('profile')
  const onImageLoadingComplete = () => {
    setIsLoaded(false)
  }

  const handleOnError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e?.currentTarget?.src !== fallbackSrc && setOnErrorSrc(fallbackSrc)
  }

  const commentsHandler = () => {
    setOpenComments(!openComments)
  }
  const creationDate = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true, includeSeconds: true })
    : ''

  return (
    <div className={clsx(cls.container)}>
      {isLoaded && <Skeleton height={skeletonHeight} width={skeletonWidth} />}
      <div className={cls.header}>
        <Header avatarURL={publ.avatars?.medium.url} title={publ.userName} />
        <div className={cls.bullet}>•</div>
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
      <PostActions post={publ} />
      <div className={cls.likesInfo}>
        <LikesInfo likeCount={publ.likeCount} newLikes={publ.newLikes} />
      </div>
      <Description
        avatarURL={publ.avatars?.medium.url}
        description={publ.description}
        title={publ.userName}
      />
      {openComments && <Commentaries postId={publ.id} />}
      <div className={cls.allComments} onClick={() => commentsHandler()}>
        View All Comments ({publ.likeCount})
      </div>
      <AddCommentBox className={clsx(cls.containerAddComment)} postId={publ.id} />
    </div>
  )
}
