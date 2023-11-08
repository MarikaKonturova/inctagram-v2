import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { LogoutButton } from 'shared/ui'
import { ConfirmationModal } from 'shared/ui/ConfirmationModal/ConfirmationModal'
import { useLogout } from '../../model'

interface IProps {
    className?: string
}

export const Logout = ({ className }: IProps) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const { logout, isLoading } = useLogout()
    const { t } = useTranslation('common')

    const onLogOutClick = () => { setDeleteModalOpen(true) }

    return (
        <>
            <ConfirmationModal
                isModalOpen={deleteModalOpen}
                onYesAction={logout}
                setModalOpen={setDeleteModalOpen}
                headerText={`${t('logOutConfirmationHeader')}`}
                bodyText={`${t('logOutConfirmationBody')}`}
            />
            <LogoutButton disabled={isLoading} onClick={onLogOutClick} className={className} />
        </>
    )
}
