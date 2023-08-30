import React from 'react'

import { LogoutButton } from 'shared/ui'
import { useLogout } from '../../model'

interface IProps {
    className?: string
}

export const Logout = ({ className }: IProps) => {
    const { logout, isLoading } = useLogout()

    return (
        <LogoutButton disabled={isLoading} onClick={logout} className={className} />
    )
}
