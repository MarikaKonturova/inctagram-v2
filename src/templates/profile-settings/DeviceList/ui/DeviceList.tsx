import React from 'react'
import { TerminateAllDevices, TerminateDevice } from 'features/devices'
import { Device } from 'entities/Device'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

import { useDevices } from '../model'
import cls from './DeviceList.module.scss'

export const DeviceList = () => {
    const { isLoading, data: devices, isError } = useDevices()

    if (isLoading || isError) {
        return <PageLoader />
    }
    const currentDevice = devices.data.devices.find(
        (device) => device.userAgent === navigator.userAgent
    )

    const deviceItems = devices.data.devices.map((device) =>
        device.userAgent !== navigator.userAgent
            ? (
                <li key={device.deviceId} className={cls.device}>
                    <Device device={device} />
                    <TerminateDevice deviceId={device.deviceId} />
                </li>
            )
            : null
    )

    return (
        <>
            <div className={cls.wrapper}>
                <h2 className={cls.title}>This Device</h2>
                <ul>
                    {currentDevice && (
                        <li className={cls.device}>
                            <Device isCurrentDevice device={currentDevice} />
                        </li>
                    )}
                </ul>
            </div>
            <TerminateAllDevices />

            <div>
                <h2 className={cls.title}>Active sessions</h2>
                {deviceItems.length === 1
                    ? (
                        <p>No active sessions</p>
                    )
                    : (
                        <ul>{deviceItems}</ul>
                    )}
            </div>
        </>
    )
}
