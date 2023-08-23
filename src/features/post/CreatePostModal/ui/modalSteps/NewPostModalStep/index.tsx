import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import { useGetProfileData } from 'features/profile/getProfileData/model'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Avatar, Button, Input, Modal, Textarea } from 'shared/ui'
import { type INewPostInterface } from '../..'
import cls from './styles.module.scss'

interface IProps {
    file?: File
    setFile: (value: File) => void
    onNextClick: (data: { description: string, location: string }) => void
    isOpen: boolean
    onPrevClick: () => void
    handleClose: () => void
}

export const NewPostModalStep: FC<IProps> = ({ onPrevClick, isOpen, handleClose, file, setFile, onNextClick }) => {
    let image = file && URL.createObjectURL(file)
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const { response } = useGetProfileData()
    const userData = response?.data
    const {
        reset,
        register, formState: { errors }, handleSubmit
    } = useForm({
        defaultValues: {
            description: '',
            location: ''
        }
    })

    const onSubmit = (data: INewPostInterface) => {
        onNextClick(data)
        reset({
            description: '',
            location: ''
        })
        image = ''
    }

    return (
        <Modal isOpen={isOpen} title="add Photo" withHeader={false} onClose={handleClose}>
            <header className={cls.header}>
                <IconArrowBack fill={fill} onClick={onPrevClick}/>
                <h2>Publication</h2>
                <Button theme='textButton' onClick={handleSubmit(onSubmit)}>Publish</Button>
            </header>
            <div className={cls.mainContainer}>
                <div className={cls.imgContainer}>
                    <img src={image } />

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
