import clsx from 'clsx'
import Image, { type ImageProps } from 'next/image'
import React, { useState } from 'react'
import { Skeleton } from '../Skeleton/Skeleton'

import cls from './Card.module.scss'

type PropsType = ImageProps & {
    cardWrapperClassName?: string
    skeletonWidth?: string | number
    skeletonHeight?: string | number
    fallbackSrc?: string
}

export const Card: React.FC<PropsType> = (props) => {
    const {
        src,
        alt,
        sizes = '100vw',
        skeletonWidth,
        skeletonHeight = 'inherit',
        cardWrapperClassName,
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
    console.log(isLoaded)

    return (
        <div className={clsx(cls.container, cardWrapperClassName)}>
            {isLoaded && <Skeleton width={skeletonWidth} height={skeletonHeight} />}
            <Image
                    alt={alt}
                    src={onErrorSrc || src}
                    className={cls.cardImg}
                    fill
                    sizes={sizes}
                    onError={handleOnError}
                    onLoadingComplete={onImageLoadingComplete}
            />
        </div>
    )
}
