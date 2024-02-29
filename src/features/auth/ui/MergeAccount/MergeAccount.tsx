import { useAuth, useMergeAccount } from 'features/auth/model'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import mergeAccountsImage from 'shared/assets/images/mergeAccounts.png'
import { Button, Modal } from 'shared/ui'

import style from './MergeAccount.module.scss'

export const MergeAccount = () => {
  const { t } = useTranslation('auth')
  const {
    query: { code, email },
  } = useRouter()
  const { cancelMerge, confirmMerge, isLoading } = useMergeAccount()
  const { contentForMerge, isOpenMergePopUp, setPopUpForMerge } = useAuth()
  const closeModal = () => {
    setPopUpForMerge(false, '')
  }

  return (
    <>
      <div className={style.container}>
        <span className={style.headerText}>{t('mergeAcc')}</span>
        <span className={style.text}>
          {t('theUserWithEmail')} {email} {t('isAlreadyInSystem')}
          {t('couldWeMerge')}
        </span>
        <div className={style.buttonContainer}>
          <Button
            disabled={isLoading}
            onClick={() => {
              confirmMerge(code as string)
            }}
          >
            {t('yes')}
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => {
              cancelMerge(code as string)
            }}
          >
            {t('no')}
          </Button>
        </div>
        <Image alt={'mergeAccountsImage'} src={mergeAccountsImage} />
      </div>
      <Modal isOpen={isOpenMergePopUp} onClose={closeModal} title={'Merge Accounts'}>
        <p className={style.textForModal}>{contentForMerge}</p>
      </Modal>
    </>
  )
}
