import axios from 'axios'
import React from 'react'
import { useSnackbar } from 'widgets/SnackBar/model/store/snackbarStore'
import { Button } from 'shared/ui/Button/Button'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher'
import cls from './AdminMenu.module.scss'

export const AdminMenu = () => {
    const onOpen = useSnackbar(state => state.onOpen)
    return (
        <div className={cls.AdminMenu}>
            <ThemeSwitcher/>
            <LangSwitcher/>
            <Button onClick={() => { onOpen('Danger', 'danger', 'center') }}>danger</Button>
            <Button onClick={() => { onOpen('Warning', 'warning', 'left') }}>warning</Button>
            <Button onClick={() => { onOpen('Success', 'success', 'right') }}>success</Button>
            {process.env.NODE_ENV === 'development' && <Button onClick={async () => {
                await axios.delete('https://inctagram.vercel.app/delete-all-data')
                    .then(() => {
                        onOpen('Database cleared', 'success', 'right')
                    })
                    .catch(e => {
                        onOpen(e?.response?.data?.message || 'Error', 'danger', 'right')
                    })
            }}>Del Data</Button>}
        </div>
    )
}
