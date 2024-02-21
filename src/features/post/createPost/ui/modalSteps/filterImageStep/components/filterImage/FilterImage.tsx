import clsx from 'clsx'
import { IImage } from 'features/post/createPost/model'
import Image from 'next/image'
import { FC } from 'react'

import cls from './FilterImage.module.scss'
export const FilterImage: FC<{
  image: IImage
  imageId: string
}> = ({ image, imageId }) => {
  return (
    <div className={cls.imageWrapper}>
      <Image
        alt={'filterImage'}
        className={clsx(image.filter, cls.image)}
        height={503}
        id={imageId}
        src={image.croppedSrc}
        style={{
          objectFit: 'contain',
        }}
        width={490}
      />
    </div>
  )
}
