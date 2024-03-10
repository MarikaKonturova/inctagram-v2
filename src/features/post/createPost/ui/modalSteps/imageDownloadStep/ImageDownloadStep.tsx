import { ImageDownloadStepLib, IndexedDBLib } from 'features/post/createPost/lib'
import { useUploadImagePostStore } from 'features/post/createPost/model'
import { useTranslation } from 'next-i18next'
import { type ChangeEvent, useEffect, useState } from 'react'
import IconClose from 'shared/assets/icons/general/close.svg'
import IconImg from 'shared/assets/icons/light/image.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { ConvertedImageType, IImage, Nullable, PostImages } from 'shared/types/post'
import { Button } from 'shared/ui'
import { shallow } from 'zustand/shallow'

import cls from './ImageDownloadStep.module.scss'

interface IProps {
  onDraftButtonClick: () => void
  onNextClick: () => void
  onPrevClick: () => void
}

export const ImageDownloadStep = ({ onDraftButtonClick, onNextClick, onPrevClick }: IProps) => {
  const [error, setError] = useState('')
  const [imageDbCount, setImageDbCount] = useState(0)
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const { t } = useTranslation('profile')

  const { setDescription, setImages, setLocation } = useUploadImagePostStore(
    ({ setDescription, setImages, setLocation }) => ({
      setDescription,
      setImages,
      setLocation,
    }),
    shallow
  )
  const onOpenDraftClick = async () => {
    //@ts-ignore
    const { descriptionDraft, imagesDraft, locationDraft } = await IndexedDBLib.getDraftPost()

    setImages(imagesDraft)
    setDescription(descriptionDraft)
    setLocation(locationDraft)
    onDraftButtonClick()
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target

    if (files && files.length) {
      const images: PostImages<IImage> = {}

      const results: Promise<Nullable<ConvertedImageType>>[] = []

      for (let i = 0; i < files.length; i++) {
        const regEx = /\.(jpe?g|png)$/i

        if (i > 9) {
          setError(t('photoAmoutError') as string)

          return
        } else if (files[i].size > 1024 * 1024 * 20) {
          setError(t('photoSizeError') as string)

          return
        } else if (!regEx.test(files[i].name)) {
          setError(t('photoFormatError') as string)

          return
        }

        results.push(ImageDownloadStepLib.convertFileToBase64WithValidate(files[i]))
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
            filteredSrc: '',
            originSrc: image.src,
          }
        }
      }

      setError('')
      setImages(images)
      onNextClick()
    }
  }
  const checkCountDB = async () => {
    const count = await IndexedDBLib.indexedDBDraftPost.checkCountDraftPost()

    setImageDbCount(count)
  }

  useEffect(() => {
    checkCountDB()
  }, [])

  return (
    <div className={cls.modal}>
      <header className={cls.header}>
        <h2>{t('addPhoto')}</h2>
        <Button onClick={onPrevClick} theme={'clear'}>
          <IconClose fill={fill} />
        </Button>
      </header>
      <div className={cls.mainContainer}>
        {error && (
          <p className={cls.errorBox}>
            <strong>{t('error')}!</strong> {error}
          </p>
        )}

        <label className={cls.inputFile}>
          <input accept={'image/png, image/jpeg'} multiple onChange={handleChange} type={'file'} />
          <div className={cls.container}>
            <div className={cls.imgContainer}>
              <IconImg />
            </div>
            <span>{t('selectFromComputer')}</span>
          </div>
        </label>
        {imageDbCount > 0 && (
          <Button onClick={onOpenDraftClick} theme={'outline'}>
            {t('openDraft')}
          </Button>
        )}
      </div>
    </div>
  )
}
