import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { type FC, useEffect, useState } from 'react'
import Github from 'shared/assets/icons/general/github.svg'
import Google from 'shared/assets/icons/general/google.svg'
import { AppRoutes } from 'shared/constants/path'
import { Button, Modal } from 'shared/ui'
import { useSnackbar } from '../../../../../common'
import { useAuth } from '../../../../model'
import { useGoogleGitHubAuth } from '../model'
import style from './GoogleGitHubAuth.module.scss'

export interface GoogleAndGitHubAuthProps {
    type: 'Registration' | 'Login'
    method?: 'Google' | 'GitHub'
}

const initialState = {
    modalOpen: false,
    title: ''
}

export const GoogleGitHubAuth: FC<GoogleAndGitHubAuthProps> = ({ type }) => {
    const { t } = useTranslation('auth')
    const [modal, setModal] = useState(initialState)
    const { setAuth } = useAuth()
    const onOpen = useSnackbar((state) => state.onOpen)
    const { query, push } = useRouter()

    const queryStatus = query.status_code as string

    const { refetch: googleRefetch } = useGoogleGitHubAuth({ type, method: 'Google' })
    const { refetch: githubRefetch } = useGoogleGitHubAuth({ type, method: 'GitHub' })

    useEffect(() => {
        if (!queryStatus) return

        if (queryStatus === '200') {
            setAuth(true)
            void push(AppRoutes.PROFILE.MY_PROFILE)
        }

        if (queryStatus === '401') {
            onOpen(t('unauthorizedMessage'), 'danger', 'left')
        }

        if (queryStatus === '400') {
            onOpen(t('alreadyRegistered'), 'danger', 'left')
        }

        if (queryStatus === '204') {
            setAuth(true)
        }
    }, [queryStatus])

    const handleClose = () => {
        setModal(initialState)
    }

    return (
        <>
            {
                modal.modalOpen &&
                <Modal isOpen={modal.modalOpen} title={`${t('registration')}`} onClose={handleClose}>
                    <div className={style.modal}>
                        {modal.title}
                        <Button onClick={handleClose}>Ok</Button>
                    </div>
                </Modal>
            }
            <div onClick={() => googleRefetch()} className={style.icon}>
                <Google/>
            </div>
            <div onClick={() => githubRefetch()} className={style.icon}>
                <Github/>
            </div>
        </>
    )
}
