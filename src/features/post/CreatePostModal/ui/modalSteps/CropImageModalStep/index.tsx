import {
  ElementRef,
  type FC,
  ForwardRefExoticComponent,
  MutableRefObject,
  RefObject,
  forwardRef,
  useRef,
  useState,
} from 'react'
import {
  Cropper,
  CropperRef,
  ExtendedSettings,
  type FixedCropperRef,
  ImageRestriction,
} from 'react-advanced-cropper'
import { AbstractCropperIntrinsicProps } from 'react-advanced-cropper/dist/components/AbstractCropper'
import 'react-advanced-cropper/dist/style.css'
import 'react-advanced-cropper/dist/themes/corners.css'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { SwiperApp } from 'shared/lib/swiper'
import { Button } from 'shared/ui'
import { SwiperSlide } from 'swiper/react'
import { shallow } from 'zustand/shallow'

import { useUploadImagePostStore } from '../../../model'
import MenuCropSize from './components/cropperRatio'
import cls from './styles.module.scss'
interface IProps {
  onNextClick: () => void
  onPrevClick: () => void
}

export const CropImageModalStep: FC<IProps> = ({ onNextClick, onPrevClick }) => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

  const { images, setImages, setReset } = useUploadImagePostStore(
    ({ images, setImages, setReset }) => ({ images, setImages, setReset }),
    shallow
  )
  /*
  const onCrop = () => {
    return new Promise<void>((resolve, reject) => {
      if (cropperRef.current) {
        cropperRef.current.getCanvas()?.toBlob(blob => {
          const file = blob && new File([blob], 'fileName.jpg', { type: 'image/jpeg' })

          if (file) {
            setImages(file)
          }
        }, 'image/jpeg')
        resolve()
      }
    })
  }
   */

  const onButtonClick = async () => {
    //  await onCrop()
    //  onNextClick()
  }
  const onIconClick = () => {
    setReset()
    onPrevClick()
  }

  return (
    <div className={cls.modal}>
      <header className={cls.header}>
        <IconArrowBack fill={fill} onClick={onIconClick} />
        <h2>Cropping</h2>
        <Button onClick={onButtonClick}>Next</Button>
      </header>

      <SwiperApp>
        {images.map((image, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const cropperRef = useRef<any>(null)

          return (
            <SwiperSlide className={cls.swiper_slide} key={index}>
              {/* @ts-ignore */}
              <CropImageOneModalStep cropperRef={cropperRef} file={image.src} index={index} />
            </SwiperSlide>
          )
        })}
      </SwiperApp>
    </div>
  )
}

export const CropImageOneModalStep = forwardRef<any, { file: File; index: number }>(
  ({ file, index }, cropperRef) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const setImage = useUploadImagePostStore(state => state.setImage)
    // const cropperRef = useRef<FixedCropperRef>(null)
    const [aspectRatio, setAspectRatio] = useState<number>(16 / 9)
    const setStencilRatioCoordinates = (value: number) => {
      setAspectRatio(value)
      /* @ts-ignore */
      const cropCurr = cropperRef?.current

      if (cropCurr) {
        cropCurr.setCoordinates(cropCurr.getCoordinates())
      }
    }

    return (
      <div>
        <Cropper
          className={cls.cropper}
          imageRestriction={ImageRestriction.fitArea}
          key={file.name}
          ref={cropperRef}
          src={URL.createObjectURL(file)}
          stencilProps={{
            aspectRatio,
            grid: true,
          }}
        />
        <MenuCropSize onClick={setStencilRatioCoordinates} />
      </div>
    )
  }
)
