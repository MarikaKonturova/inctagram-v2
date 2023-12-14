import { type ChangeEvent, type FC } from 'react'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import IconImg from 'shared/assets/icons/light/image.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Button, Modal } from 'shared/ui'
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
    console.log('FilterIamgeModal works!')
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    function handleChange (e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            setFile(e.target.files[0])
        }
    }

    return (
        <Modal isOpen={isOpen} title="Cropping" withHeader={!file} onClose={handleClose}>
            <header className={cls.header}>
                <IconArrowBack fill={fill} onClick={onPrevClick}/>
                <h2>Cropping</h2>
                <Button onClick={onNextClick}>Next</Button>
            </header>
            <div className={cls.nextContainer}>
                <img src={file ? URL.createObjectURL(file) : ''} style={{ width: '100%' }} />
            </div>

        </Modal>
    )
}
