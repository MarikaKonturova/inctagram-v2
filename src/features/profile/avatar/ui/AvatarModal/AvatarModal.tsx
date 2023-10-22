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

const AvatarDynamicImport =
    dynamic(() => import('features/profile/avatar/ui/AvatarModal/AvatarDynamicImport'), { ssr: false })
interface confirmModalProps {
    className?: string
    setAvatar: Dispatch<SetStateAction<string | undefined>>
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
export const AvatarModal: FC<confirmModalProps> = ({ className, setAvatar, isOpen, setIsOpen }) => {
    const { t } = useTranslation('common')
    const [image, setImage] = useState<File>()
    const onCloseHandler = () => { setIsOpen(false) }
    const { uploadAvatar } = useUploadAvatar(setAvatar, setIsOpen)

    function dataURLtoFile (dataurl: string, filename: string) {
        const arr = dataurl.split(',')
        // @ts-ignore
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }

        return new File([u8arr], filename, { type: mime })
    }

    const onCrop = (view: string) => {
        const file = dataURLtoFile(view, 'hello.txt')
        setImage(file)
    }

    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader()

        if (e.target.files) {
            image && fileReader.readAsDataURL(image)
        }
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
                <div className={cls.flex}>
                    <AvatarDynamicImport
                            width={300}
                            height={300}
                            onBeforeFileLoad={handlerChange}
                            onClose={() => {}}
                            onCrop={onCrop}
                    />
                    <Button className={cls.button} type={'button'} onClick={save} disabled={!image}>{t('save')}</Button>
                </div>
            </div>
        </Modal>
    )
}
