import { type ChangeEvent, type FC } from 'react'
import IconImg from 'shared/assets/icons/light/image.svg'
import cls from './styles.module.scss'

interface IProps {
    setFile: (value: File) => void
    onNextClick: () => void
}

export const ImageModalStep: FC<IProps> = ({ setFile, onNextClick }) => {
    function handleChange (e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            setFile(e.target.files[0])
            onNextClick()
        }
    }

    return <div className={cls.mainContainer}>

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
}
