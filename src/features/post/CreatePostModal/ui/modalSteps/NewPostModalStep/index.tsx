import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useGetProfileData } from 'features/profile/getProfileData/model'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Avatar, Button, Input, Modal, Textarea } from 'shared/ui'
import { type INewPostInterface } from '../..'
import cls from './styles.module.scss'

interface IProps {
    file?: string
    setFile: (value: string) => void
    onNextClick: (data: { description: string, location: string }) => void
    isOpen: boolean
    onPrevClick: () => void
}

export const NewPostModalStep: FC<IProps> = ({ onPrevClick, isOpen, file, setFile, onNextClick }) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const { response } = useGetProfileData()
    const userData = response?.data
    const {
        register, formState: { errors }, handleSubmit
    } = useForm({
        defaultValues: {
            description: '',
            location: ''
        }
    })

    const onSubmit = (data: INewPostInterface) => {
        onNextClick(data)
    }

    return (
        <Modal isOpen={isOpen} title="add Photo" withHeader={false}>
            <header className={cls.header}>
                <IconArrowBack fill={fill} onClick={onPrevClick}/>
                <h2>Publication</h2>
                <Button theme='textButton' onClick={handleSubmit(onSubmit)}>Publish</Button>
            </header>
            <div className={cls.mainContainer}>
                <div className={cls.imgContainer}>
                    <img src={file} />

                </div>
                <form className={cls.descriptionContainer} onSubmit={handleSubmit(onSubmit)}>
                    {/* // TODO: TextArea необязательна */}
                    <div className={cls.profileInfoDescription}>
                        {userData &&

                        <div className={cls.profileInfo}>
                            <Avatar src={userData.avatars[1].url} size={36} />
                            <p className={cls.profileName}>{userData.userName}</p>
                        </div>
                        }
                        <Textarea
                labelClassName={cls.label}
                textareaClassName={cls.textarea}
                className={cls.textareaContainer}
                label={'Add publication descriptions'}
                placeholder={'Write your description here'}
                {...register('description',
                    { maxLength: { value: 500, message: 'Max length of description is 500 characters' } })}/>
                        {/*   //TODO: Location необязательный */}

                    </div>
                    <Input
                        {...register('location')}
                        id="location"
                        type={'text'}
                        label="Location"
                        className={cls.wrapper}
                        labelClassName={cls.label}
                        errorText={errors.description?.message}
                    />

                </form>

            </div>
        </Modal>
    )
}
