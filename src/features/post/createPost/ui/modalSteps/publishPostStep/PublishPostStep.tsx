import { useGetProfileData } from 'entities/Profile'
import { useCreatePostMutation, useUploadImagePostStore } from 'features/post/createPost/model'
import { useTranslation } from 'next-i18next'
import { type FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { BUTTON_VARIANTS } from 'shared/constants'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { SwiperApp } from 'shared/lib/swiper'
import { INewPostInterface } from 'shared/types/post'
import { Avatar, Button, Input, Textarea } from 'shared/ui'
import { SwiperSlide } from 'swiper/react'
import { shallow } from 'zustand/shallow'

import cls from './PublishPostStep.module.scss'

interface IProps {
  onPrevClick: () => void
  onSubmitSuccess: () => void
}

export const PublishPostStep: FC<IProps> = ({ onPrevClick, onSubmitSuccess }) => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const { t } = useTranslation(['profile'])
  const { description, images, imagesIds, location, setDescription, setLocation } =
    useUploadImagePostStore(
      ({ description, images, imagesIds, location, setDescription, setLocation }) => ({
        description,
        images,
        imagesIds,
        location,
        setDescription,
        setLocation,
      }),
      shallow
    )

  const onSuccess = () => {
    reset({
      description: '',
      location: '',
    })
    onSubmitSuccess()
  }

  const { onCreate } = useCreatePostMutation({ onSuccess })
  const { response } = useGetProfileData()
  const userData = response?.data
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      description,
      location,
    },
  })

  const onSubmit = async (data: INewPostInterface) => {
    const formData = new FormData()

    const results: Promise<any>[] = []

    for (const imageId of imagesIds) {
      results.push(
        fetch(images[imageId].filteredSrc)
          .then(res => {
            const blob = res.blob()

            return blob
          })
          .then(blob => blob)
      )
    }
    const blobs = await Promise.all(results)

    blobs.forEach(blob => {
      formData.append('files', blob)
    })

    formData.append('description', data.description)
    onCreate(formData)
  }

  const { description: descriptionWatch, location: locationWatch } = watch()

  useEffect(() => {
    setDescription(descriptionWatch)
  }, [descriptionWatch, setDescription])

  useEffect(() => {
    setLocation(locationWatch)
  }, [locationWatch, setLocation])

  return (
    <>
      <header className={cls.header}>
        <IconArrowBack fill={fill} onClick={onPrevClick} />
        <h2>{t('publication')}</h2>
        <Button onClick={handleSubmit(onSubmit)} theme={BUTTON_VARIANTS.TEXTBUTTON}>
          {t('publish')}
        </Button>
      </header>
      <div className={cls.mainContainer}>
        <SwiperApp className={cls.imgContainer}>
          {imagesIds.map(imageId => (
            <SwiperSlide key={imageId}>
              <img alt={'post image'} src={images[imageId].filteredSrc} />
            </SwiperSlide>
          ))}
        </SwiperApp>

        <form className={cls.descriptionContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={cls.profileInfoDescription}>
            {userData && (
              <div className={cls.profileInfo}>
                <Avatar size={36} src={userData.avatars?.thumbnail.url} />
                <p className={cls.profileName}>{userData.userName}</p>
              </div>
            )}
            <Textarea
              charactersCount={descriptionWatch.length}
              className={cls.textareaContainer}
              label={`${t('addPublicationDescriptions')}`}
              labelClassName={cls.label}
              placeholder={`${t('writeYourDescriptionHere')}`}
              textareaClassName={cls.textarea}
              {...register('description', {
                maxLength: { message: t('maxLengthDescription'), value: 500 },
              })}
            />
          </div>
          <Input
            {...register('location')}
            className={cls.wrapper}
            errorText={errors.description?.message}
            id={'location'}
            label={`${t('location')}`}
            labelClassName={cls.label}
            type={'text'}
          />
        </form>
      </div>
    </>
  )
}
