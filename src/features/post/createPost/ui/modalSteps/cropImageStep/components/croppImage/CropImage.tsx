import { IImage, Nullable, useUploadImagePostStore } from 'features/post/createPost/model'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { shallow } from 'zustand/shallow'

import { getCropSize } from '../../lib/getCropSize'
import { getCroppedImg } from '../../lib/getCropperImg'
import { CropperRatio } from '../cropperRatio/CropperRatio'
import { CropperZoom } from '../cropperZoom/CropperZoom'
import cls from './CropImage.module.scss'

export const CropImage: FC<{ image: IImage; imageId: string }> = ({ image, imageId }) => {
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
