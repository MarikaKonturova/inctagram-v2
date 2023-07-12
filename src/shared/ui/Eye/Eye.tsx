import { type FC } from 'react'
import CloseEye from 'shared/assets/icons/outline/eye-off-outline.svg'
import OpenEye from 'shared/assets/icons/outline/eye-outline.svg'

interface EyeProps {
    onClick: () => void
    isVisible: boolean
}

export const Eye: FC<EyeProps> = ({ isVisible, onClick }) => {
    return <>
        <button type={'button'} onClick={onClick}>
            {isVisible ? <CloseEye /> : <OpenEye />}
        </button>
    </>
}
