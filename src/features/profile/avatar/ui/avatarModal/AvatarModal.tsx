import clsx from 'clsx'
import { useUploadAvatar } from 'features/profile/avatar/model/uploadAvatar'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import {
  type ChangeEvent,
  type Dispatch,
  type FC,
  type MouseEvent,
  type SetStateAction,
  useState,
} from 'react'
import { Button, Modal } from 'shared/ui'
import { convertDataUrlToFile } from 'shared/utils/convertDataUrlToFile'

import cls from './AvatarModal.module.scss'

/*const AVATAR_SIZE = 300*/

const AVATAR_HEIGHT = 228
const AVATAR_WIDTH = 222

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const AvatarDynamicImport = dynamic(
  () => import('features/profile/avatar/ui/avatarModal/AvatarDynamicImport'),
  { ssr: false }
)

interface PropsType {
  className?: string
  isOpen: boolean
  setAvatar: Dispatch<SetStateAction<string | undefined>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const AvatarModal: FC<PropsType> = ({ className, isOpen, setAvatar, setIsOpen }) => {
  const { t } = useTranslation('common')
  const [image, setImage] = useState<File>()
  const [errorMessage, setErrorMessage] = useState('')
  const { openButton, uploadAvatar } = useUploadAvatar(setAvatar, setIsOpen)

  const onCrop = (view: string) => {
    const file = convertDataUrlToFile(view, 'hello.txt')

    setImage(file)
  }

  const onBeforeFileLoad = (e: ChangeEvent<HTMLInputElement>) => {
    const allowedImageTypes = ['image/jpeg', 'image/png']

    const file = e.target.files?.[0]

    if (file) {
      if (!allowedImageTypes.includes(file?.type)) {
        setErrorMessage(`${t('photoFormatError')}`)
        e.target.value = ''
      } else if (file?.size > MAX_FILE_SIZE) {
        setErrorMessage(`${t('photoSizeError')}`)
        e.target.value = ''
      } else {
        setErrorMessage('')
      }
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
      className={clsx(cls.Modal, {}, [className])}
      isOpen={isOpen}
      onClose={onCloseHandler}
      title={`${t('addPhoto')}`}
    >
      <div className={errorMessage ? `${cls.content} ${cls.contentError}` : cls.content}>
        {errorMessage && (
          <div className={cls.errorBox}>
            <p className={cls.errorText}>
              <strong>Error!</strong> {errorMessage}
            </p>
          </div>
        )}
        <AvatarDynamicImport
          height={AVATAR_HEIGHT}
          onBeforeFileLoad={onBeforeFileLoad}
          onCrop={onCrop}
          width={AVATAR_WIDTH}
        />
        <Button
          className={cls.button}
          disabled={!image}
          onClick={save}
          style={{ display: openButton || image ? 'block' : 'none' }}
          type={'button'}
        >
          {t('save')}
        </Button>
      </div>
    </Modal>
  )
}
