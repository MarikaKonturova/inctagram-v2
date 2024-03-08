import { CroppImageStepLib } from 'features/post/createPost/lib'
import { useUploadImagePostStore } from 'features/post/createPost/model'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { IImage, Nullable } from 'shared/types/post'
import { shallow } from 'zustand/shallow'

import { CropperRatio } from '../cropperRatio/CropperRatio'
import { CropperZoom } from '../cropperZoom/CropperZoom'
import cls from './CropImage.module.scss'

export const CropImage: FC<{ image: IImage; imageId: string }> = ({ image, imageId }) => {
  const { setAspect, setConvertedImages, setCroppedImage } = useUploadImagePostStore(
    ({ setAspect, setConvertedImages, setCroppedImage }) => ({
      setAspect,
      setConvertedImages,
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

  const setImage = useCallback(
    async (croppedAreaPixels: Area) => {
      if (croppedAreaPixels) {
        const modifiedImage = await CroppImageStepLib.getCroppedImg(
          image.originSrc,
          croppedAreaPixels
        )

        if (modifiedImage) {
          setCroppedImage({ croppedSrc: modifiedImage.src, imageId })

          setConvertedImages({ filteredSrc: modifiedImage.src, imageId })
        }
      }
    },
    [image.originSrc, setCroppedImage, imageId, setConvertedImages]
  )

  useEffect(() => {
    let timeoutId: number

    if (croppedAreaPixels) {
      timeoutId = +setTimeout(() => {
        setImage(croppedAreaPixels)
      }, 300)
    }

    return () => clearTimeout(timeoutId)
  }, [croppedAreaPixels, setImage])

  const cropSize = CroppImageStepLib.getCropSize(containerRef)

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
