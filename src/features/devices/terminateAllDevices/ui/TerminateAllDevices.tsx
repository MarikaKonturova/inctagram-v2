import { useTranslation } from 'next-i18next'
import React from 'react'
import { BUTTON_VARIANTS } from 'shared/constants'
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
      theme={BUTTON_VARIANTS.OUTLINE}
      type={'button'}
    >
      {t('terminateAllOtherSession')}
    </Button>
  )
}
