import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui'

import { useTerminateAllDevices } from '../model'
import cls from './TerminateAllDevices.module.scss'

export const TerminateAllDevices = () => {
  const { isDevicesLoading, onAllTerminate } = useTerminateAllDevices()
  const { t } = useTranslation(['profile'])

  return (
    <Button
      className={cls.button}
      disabled={isDevicesLoading}
      onClick={onAllTerminate}
      theme={'outline'}
      type={'button'}
    >
      {t('terminateAllOtherSession')}
    </Button>
  )
}
