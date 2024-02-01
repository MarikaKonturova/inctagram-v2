import React from 'react'
import { Button } from 'shared/ui'

import { useTerminateAllDevices } from '../model'
import cls from './TerminateAllDevices.module.scss'

export const TerminateAllDevices = () => {
  const { isDevicesLoading, onAllTerminate } = useTerminateAllDevices()

  return (
    <Button
      className={cls.button}
      disabled={isDevicesLoading}
      onClick={onAllTerminate}
      theme={'outline'}
      type={'button'}
    >
      Terminate all other session
    </Button>
  )
}
