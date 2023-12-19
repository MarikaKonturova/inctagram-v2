import { useRef, useState, type FC } from 'react'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Button, Modal } from 'shared/ui'
import { FilterImage } from './components/filterImage'
import { Filters } from './components/filters'
import { dataURLtoFile } from './lib/dataUrlToFile'
import { getModifiedImageSrc } from './lib/getModifiedImageSrc'
import cls from './styles.module.scss'

interface IProps {
    file?: File
    setFile: (value: File) => void
    onNextClick: () => void
    isOpen: boolean
    onPrevClick: () => void
    handleClose: () => void
}

export const FilterIamgeModalStep: FC<IProps> = ({ onPrevClick, isOpen, file, setFile, onNextClick, handleClose }) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const [imageFilter, setImageFilter] = useState('')
    const image = file ? URL.createObjectURL(file) : ''

    async function handleChange () {
        const newImage = await getModifiedImageSrc()
        const newFile = dataURLtoFile(newImage, 'new-file.png')
        setFile(newFile)
        onNextClick()
    }
    return (
        <Modal isOpen={isOpen} title="Cropping" withHeader={!file} onClose={handleClose} className={cls.modal}
        >
            <header className={cls.header} >
                <IconArrowBack fill={fill} onClick={onPrevClick}/>
                <h2>Cropping</h2>
                <Button onClick={handleChange}>Next</Button>
            </header>
            <div className={cls.nextContainer} >
                <FilterImage image={image} imageFilter={imageFilter} />
                <div>

                    <Filters
                    setImageFilter={setImageFilter}
                    image={image}
                    />
                </div>
            </div>

        </Modal>
    )
}
