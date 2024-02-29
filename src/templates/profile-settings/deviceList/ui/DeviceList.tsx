import { Device } from 'entities/Device'
import { TerminateAllDevices, TerminateDevice } from 'features/devices'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

import { useDevices } from '../model'
import cls from './DeviceList.module.scss'

export const DeviceList = () => {
  const { data: devices, isError, isLoading } = useDevices()
  const { t } = useTranslation(['profile'])

  if (isLoading || isError) {
    return <PageLoader />
  }
  const currentDevice = devices.data.devices.find(
    device => device.userAgent === navigator.userAgent
  )

  const deviceItems = devices.data.devices.map(device =>
    device.userAgent !== navigator.userAgent ? (
      <li className={cls.device} key={device.deviceId}>
        <Device device={device} />
        <TerminateDevice deviceId={device.deviceId} />
      </li>
    ) : null
  )

  return (
    <>
      <div className={cls.wrapper}>
        <h2 className={cls.title}>{t('thisDevice')}</h2>
        <ul>
          {currentDevice && (
            <li className={cls.device}>
              <Device device={currentDevice} isCurrentDevice />
            </li>
          )}
        </ul>
      </div>
      <TerminateAllDevices />

      <div>
        <h2 className={cls.title}>{t('activeSessions')}</h2>
        {deviceItems.length === 1 ? <p>{t('noActiveSessions')}</p> : <ul>{deviceItems}</ul>}
      </div>
    </>
  )
}
