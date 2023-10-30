import clsx from 'clsx'
import dynamic from 'next/dynamic'
import React, {
    type ChangeEvent, type FC, useState, type MouseEvent,
    type Dispatch, type SetStateAction
} from 'react'
import { useTranslation } from 'react-i18next'
import { useUploadAvatar } from 'features/profile/avatar/model/uploadAvatar'
import cls from 'features/profile/avatar/ui/AvatarModal/AvatarModal.module.scss'
import { Button, Modal } from 'shared/ui'
import { convertDataUrlToFile } from 'shared/utils/convertDataUrlToFile'

const AVATAR_SIZE = 300
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const AvatarDynamicImport =
    dynamic(() => import('features/profile/avatar/ui/AvatarModal/AvatarDynamicImport'), { ssr: false })
interface PropsType {
    className?: string
    setAvatar: Dispatch<SetStateAction<string | undefined>>
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const AvatarModal: FC<PropsType> = ({ className, setAvatar, isOpen, setIsOpen }) => {
    const { t } = useTranslation('common')
    const [image, setImage] = useState<File>()
    const [errorMessage, setErrorMessage] = useState('')
    const { uploadAvatar } = useUploadAvatar(setAvatar, setIsOpen)

    const onCrop = (view: string) => {
        const file = convertDataUrlToFile(view, 'hello.txt')
        setImage(file)
    }

    const onBeforeFileLoad = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0].size > MAX_FILE_SIZE) {
            setErrorMessage('Photo size must be less than 10 MB!')
            e.target.value = ''
        }
    }

    const onCloseHandler = () => {
        setIsOpen(false)
        setErrorMessage('')
    }

    const save = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const formData = new FormData()
        image && formData.append('file', image)
        uploadAvatar(formData)
        setImage(undefined)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseHandler}
            title={`${t('addPhoto')}`}
            className={clsx(cls.Modal, {}, [className])}
        >
            <div className={cls.content}>
                {errorMessage && <div className={cls.errorBlock}>
                    <p><strong>Error!</strong> {errorMessage}</p>
                </div>}
                <AvatarDynamicImport
                            width={AVATAR_SIZE}
                            height={AVATAR_SIZE}
                            onBeforeFileLoad={onBeforeFileLoad}
                            onCrop={onCrop}
                />
                <Button className={cls.button} type={'button'} onClick={save} disabled={!image}>{t('save')}</Button>
            </div>
        </Modal>
    )
}
