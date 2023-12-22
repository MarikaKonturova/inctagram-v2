import { useRef, useState, type FC } from 'react'
import { Cropper, ImageRestriction, type FixedCropperRef } from 'react-advanced-cropper'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Button } from 'shared/ui'

import 'react-advanced-cropper/dist/style.css'
import 'react-advanced-cropper/dist/themes/corners.css'
import MenuCropSize from './components/cropperRatio'
import cls from './styles.module.scss'

interface IProps {
    file?: File
    setFile: (value: File) => void
    onNextClick: () => void
    onPrevClick: () => void
}

export const CropImageModalStep: FC<IProps> = ({ onPrevClick, file, setFile, onNextClick }) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

    const cropperRef = useRef<FixedCropperRef>(null)
    const [aspectRatio, setAspectRatio] = useState<number>(16 / 9)

    const setStencilRatioCoordinates = (value: number) => {
        setAspectRatio(value)
        const cropCurr = cropperRef.current
        if (cropCurr) {
            cropCurr.setCoordinates(cropCurr.getCoordinates())
        }
    }
    const onCrop = () => {
        return new Promise<void>((resolve, reject) => {
            if (cropperRef.current) {
                cropperRef.current.getCanvas()?.toBlob((blob) => {
                    const file = blob && new File([blob], 'fileName.jpg', { type: 'image/jpeg' })
                    file && setFile(file)
                }, 'image/jpeg')
                resolve()
            }
        })
    }

    const img = file ? URL.createObjectURL(file) : ''

    const onButtonClick = async () => {
        await onCrop()
        onNextClick()
    }

    return <div className={cls.modal}>
        <header className={cls.header}>
            <IconArrowBack fill={fill} onClick={onPrevClick}/>
            <h2>Cropping</h2>
            <Button onClick={onButtonClick}>Next</Button>
        </header>
        <Cropper
            src={img}
            ref={cropperRef}
            className={cls.cropper}
            stencilProps={{
                aspectRatio,
                grid: true

            }}

            imageRestriction={ImageRestriction.fitArea}
        />
        <MenuCropSize onClick={setStencilRatioCoordinates} />

    </div>
}
