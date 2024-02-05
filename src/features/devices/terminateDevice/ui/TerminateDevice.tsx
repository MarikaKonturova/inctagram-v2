import React from 'react'
import { LogoutButton } from 'shared/ui'

import { useTerminateDevice } from '../model'
import cls from './TerminateDevice.module.scss'

interface IProps {
  deviceId: string
}

export const TerminateDevice: React.FC<IProps> = ({ deviceId }) => {
  const { isDeviceLoading, onTerminate } = useTerminateDevice()

  const onClickHandler = () => onTerminate(deviceId)()

  return <LogoutButton className={cls.button} disabled={isDeviceLoading} onClick={onClickHandler} />
}
