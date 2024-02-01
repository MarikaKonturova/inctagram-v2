import { useUploadImagePostStore } from 'features/post/CreatePostModal/model'
import { type ChangeEvent, type FC, useState } from 'react'
import IconClose from 'shared/assets/icons/general/close.svg'
import IconImg from 'shared/assets/icons/light/image.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Button } from 'shared/ui'
import { shallow } from 'zustand/shallow'

import cls from './styles.module.scss'

interface IProps {
  onNextClick: () => void
  onPrevClick: () => void
}

export const ImageModalStep: FC<IProps> = ({ onNextClick, onPrevClick }) => {
  const [error, setError] = useState('')

  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

  const { setImage, setName } = useUploadImagePostStore(
    ({ setImage, setName }) => ({ setImage, setName }),
    shallow
  )

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      const file = e.target.files[0]
      const allowedImageTypes = ['image/jpeg', 'image/png']

      if (file.size > 1024 * 1024 * 20) {
        setError('Photo size must be less than 10 MB!')
      } else if (!allowedImageTypes.includes(file.type)) {
        setError('The format of the uploaded photo must be\nPNG and JPEG')
      } else {
        setError('')
        setImage(e.target.files[0])
        setName(e.target.files[0].name)
        onNextClick()
      }
    }
  }

  return (
    <div className={cls.modal}>
      <header className={cls.header}>
        <h2>Add Photo</h2>
        <Button onClick={onPrevClick} theme={'clear'}>
          <IconClose fill={fill} />
        </Button>
      </header>
      <div className={cls.mainContainer}>
        {error && (
          <p className={cls.errorBox}>
            <strong>Error!</strong> {error}
          </p>
        )}

        <label className={cls.inputFile}>
          <input accept={'image/png, image/jpeg'} onChange={handleChange} type={'file'} />
          <div className={cls.container}>
            <div className={cls.imgContainer}>
              <IconImg />
            </div>
            <span>Select from Computer</span>
          </div>
        </label>
      </div>
    </div>
  )
}
