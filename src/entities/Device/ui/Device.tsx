import clsx from 'clsx'
import { type FC, memo } from 'react'
import { Icons } from 'shared/assets/icons/browsers'
import { fnBrowserDetect } from 'shared/lib/browser-detect'
import { type DeviceScheme } from 'shared/types/device'
import cls from './Device.module.scss'

interface PropsType {
    isCurrentDevice?: boolean
    device: Omit<DeviceScheme, 'deviceId'>
}

export const Device: FC<PropsType> = memo(({ device, isCurrentDevice }) => {
    const lastActiveDate = new Date(device.lastVisit).toISOString().replace('T', ' | ').slice(0, 21)
    const Browser: any = Icons[fnBrowserDetect(device.userAgent).toLowerCase()]

    const title = fnBrowserDetect(device.userAgent)

    return (
        <div className={cls.inner}>
            <Browser width={40} height={40}/>
            <div className={cls.content}>
                <h3 className={cls.title}>{title}</h3>
                <p className={cls.ip}>IP:&nbsp;{device.ip}</p>
                <p className={clsx({ [cls.current]: isCurrentDevice })}>
                    {isCurrentDevice ? 'Online' : `Last visit: ${lastActiveDate}`}
                </p>
            </div>
        </div>
    )
})
