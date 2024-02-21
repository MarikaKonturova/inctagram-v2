import React from 'react'
import { useSnackbar } from 'shared/hooks'
import { Button } from 'shared/ui'

import cls from './AdminMenu.module.scss'

export const AdminMenu = () => {
  const onOpen = useSnackbar(state => state.onOpen)

  return (
    <div className={cls.AdminMenu}>
      <Button
        onClick={() => {
          onOpen('Danger', 'danger', 'center')
        }}
      >
        danger
      </Button>
      <Button
        onClick={() => {
          onOpen('Warning', 'warning', 'left')
        }}
      >
        warning
      </Button>
      <Button
        onClick={() => {
          onOpen('Success', 'success', 'right')
        }}
      >
        success
      </Button>
    </div>
  )
}
