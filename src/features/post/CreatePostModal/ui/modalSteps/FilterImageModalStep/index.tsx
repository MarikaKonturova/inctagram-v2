import { useUploadImagePostStore } from 'features/post/CreatePostModal/model'
import { type FC, useState } from 'react'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Button } from 'shared/ui'
import { shallow } from 'zustand/shallow'

import { FilterImage } from './components/filterImage'
import { Filters } from './components/filters'
import { dataURLtoFile } from './lib/dataUrlToFile'
import { getModifiedImageSrc } from './lib/getModifiedImageSrc'
import cls from './styles.module.scss'

interface IProps {
  onNextClick: () => void
  onPrevClick: () => void
}

export const FilterIamgeModalStep: FC<IProps> = ({ onNextClick, onPrevClick }) => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const { image, setImage } = useUploadImagePostStore(
    ({ image, setImage }) => ({ image, setImage }),
    shallow
  )
  const [imageFilter, setImageFilter] = useState('')
  const workingImage = image ? URL.createObjectURL(image) : ''

  async function handleChange() {
    const newImage = await getModifiedImageSrc()
    const newFile = dataURLtoFile(newImage, 'new-file.png')

    setImage(newFile)
    onNextClick()
  }

  return (
    <div className={cls.modal}>
      <header className={cls.header}>
        <IconArrowBack fill={fill} onClick={onPrevClick} />
        <h2>Filter</h2>
        <Button onClick={handleChange}>Next</Button>
      </header>
      <div className={cls.nextContainer}>
        <FilterImage image={workingImage} imageFilter={imageFilter} />
        <div>
          <Filters image={workingImage} setImageFilter={setImageFilter} />
        </div>
      </div>
    </div>
  )
}
