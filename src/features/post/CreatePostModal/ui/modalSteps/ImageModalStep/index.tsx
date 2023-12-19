import { type ChangeEvent, type FC } from 'react'
import IconImg from 'shared/assets/icons/light/image.svg'
import { Modal } from 'shared/ui'
import cls from './styles.module.scss'

interface IProps {
    file?: File
    setFile: (value: File) => void
    onNextClick: () => void
    isOpen: boolean
    onPrevClick: () => void
    handleClose: () => void
}

export const ImageModalStep: FC<IProps> = ({ onPrevClick, isOpen, file, setFile, onNextClick, handleClose }) => {
    function handleChange (e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            setFile(e.target.files[0])
            const fileName = e.target.files[0].name
            onNextClick()
        }
    }

    return <Modal isOpen={isOpen} title="add Photo" withHeader={!file} onClose={handleClose}>

        <div className={cls.mainContainer}>
            <label className={cls.inputFile}>
                <input type="file" onChange={handleChange} />
                <div className={cls.container}>
                    <div className={cls.imgContainer}>
                        <IconImg/>
                    </div>
                    <span>Select from Computer</span>
                </div>
            </label>
        </div>
    </Modal>
}
