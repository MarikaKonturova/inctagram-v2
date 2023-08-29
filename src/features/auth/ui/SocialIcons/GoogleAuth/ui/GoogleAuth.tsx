import { useRouter } from 'next/router'
import React, { type FC, useEffect, useState } from 'react'
import Google from 'shared/assets/icons/general/google.svg'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { routerPush } from 'shared/lib/routerPush/routerPush'
import { Button, Modal } from 'shared/ui'
import { useGoogleAuth } from '../model'
import style from './GoogleAuth.module.scss'

export interface GoogleAndGitHubAuthProps {
    type: 'Registration' | 'Login'
}

const initialState = {
    modalOpen: false,
    title: ''
}

export const GoogleAuth: FC<GoogleAndGitHubAuthProps> = ({ type }) => {
    const [modal, setModal] = useState(initialState)

    const { query } = useRouter()

    const queryStatus = query.status_code as string

    const { refetch } = useGoogleAuth({ type })

    useEffect(() => {
        if (!queryStatus) return

        if (queryStatus === '200') {
            setModal({
                modalOpen: true,
                title: 'Success'
            })
            routerPush(AppRoutes.PROFILE.MY_PROFILE)
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
            <div onClick={() => refetch()}>
                <Google/>
            </div>
        </>
    )
}
