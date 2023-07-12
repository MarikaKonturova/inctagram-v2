import React from 'react'

import { LogoutButton } from 'shared/ui'
import { useLogout } from '../../model'

export const Logout = () => {
    const { logout, isLoading } = useLogout()

    return (
        <LogoutButton disabled={isLoading} onClick={logout} />
    )
}
