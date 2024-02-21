import { type FC, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { SwiperApp } from 'shared/lib/swiper'
import { Button } from 'shared/ui'
import { SwiperSlide } from 'swiper/react'
import { shallow } from 'zustand/shallow'

import { IImage, Nullable, useUploadImagePostStore } from '../../../model'
import CropperRatio from './components/cropperRatio'
import { CropperZoom } from './components/cropperZoom'
import { getCroppedImg } from './components/helpers'
import cls from './styles.module.scss'
interface IProps {
  onNextClick: () => void
  onPrevClick: () => void
}

export const CropImageModalStep: FC<IProps> = ({ onNextClick, onPrevClick }) => {
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
              <CropImageOneModalStep image={images[imageId]} imageId={imageId} />
            </SwiperSlide>
          )
        })}
      </SwiperApp>
    </div>
  )
}

const getCropSize = (containerRef: MutableRefObject<Nullable<HTMLDivElement>>) => {
  if (containerRef && containerRef.current) {
    const width = containerRef.current?.clientWidth
    const height = containerRef.current?.clientHeight

    return {
      height,
      width,
    }
  }

  return undefined
}

export const CropImageOneModalStep: FC<{ image: IImage; imageId: string }> = ({
  image,
  imageId,
}) => {
  const { setAspect, setCroppedImage } = useUploadImagePostStore(
    ({ setAspect, setCroppedImage }) => ({
      setAspect,
      setCroppedImage,
    }),
    shallow
  )
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [cropperZoom, setCropperZoom] = useState(image.cropperData.zoom)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Nullable<Area>>(null)

  const containerRef = useRef<Nullable<HTMLDivElement>>(null)
  const cropperRef = useRef<Cropper>(null)

  const handleCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const setImage = async (croppedAreaPixels: Area) => {
    if (croppedAreaPixels) {
      const modifiedImage = await getCroppedImg(image.originSrc, croppedAreaPixels)

      if (modifiedImage) {
        setCroppedImage({ croppedSrc: modifiedImage.src, imageId })
      }
    }
  }

  useEffect(() => {
    let timeoutId: number

    if (croppedAreaPixels) {
      timeoutId = +setTimeout(() => {
        setImage(croppedAreaPixels)
      }, 300)
    }

    return () => clearTimeout(timeoutId)
  }, [croppedAreaPixels])

  const cropSize = getCropSize(containerRef)

  return (
    <div>
      <div className={cls.cropper} ref={containerRef}>
        <Cropper
          aspect={image.cropperData.aspect}
          crop={crop}
          cropSize={!image.cropperData.aspect ? cropSize : undefined}
          image={image.originSrc}
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onWheelRequest={() => false}
          ref={cropperRef}
          showGrid={false}
          style={{
            cropAreaStyle: {
              border: 'none',
              color: '#333333',
            },
          }}
          zoom={cropperZoom}
        />
      </div>
      <CropperRatio
        onClick={aspect => {
          setAspect({ aspect, imageId })
        }}
      />
      <CropperZoom
        max={3}
        min={1}
        onChange={zoom => {
          setCropperZoom(zoom)
        }}
        step={0.1}
        value={cropperZoom}
      />
    </div>
  )
}
