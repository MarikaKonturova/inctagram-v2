import { useUploadImagePostStore } from 'features/post/createPost/model'
import { FilterImage, Filters } from 'features/post/createPost/ui/components'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { SwiperApp } from 'shared/lib/swiper'
import { Button } from 'shared/ui'
import { SwiperClass, SwiperSlide } from 'swiper/react'
import { shallow } from 'zustand/shallow'

import cls from './FilterImageStep.module.scss'

interface IProps {
  onNextClick: () => void
  onPrevClick: () => void
}

export const FilterImageStep = ({ onNextClick, onPrevClick }: IProps) => {
  const { theme } = useTheme()
  const { t } = useTranslation(['profile'])
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
        <h2>{t('filter')}</h2>
        <Button onClick={onNextClick} theme={'textButton'}>
          {t('next')}
        </Button>
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
              <FilterImage image={images[imageId]} imageId={imageId} />
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
