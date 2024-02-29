import { useUploadImagePostStore } from 'features/post/createPost/model'
import { CropImage } from 'features/post/createPost/ui/components'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { SwiperApp } from 'shared/lib/swiper'
import { Button } from 'shared/ui'
import { SwiperSlide } from 'swiper/react'
import { shallow } from 'zustand/shallow'

import cls from './CropImageStep.module.scss'

interface IProps {
  onNextClick: () => void
  onPrevClick: () => void
}

export const CroppImageStep = ({ onNextClick, onPrevClick }: IProps) => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

  const { images, imagesIds, setReset } = useUploadImagePostStore(
    ({ images, imagesIds, setReset }) => ({ images, imagesIds, setReset }),
    shallow
  )

  const onIconClick = () => {
    setReset()
    onPrevClick()
  }

  return (
    <div className={cls.modal}>
      <header className={cls.header}>
        <IconArrowBack fill={fill} onClick={onIconClick} />
        <h2>Cropping</h2>
        <Button onClick={onNextClick}>Next</Button>
      </header>

      <SwiperApp>
        {imagesIds.map(imageId => {
          return (
            <SwiperSlide className={cls.swiper_slide} key={imageId}>
              <CropImage image={images[imageId]} imageId={imageId} />
            </SwiperSlide>
          )
        })}
      </SwiperApp>
    </div>
  )
}