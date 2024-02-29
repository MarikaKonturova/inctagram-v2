import clsx from 'clsx'
import { CreationDate, Header, LikesInfo } from 'entities/Post'
import { Description } from 'entities/Publication'
import { AddCommentBox } from 'features/post'
import Image, { type ImageProps } from 'next/image'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import userPhoto from 'shared/assets/images/user.png'
import { PostResponse } from 'shared/types/post'
import { Skeleton } from 'shared/ui'
import { Commentaries } from 'widgets/commentaries'
import { PostActions } from 'widgets/post'

import cls from './Publication.module.scss'

type PropsType = ImageProps & {
  cardWrapperClassName?: string
  createdAt: string
  fallbackSrc?: string
  publ: PostResponse
}

export const Publication: React.FC<PropsType> = props => {
  const { alt, createdAt, fallbackSrc, publ, src } = props
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

  return (
    <div className={clsx(cls.container)}>
      {isLoaded && <Skeleton />}
      <div className={cls.header}>
        <Header avatarURL={publ.avatars?.medium.url || userPhoto.src} title={publ.userName} />
        <div className={cls.bullet}>•</div>
        <CreationDate date={createdAt} type={'agoTime'} />
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
      <Description description={publ.description} title={publ.userName} />
      {openComments && <Commentaries postId={publ.id} />}
      <div className={cls.allComments} onClick={() => commentsHandler()}>
        {t('viewAllComments')} ({publ.commentCount})
      </div>
      <AddCommentBox className={clsx(cls.containerAddComment)} postId={publ.id} />
    </div>
  )
}
