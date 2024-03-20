import clsx from 'clsx'
import { CreationDate, Header, LikesInfo } from 'entities/Post'
import { Description } from 'entities/Publication'
import { AddCommentBox, CopyToClipboard, SubscribeOrUnsubscribeButton } from 'features/post'
import Image, { type ImageProps } from 'next/image'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import userPhoto from 'shared/assets/images/user.png'
import { PostResponse } from 'shared/types/post'
import { MoreOptions, Skeleton } from 'shared/ui'
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
    <div className={clsx(cls.container)} id={publ.id.toString()}>
      {isLoaded && <Skeleton />}
      <div className={cls.header}>
        <div className={cls.headerBox}>
          <Header avatarURL={publ.avatars?.medium.url || userPhoto.src} title={publ.userName} />
          <span className={cls.bullet}>•</span>
          <CreationDate date={createdAt} type={'agoTime'} />
        </div>
        <MoreOptions
          content={
            <>
              <SubscribeOrUnsubscribeButton
                isFollowed={publ.isFollowedBy}
                userId={publ.ownerId}
                userName={publ.userName}
              />
              <CopyToClipboard publ={publ} />
            </>
          }
        />
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
      {publ.description?.length && (
        <Description avatar={publ.avatars} description={publ.description} title={publ.userName} />
      )}
      <div className={cls.likesInfo}>
        <LikesInfo likeCount={publ.likeCount} newLikes={publ.newLikes} />
      </div>
      {openComments && <Commentaries postId={publ.id} />}
      <div className={cls.allComments} onClick={() => commentsHandler()}>
        {openComments ? t('hideAllComments') : t('viewAllComments')} ({publ.commentCount})
      </div>
      <AddCommentBox className={clsx(cls.containerAddComment)} postId={publ.id} />
    </div>
  )
}
