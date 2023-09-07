import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import mergeAccountsImage from 'shared/assets/images/mergeAccounts.png'
import { Button, Modal } from '../../../../../shared/ui'
import { useAuth } from '../../../model'
import { useMergeAccount } from '../model'
import style from './MergeAccount.module.scss'

const MergeAccount = () => {
    const { query: { code, email } } = useRouter()
    const { isLoading, confirmMerge, cancelMerge } = useMergeAccount()
    const { contentForMerge, isOpenMergePopUp, setPopUpForMerge } = useAuth()
    const closeModal = () => { setPopUpForMerge(false, '') }

    return (
        <>
            <div className={style.container}>
                <span className={style.headerText}>Merge Accounts</span>
                <span className={style.text}>The user with email : {email} is already in the system.
                    Could we merge this accounts ?</span>
                <div className={style.buttonContainer}>
                    <Button
                        onClick={() => { confirmMerge(code as string) } }
                        disabled={isLoading}
                    >Yes,merge</Button>
                    <Button
                        onClick={() => { cancelMerge(code as string) } }
                        disabled={isLoading}
                    >No</Button>
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

export default MergeAccount
