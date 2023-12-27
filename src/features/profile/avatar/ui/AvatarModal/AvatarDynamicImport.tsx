import React, { type ChangeEvent, type FC } from 'react'
import Avatar from 'react-avatar-edit'

interface PropsType {
  height: number
  onBeforeFileLoad: (e: ChangeEvent<HTMLInputElement>) => void
  onCrop: (view: string) => void
  width: number
}

const AvatarDynamicImport: FC<PropsType> = ({ height, onBeforeFileLoad, onCrop, width }) => {
  return (
    <Avatar
      height={height}
      imageHeight={300}
      imageWidth={350}
      onBeforeFileLoad={onBeforeFileLoad}
      onCrop={onCrop}
      width={width}
    />
  )
}

export default AvatarDynamicImport
