import {
  IImage,
  Nullable,
  PostImages,
  useUploadImagePostStore,
} from 'features/post/CreatePostModal/model'
import { type ChangeEvent, type FC, useState } from 'react'
import IconClose from 'shared/assets/icons/general/close.svg'
import IconImg from 'shared/assets/icons/light/image.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Button } from 'shared/ui'
import { shallow } from 'zustand/shallow'

import { ConvertedImageType, convertFileToBase64WithValidate } from './lib/covertFileToBase64'
import cls from './styles.module.scss'

/* if (file.size > 1024 * 1024 * 20) {
  setError('Photo size must be less than 10 MB!')

  return
} else if (!allowedImageTypes.includes(file.type)) {
  setError('The format of the uploaded photo must be\nPNG and JPEG')

  return
} */

interface IProps {
  onNextClick: () => void
  onPrevClick: () => void
}

export const ImageModalStep: FC<IProps> = ({ onNextClick, onPrevClick }) => {
  const [error, setError] = useState('')

  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

  const { setImages } = useUploadImagePostStore(({ setImages }) => ({ setImages }), shallow)

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target

    if (files && files.length) {
      const images: PostImages<IImage> = {}

      const results: Promise<Nullable<ConvertedImageType>>[] = []

      for (let i = 0; i < files.length; i++) {
        results.push(convertFileToBase64WithValidate(files[i]))
      }

      const convertedImagesArray = await Promise.all(results)

      for (let i = 0; i < convertedImagesArray.length; i++) {
        const image = convertedImagesArray[i]

        if (image) {
          const imageId = i

          images[imageId] = {
            croppedSrc: '',
            cropperData: {
              aspect: image.dimensions.width / image.dimensions.height,
              crop: { x: 0, y: 0 },
              originalAspect: image.dimensions.width / image.dimensions.height,
              zoom: 1,
            },
            dimensions: {
              ...image.dimensions,
            },
            filter: '',
            originSrc: image.src,
          }
        }
      }

      setError('')
      setImages(images)
      onNextClick()
    }
  }

  return (
    <div className={cls.modal}>
      <header className={cls.header}>
        <h2>Add Photo</h2>
        <Button onClick={onPrevClick} theme={'clear'}>
          <IconClose fill={fill} />
        </Button>
      </header>
      <div className={cls.mainContainer}>
        {error && (
          <p className={cls.errorBox}>
            <strong>Error!</strong> {error}
          </p>
        )}

        <label className={cls.inputFile}>
          <input accept={'image/png, image/jpeg'} multiple onChange={handleChange} type={'file'} />
          <div className={cls.container}>
            <div className={cls.imgContainer}>
              <IconImg />
            </div>
            <span>Select from Computer</span>
          </div>
        </label>
      </div>
    </div>
  )
}
