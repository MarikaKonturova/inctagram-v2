import { useState, type ChangeEvent, type FC } from 'react'
import IconImg from 'shared/assets/icons/light/image.svg'
import cls from './styles.module.scss'

interface IProps {
    setFile: (value: File) => void
    onNextClick: () => void
}

export const ImageModalStep: FC<IProps> = ({ setFile, onNextClick }) => {
    const [error, setError] = useState('')
    function handleChange (e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            const file = e.target.files[0]
            const allowedImageTypes = ['image/jpeg', 'image/png']
            if (file.size > 1024 * 1024 * 20) {
                setError('Photo size must be less than 10 MB!')
            } else if (!allowedImageTypes.includes(file.type)) {
                setError('The format of the uploaded photo must be\nPNG and JPEG')
            } else {
                setError('')
                setFile(e.target.files[0])
                onNextClick()
            }
        }
    }

    return <div className={cls.mainContainer}>
        {error &&
        <p className={cls.errorBox} ><strong>Error!</strong> {error}</p>}

        <label className={cls.inputFile}>
            <input type="file" onChange={handleChange} accept="image/png, image/jpeg"/>
            <div className={cls.container}>
                <div className={cls.imgContainer}>
                    <IconImg/>
                </div>
                <span>Select from Computer</span>
            </div>
        </label>
    </div>
}
