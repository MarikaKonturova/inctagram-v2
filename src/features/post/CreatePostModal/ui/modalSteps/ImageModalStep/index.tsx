import { type ChangeEvent, type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import IconImg from 'shared/assets/icons/light/image.svg'

import cls from './styles.module.scss'

interface IProps {
  onNextClick: () => void
  setFile: (value: File) => void
}

export const ImageModalStep: FC<IProps> = ({ onNextClick, setFile }) => {
  const [error, setError] = useState('')
  const { t } = useTranslation(['profile'])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      const file = e.target.files[0]
      const allowedImageTypes = ['image/jpeg', 'image/png']

      if (file.size > 1024 * 1024 * 20) {
        setError(`${t('photoSizeError')}`)
      } else if (!allowedImageTypes.includes(file.type)) {
        setError(`${t('photoFormatError')}`)
      } else {
        setError('')
        setFile(e.target.files[0])
        onNextClick()
      }
    }
  }

  return (
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
          <span>{t('selectFromComputer')}</span>
        </div>
      </label>
    </div>
  )
}
