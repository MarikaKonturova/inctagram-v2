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
  method?: 'GitHub' | 'Google'
  type: 'Login' | 'Registration'
}

const initialState = {
  modalOpen: false,
  title: '',
}

export const GoogleGitHubAuth: FC<GoogleAndGitHubAuthProps> = ({ type }) => {
  const { t } = useTranslation('auth')
  const [modal, setModal] = useState(initialState)
  const { setAuth } = useAuth()
  const onOpen = useSnackbar(state => state.onOpen)
  const { push, query } = useRouter()

  const queryStatus = query.status_code as string

  const { refetch: googleRefetch } = useGoogleGitHubAuth({ method: 'Google', type })
  const { refetch: githubRefetch } = useGoogleGitHubAuth({ method: 'GitHub', type })

  useEffect(() => {
    if (!queryStatus) {
      return
    }

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
      {modal.modalOpen && (
        <Modal isOpen={modal.modalOpen} onClose={handleClose} title={`${t('registration')}`}>
          <div className={style.modal}>
            {modal.title}
            <Button onClick={handleClose}>Ok</Button>
          </div>
        </Modal>
      )}
      <div className={style.icon} onClick={() => googleRefetch()}>
        <Google />
      </div>
      <div className={style.icon} onClick={() => githubRefetch()}>
        <Github />
      </div>
    </>
  )
}
