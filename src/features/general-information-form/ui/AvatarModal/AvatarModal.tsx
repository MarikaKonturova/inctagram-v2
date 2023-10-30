
import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import React, {
    type ChangeEvent, type FC, useState, type MouseEvent,
    type Dispatch, type SetStateAction
} from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'
import { useModal } from 'shared/hooks/useModal'
import { type UserError } from 'shared/types/auth'
import { Button, Modal } from 'shared/ui'
import { dataURLtoFile } from 'shared/utils/convertDataUrlToFile'
import cls from './AvatarModal.module.scss'

const AvatarDynamicImport =
    dynamic(() => import('./AvatarDynamicImport'), { ssr: false })
interface PropsType {
    className?: string
    setAvatar: Dispatch<SetStateAction<string | undefined>>
}

export const AvatarModal: FC<PropsType> = ({ className, setAvatar }) => {
    const { t } = useTranslation('common')
    const { isOpen, setIsOpen } = useModal()
    const [image, setImage] = useState<File>()
    const [preview, setPreview] = useState<string>()
    const [errorMsg, setErrorMsg] = useState('')

    const onOpen = useSnackbar((state) => state.onOpen)

    const onCloseHandler = () => { setIsOpen(false) }

    const { mutate: uploadAvatar } = useMutation(ProfileService.uploadAvatar, {
        mutationKey: ['uploadAvatar'],
        onSuccess: () => {
            setAvatar(preview)
            setIsOpen(false)
        },
        onError: (res: AxiosError<UserError>) => {
            onOpen(res?.response?.data.messages[0].message || 'some error', 'danger', 'left')
        }
    })

    const onClose = () => {
        setPreview(undefined)
    }

    const onCrop = (view: string) => {
        setErrorMsg('')
        setPreview(view)
        const file = dataURLtoFile(view, 'hello.txt')

        setImage(file)
    }

    const onBeforeFileLoad = (e: ChangeEvent<HTMLInputElement>) => {
        const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

        if (e.target.files && e.target.files[0].size > MAX_FILE_SIZE) {
            setErrorMsg('Maximum image size is 10 Mb')
            e.target.value = ''
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
                            onBeforeFileLoad={onBeforeFileLoad}
                            onClose={onClose}
                            onCrop={onCrop}
                    />
                    {errorMsg && <p className={cls.error}>{errorMsg}</p>}
                    <Button className={cls.button} type={'button'} onClick={save} disabled={!image}>{t('save')}</Button>
                </div>
            </div>
        </Modal>
    )
}
