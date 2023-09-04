import { type ReactNode } from 'react'
import styles from 'features/profile/getProfileData/ui/profilePage/ProfilePage.module.scss'
import { ModalLayout } from 'shared/ui/ModalLayout/ModalLayout'
import { Portal } from 'shared/ui/Portal/Portal'

interface ModalProps {
    title?: string
    isOpen?: boolean
    withHeader?: boolean
    withStyles?: boolean
    onClose?: () => void
    className?: string
    children?: ReactNode
    id?: number
}

export const Modal = (props: ModalProps) => {
    const {
        children,
        isOpen,
        ...restProps
    } = props

    if (!isOpen) {
        return null
    }

    return (
        <Portal>
            <div className={styles.overlay}></div>
            <ModalLayout {...restProps}>
                {children}
            </ModalLayout>
        </Portal>
    )
}
