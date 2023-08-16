import React, { type ChangeEvent, type FC } from 'react'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import IconImg from 'shared/assets/icons/light/image.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Button, Modal } from 'shared/ui'
import cls from './styles.module.scss'

interface IProps {
    file?: string
    setFile: (value: string) => void
    onNextClick: () => void
    isOpen: boolean
    onPrevClick: () => void
}

export const ImageModalStep: FC<IProps> = ({ onPrevClick, isOpen, file, setFile, onNextClick }) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

    function handleChange (e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target.files)
        if (e.target.files?.length) {
            setFile(URL.createObjectURL(e.target.files[0]))
        }
    }
    return (
        <Modal isOpen={isOpen} title="add Photo" withHeader={!file}>
            {file && (<header className={cls.header}>
                <IconArrowBack fill={fill} onClick={onPrevClick}/>
                <h2>Choose photo</h2>
                <Button onClick={onNextClick}>Next</Button>
            </header>)}
            <div className={cls.mainContainer}>
                {!file
                    ? <label className={cls.inputFile}>
                        <input type="file" onChange={handleChange} />
                        <div className={cls.container}>
                            <div className={cls.imgContainer}>
                                <IconImg/>
                            </div>
                            <span>Select from Computer</span>
                        </div>
                    </label>

                    : <div className={cls.nextContainer}>
                        <img src={file} />
                    </div>
                }
            </div>
        </Modal>
    )
}
