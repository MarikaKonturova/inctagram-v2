import {CreationDate} from 'entities/Post/ui/CreationDate';
import React, {useEffect, useRef, useState} from 'react';
import userPhoto from 'shared/assets/images/user.png'
import {AvatarSizes, PostResponse} from 'shared/types/post';
import {Avatar, Button, Card, Title} from 'shared/ui';

import cls from './PublicPost.module.scss';

interface PublicPostProps {
  openModal: (post: PostResponse) => void
  post: PostResponse
}

export const PublicPost = ({ openModal, post }: PublicPostProps) => {

  const [hidden, setHidden] = useState(true)
  const [height, setHeight] = useState(0);
  const [photoHeight, setPhotoHeight] = useState(240);

  const descrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (descrRef?.current?.clientHeight) {
      setHeight(descrRef.current.clientHeight);
    }
  }, []);

  const showMoreText = () => {
    setHidden(false)

    const phHeight = (240 - height + 72) > 0 ? (240 - height + 72) : 0

    setPhotoHeight(phHeight)
  }

  const hideText = () => {
    setHidden(true)
    setPhotoHeight(240)
  }

  const handleOpenModal = () => {
    openModal(post)
    hideText()
  }

  return (
    <div className={cls.post}>
      <div className={cls.imgWrapper} onClick={handleOpenModal} style={{'height': photoHeight}}>
        <Card alt={'photo'} className={cls.img} src={post.images[0].versions.huge.url} />
      </div>

      <div>
        <div className={cls.user}>
          <Avatar size={AvatarSizes.medium} src={post.avatars?.thumbnail?.url || userPhoto.src}/>
          <Title as={'h3'} className={cls.userName}>{post.userName}</Title>
        </div>

        <CreationDate className={cls.createdAt} date={post.createdAt} type={'agoTime'}/>

        <div className={cls.description} ref={descrRef}>{post.description}</div>

      </div>

      {(height > 24) && hidden && (
        <div className={cls.buttonWrapper}>...
          <Button className={cls.button} onClick={showMoreText} theme={'clear'} >Show more</Button>
        </div>
      )}

      {!hidden && (
        <div className={cls.buttonWrapper}>...
          <Button className={cls.button} onClick={hideText} theme={'clear'} >Hide</Button>
        </div>
      )}
    </div>
  )
}

