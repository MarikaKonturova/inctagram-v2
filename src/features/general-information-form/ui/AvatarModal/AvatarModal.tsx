
import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import React, {
    type ChangeEvent, type FC, useState, type MouseEvent,
    type Dispatch, type SetStateAction
} from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'widgets/SnackBar/model/store/snackbarStore'
import { profileService } from 'shared/api/profile'
import { useModal } from 'shared/hooks/useModal'
import { Button, Modal } from 'shared/ui'
import cls from './AvatarModal.module.scss'

const AvatarDynamicImport =
    dynamic(() => import('./AvatarDynamicImport'), { ssr: false })
interface confirmModalProps {
    className?: string
    setAvatar: Dispatch<SetStateAction<string | undefined>>
}
export const AvatarModal: FC<confirmModalProps> = ({ className, setAvatar }) => {
    const { t } = useTranslation()
    const { isOpen, setIsOpen } = useModal()
    const [image, setImage] = useState<File>()
    const [preview, setPreview] = useState<string>()
    const onOpen = useSnackbar((state) => state.onOpen)
    const onCloseHandler = () => { setIsOpen(false) }

    const { mutate: uploadAvatar } = useMutation(profileService.uploadAvatar, {
        mutationKey: ['uploadAvatar'],
        onSuccess: () => {
            setAvatar(preview)
            setIsOpen(false)
        },
        onError: (res: AxiosError<{ message: string }>) => {
            onOpen(res.message, 'danger', 'left')
        }
    })
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
    const onClose = () => {
        setPreview(undefined)
    }
    const onCrop = (view: string) => {
        setPreview(view)
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
            title={`${t('Add a profile photo')}`}
            className={clsx(cls.Modal, {}, [className])}
        >
            <div className={cls.content}>
                <div className={cls.flex}>
                    <AvatarDynamicImport
                            width={300}
                            height={300}
                            onBeforeFileLoad={handlerChange}
                            onClose={onClose}
                            onCrop={onCrop}
                    />
                    <Button className={cls.button} type={'button'} onClick={save} disabled={!image}>Save</Button>
                </div>
            </div>
        </Modal>
    )
}
