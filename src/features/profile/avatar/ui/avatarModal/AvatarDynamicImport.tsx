import { useTranslation } from 'next-i18next'
import React, { type ChangeEvent, type FC } from 'react'
import Avatar from 'react-avatar-edit'
import UploadPhoto from 'shared/assets/icons/light/upload-photo.svg'

interface PropsType {
  height: number
  onBeforeFileLoad: (e: ChangeEvent<HTMLInputElement>) => void
  onCrop: (view: string) => void
  width: number
}

const AvatarDynamicImport: FC<PropsType> = ({ height, onBeforeFileLoad, onCrop, width }) => {
  const { t } = useTranslation('profile')

  return (
    <Avatar
      borderStyle={{ border: 'none' }}
      height={height}
      label={
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <UploadPhoto />
          <div style={{ fontWeight: 600, lineHeight: '20px', paddingTop: '10px' }}>
            {t('uploadPhoto')}
          </div>
        </div>
      }
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
