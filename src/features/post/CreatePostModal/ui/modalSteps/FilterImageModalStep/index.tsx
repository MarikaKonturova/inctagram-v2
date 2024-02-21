import clsx from 'clsx'
import { IImage, useUploadImagePostStore } from 'features/post/CreatePostModal/model'
import Image from 'next/image'
import { type FC, useState } from 'react'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { SwiperApp } from 'shared/lib/swiper'
import { Button } from 'shared/ui'
import { SwiperClass, SwiperSlide } from 'swiper/react'
import { shallow } from 'zustand/shallow'

import { Filters } from './components/filters'
import cls from './styles.module.scss'

interface IProps {
  onNextClick: () => void
  onPrevClick: () => void
}

export const FilterImageModalStep: FC<IProps> = ({ onNextClick, onPrevClick }) => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const [thumbsSwiper] = useState<SwiperClass>()
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass>()
  const [currentIndexSlide, setCurrentIndexSlide] = useState<number>(0)
  const { images, imagesIds } = useUploadImagePostStore(
    ({ images, imagesIds }) => ({ images, imagesIds }),
    shallow
  )
  const swiperOnSlideChangeHandler = (swiper: SwiperClass) => {
    setCurrentIndexSlide(swiper.activeIndex)
  }

  return (
    <div className={cls.modal}>
      <header className={cls.header}>
        <IconArrowBack fill={fill} onClick={onPrevClick} />
        <h2>Filter</h2>
        <Button onClick={onNextClick}>Next</Button>
      </header>
      <div className={cls.container}>
        <SwiperApp
          className={cls.flexItem}
          onSlideChangeTransitionStart={swiperOnSlideChangeHandler}
          onSwiper={setSwiperInstance}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        >
          {imagesIds.map(imageId => (
            <SwiperSlide key={imageId} style={{ display: 'flex' }}>
              <FilterImageOneModalStep image={images[imageId]} imageId={imageId} />
            </SwiperSlide>
          ))}
        </SwiperApp>

        {swiperInstance && (
          <Filters
            className={cls.flexItem}
            currentIndex={currentIndexSlide}
            image={images[imagesIds[currentIndexSlide]]}
            imageId={imagesIds[currentIndexSlide]}
            swiperElement={swiperInstance}
          />
        )}
      </div>
    </div>
  )
}

interface IFilterImageOneModalStep {
  image: IImage
  imageId: string
}
export const FilterImageOneModalStep: FC<IFilterImageOneModalStep> = ({ image, imageId }) => {
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
