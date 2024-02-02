import React, { type ChangeEvent, type FC } from 'react'
import Avatar from 'react-avatar-edit'
import IconLabel from 'shared/assets/icons/light/image.svg'

interface PropsType {
  height: number
  onBeforeFileLoad: (e: ChangeEvent<HTMLInputElement>) => void
  onCrop: (view: string) => void
  width: number
}

const AvatarDynamicImport: FC<PropsType> = ({ height, onBeforeFileLoad, onCrop, width }) => {
  return (
    <Avatar
      borderStyle={{ border: 'none' }}
      height={height}
      label={<IconLabel />}
      labelStyle={{
        alignItems: 'center',
        backgroundColor: 'var(--dark-500-color)',
        cursor: 'pointer',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
      onBeforeFileLoad={onBeforeFileLoad}
      onCrop={onCrop}
      width={width}
    />
  )
}

export default AvatarDynamicImport
