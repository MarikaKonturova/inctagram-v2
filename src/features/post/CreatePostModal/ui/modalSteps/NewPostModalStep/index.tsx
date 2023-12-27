import { useGetProfileData } from 'features/profile/getProfileData/model'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
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
  const userData = response?.data
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      description: '',
      location: '',
    },
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
        <h2>Publication</h2>
        <Button onClick={handleSubmit(onSubmit)} theme={'textButton'}>
          Publish
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
                <Avatar size={36} src={userData.avatars?.thumbnail.url} />
                <p className={cls.profileName}>{userData.userName}</p>
              </div>
            )}
            <Textarea
              className={cls.textareaContainer}
              label={'Add publication descriptions'}
              labelClassName={cls.label}
              placeholder={'Write your description here'}
              textareaClassName={cls.textarea}
              {...register('description', {
                maxLength: { message: 'Max length of description is 500 characters', value: 500 },
              })}
            />
          </div>
          <Input
            {...register('location')}
            className={cls.wrapper}
            errorText={errors.description?.message}
            id={'location'}
            label={'Location'}
            labelClassName={cls.label}
            type={'text'}
          />
        </form>
      </div>
    </>
  )
}
