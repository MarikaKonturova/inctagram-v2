import axios from 'axios'
import React from 'react'
import { useSnackbar } from 'features/common'
import { Button, ThemeSwitcher } from 'shared/ui'
import cls from './AdminMenu.module.scss'

export const AdminMenu = () => {
    const onOpen = useSnackbar((state) => state.onOpen)
    return (
        <div className={cls.AdminMenu}>
            <ThemeSwitcher />
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
            {process.env.NODE_ENV === 'development' && (
                <Button
          onClick={async () => {
              await axios
                  .delete('https://inctagram.vercel.app/delete-all-data')
                  .then(() => {
                      onOpen('Database cleared', 'success', 'right')
                  })
                  .catch((e) => {
                      onOpen(e?.response?.data?.message || 'Error', 'danger', 'right')
                  })
          }}
                >
                    Del Data
                </Button>
            )}
        </div>
    )
}
