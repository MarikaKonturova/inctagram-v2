import { useGetProfileData } from 'entities/Profile'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import userPhoto from 'shared/assets/images/user.png'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { AvatarSizes } from 'shared/types/post'
import { Avatar, Button, Input, Textarea } from 'shared/ui'

import { type INewPostInterface } from '../..'
import cls from './styles.module.scss'

interface IProps {
  file?: File
  onNextClick: (data: { description: string; location: string }) => void
  onPrevClick: () => void
  setFile: (value: File) => void
}

export const NewPostModalStep: FC<IProps> = ({ file, onNextClick, onPrevClick, setFile }) => {
  let image = file && URL.createObjectURL(file)
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const { response } = useGetProfileData()
  const { t } = useTranslation(['profile'])
  const userData = response?.data
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      description: '',
      location: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })

  const onSubmit = (data: INewPostInterface) => {
    onNextClick(data)
    reset({
      description: '',
      location: '',
    })
    image = ''
  }

  return (
    <>
      <header className={cls.header}>
        <IconArrowBack fill={fill} onClick={onPrevClick} />
        <h2>{t('publication')}</h2>
        <Button disabled={!isValid} onClick={handleSubmit(onSubmit)} theme={'textButton'}>
          {t('publish')}
        </Button>
      </header>
      <div className={cls.mainContainer}>
        <div className={cls.imgContainer}>
          <img src={image} />
        </div>
        <form className={cls.descriptionContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={cls.profileInfoDescription}>
            {userData && (
              <div className={cls.profileInfo}>
                <Avatar
                  size={AvatarSizes.medium}
                  src={userData.avatars?.thumbnail.url || userPhoto.src}
                />
                <p className={cls.profileName}>{userData.userName}</p>
              </div>
            )}
            <Textarea
              className={cls.textareaContainer}
              errorText={errors.description?.message}
              label={`${t('addPublicationDescriptions')}`}
              labelClassName={cls.label}
              placeholder={`${t('writeYourDescriptionHere')}`}
              textareaClassName={cls.textarea}
              {...register('description', {
                maxLength: { message: `${t('maxLengthDescription')}`, value: 500 },
              })}
            />
          </div>
          <Input
            {...register('location')}
            className={cls.wrapper}
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
