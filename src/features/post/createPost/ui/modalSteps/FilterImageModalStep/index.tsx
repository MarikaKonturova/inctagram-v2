import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Button } from 'shared/ui'

import { FilterImage } from './components/filterImage'
import { Filters } from './components/filters'
import { dataURLtoFile } from './lib/dataUrlToFile'
import { getModifiedImageSrc } from './lib/getModifiedImageSrc'
import cls from './styles.module.scss'

interface IProps {
  file?: File
  onNextClick: () => void
  onPrevClick: () => void
  setFile: (value: File) => void
}

export const FilterIamgeModalStep: FC<IProps> = ({ file, onNextClick, onPrevClick, setFile }) => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const [imageFilter, setImageFilter] = useState('')
  const image = file ? URL.createObjectURL(file) : ''
  const { t } = useTranslation(['profile'])

  async function handleChange() {
    const newImage = await getModifiedImageSrc()
    const newFile = dataURLtoFile(newImage, 'new-file.png')

    setFile(newFile)
    onNextClick()
  }

  return (
    <div className={cls.modal}>
      <header className={cls.header}>
        <IconArrowBack fill={fill} onClick={onPrevClick} />
        <h2>{t('filter')}</h2>
        <Button onClick={handleChange}>{t('next')}</Button>
      </header>
      <div className={cls.nextContainer}>
        <FilterImage image={image} imageFilter={imageFilter} />
        <div>
          <Filters image={image} setImageFilter={setImageFilter} />
        </div>
      </div>
    </div>
  )
}
