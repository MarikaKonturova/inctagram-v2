import React from 'react'
import { LogoutButton } from 'shared/ui'
import { useTerminateDevice } from '../model'

import cls from './TerminateDevice.module.scss'

interface IProps {
    deviceId: string
}

export const TerminateDevice: React.FC<IProps> = ({ deviceId }) => {
    const { onTerminate, isDeviceLoading } = useTerminateDevice()

    return (
        <LogoutButton disabled={isDeviceLoading} className={cls.button} onClick={() => onTerminate(deviceId)} />
    )
}
