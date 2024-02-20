import clsx from 'clsx'
import Image, { type ImageProps } from 'next/image'
import React, { useState } from 'react'

import { Skeleton } from '../Skeleton/Skeleton'
import cls from './Card.module.scss'

type PropsType = ImageProps & {
  cardWrapperClassName?: string
  fallbackSrc?: string
}

export const Card: React.FC<PropsType> = props => {
  const { alt, cardWrapperClassName, fallbackSrc, sizes = '100vw', src } = props
  const [isLoaded, setIsLoaded] = useState(true)
  const [onErrorSrc, setOnErrorSrc] = useState<string | undefined>(undefined)

  const onImageLoadingComplete = () => {
    setIsLoaded(false)
  }

  const handleOnError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e?.currentTarget?.src !== fallbackSrc && setOnErrorSrc(fallbackSrc)
  }

  return (
    <div className={clsx(cls.container, cardWrapperClassName)}>
      {isLoaded && <Skeleton />}
      <Image
        alt={alt}
        className={cls.cardImg}
        fill
        onError={handleOnError}
        onLoadingComplete={onImageLoadingComplete}
        sizes={sizes}
        src={onErrorSrc || src}
      />
    </div>
  )
}
