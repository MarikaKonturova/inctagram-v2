import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import React, { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react'
import IconLogOut from 'shared/assets/icons/general/log-out.svg'
import { Button } from 'shared/ui/Button/Button'

import cls from './LogoutButton.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type PropsType = DefaultButtonPropsType

export const LogoutButton: React.FC<PropsType> = ({ className, disabled, onClick }) => {
  const { t } = useTranslation('common')

  return (
    <Button
      className={clsx(cls.button, className)}
      disabled={disabled}
      onClick={onClick}
      theme={'clear'}
    >
      <IconLogOut className={cls.icon} />
      {t('logout')}
    </Button>
  )
}
