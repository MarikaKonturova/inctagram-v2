import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { type FC, memo } from 'react'
import { Icons } from 'shared/assets/icons/browsers'
import { type DeviceScheme } from 'shared/types/device'
import { fnBrowserDetect } from 'shared/utils/browser-detect'

import cls from './Device.module.scss'

interface PropsType {
  device: Omit<DeviceScheme, 'deviceId'>
  isCurrentDevice?: boolean
}

export const Device: FC<PropsType> = memo(({ device, isCurrentDevice }) => {
  const lastActiveDate = new Date(device.lastVisit).toISOString().replace('T', ' | ').slice(0, 21)
  const Browser: any = Icons[fnBrowserDetect(device.userAgent).toLowerCase()]
  const { t } = useTranslation(['profile'])
  const title = fnBrowserDetect(device.userAgent)

  return (
    <div className={cls.inner}>
      <Browser height={40} width={40} />
      <div className={cls.content}>
        <h3 className={cls.title}>{title}</h3>
        <p className={cls.ip}>IP:&nbsp;{device.ip}</p>
        <p className={clsx({ [cls.current]: isCurrentDevice })}>
          {!isCurrentDevice && `${t('lastVisit')} ${lastActiveDate}`}
        </p>
      </div>
    </div>
  )
})
