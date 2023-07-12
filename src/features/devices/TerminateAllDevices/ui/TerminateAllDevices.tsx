import React from 'react'
import { Button } from 'shared/ui'
import { useTerminateAllDevices } from '../model'
import cls from './TerminateAllDevices.module.scss'

export const TerminateAllDevices = () => {
    const { onAllTerminate, isDevicesLoading } = useTerminateAllDevices()

    return (
        <Button className={cls.button}
                type={'button'}
                disabled={isDevicesLoading}
                theme={'outline'}
                onClick={onAllTerminate}>
            Terminate all other session
        </Button>
    )
}
