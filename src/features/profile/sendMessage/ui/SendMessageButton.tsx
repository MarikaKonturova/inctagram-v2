import { useTranslation } from 'next-i18next'
import React from 'react'
import { Button } from 'shared/ui'

import cls from './SendMessage.module.scss'

export const SendMessageButton = () => {
  const { t } = useTranslation('profile')

  const onClick = () => {
    alert('Заглушка')
  }

  return (
    <Button className={cls.button} onClick={onClick}>
      {t('sendMessage')}
    </Button>
  )
}
