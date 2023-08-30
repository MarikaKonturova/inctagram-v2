import { useRouter } from 'next/router'
import React, { type FC, useEffect, useState } from 'react'
import Github from 'shared/assets/icons/general/github.svg'
import Google from 'shared/assets/icons/general/google.svg'
import { Button, Modal } from 'shared/ui'
import { AppRoutes } from '../../../../../../shared/config/routeConfig/path'
import { routerPush } from '../../../../../../shared/lib/routerPush/routerPush'
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
    const [modal, setModal] = useState(initialState)

    const { query } = useRouter()

    const queryStatus = query.status_code as string

    const { refetch: googleRefetch } = useGoogleGitHubAuth({ type, method: 'Google' })
    const { refetch: githubRefetch } = useGoogleGitHubAuth({ type, method: 'GitHub' })

    useEffect(() => {
        if (!queryStatus) return

        if (queryStatus === '200') {
            routerPush(AppRoutes.PROFILE_SETTINGS.GENERAL_INFORMATION)
        }

        if (queryStatus === '401') {
            setModal({
                modalOpen: true,
                title: 'Unauthorized , go to sign up page to make registration'
            })
        }

        if (queryStatus === '400') {
            setModal({
                modalOpen: true,
                title: 'User is already registered'
            })
        }

        if (queryStatus === '204') {
            setModal({
                modalOpen: true,
                title: 'An email with a verification code has been sent to the your email address'
            })
        }
    }, [queryStatus])

    const handleClose = () => {
        setModal(initialState)
    }

    return (
        <>
            {
                modal.modalOpen &&
                <Modal isOpen={modal.modalOpen} title={'Registration'} onClose={handleClose}>
                    <div className={style.modal}>
                        {modal.title}
                        <Button onClick={handleClose}>Ok</Button>
                    </div>
                </Modal>
            }
            <div onClick={() => googleRefetch()}>
                <Google/>
            </div>
            <div onClick={() => githubRefetch()}>
                <Github/>
            </div>
        </>
    )
}
