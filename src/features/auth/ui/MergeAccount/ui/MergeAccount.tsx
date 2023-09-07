import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useAuth } from 'features/auth/model'
import mergeAccountsImage from 'shared/assets/images/mergeAccounts.png'
import { Button, Modal } from 'shared/ui'
import { useMergeAccount } from '../model'
import style from './MergeAccount.module.scss'

export const MergeAccount = () => {
    const { t } = useTranslation('auth')
    const { query: { code, email } } = useRouter()
    const { isLoading, confirmMerge, cancelMerge } = useMergeAccount()
    const { contentForMerge, isOpenMergePopUp, setPopUpForMerge } = useAuth()
    const closeModal = () => { setPopUpForMerge(false, '') }

    return (
        <>
            <div className={style.container}>
                <span className={style.headerText}>{t('mergeAcc')}</span>
                <span className={style.text}>{t('theUserWithEmail')} {email} {t('isAlreadyInSystem')}
                    {t('couldWeMerge')}</span>
                <div className={style.buttonContainer}>
                    <Button
                        onClick={() => { confirmMerge(code as string) } }
                        disabled={isLoading}
                    >{t('yes')}</Button>
                    <Button
                        onClick={() => { cancelMerge(code as string) } }
                        disabled={isLoading}
                    >{t('no')}</Button>
                </div>
                <Image src={mergeAccountsImage} alt={'mergeAccountsImage'} />
            </div>
            <Modal
                isOpen={isOpenMergePopUp}
                title={'Merge Accounts'}
                onClose={closeModal}
            >
                <p className={style.textForModal}>{contentForMerge}</p>
            </Modal>
        </>
    )
}
