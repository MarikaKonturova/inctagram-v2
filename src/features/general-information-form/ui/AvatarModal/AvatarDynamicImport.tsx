import React, { type FC, type ChangeEvent } from 'react'
import Avatar from 'react-avatar-edit'

interface PropsType {
    width: number
    height: number
    onBeforeFileLoad: (e: ChangeEvent<HTMLInputElement>) => void
    onCrop: (view: string) => void
    onClose: () => void
}
const AvatarDynamicImport: FC<PropsType> = ({ height, width, onBeforeFileLoad, onCrop, onClose }) => {
    return (
        <Avatar width={width} height={height} onBeforeFileLoad={onBeforeFileLoad}
                onCrop={onCrop} onClose={onClose} imageHeight={300} imageWidth={350} />
    )
}

export default AvatarDynamicImport
