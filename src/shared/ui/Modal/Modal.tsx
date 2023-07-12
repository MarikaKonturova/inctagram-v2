import { type ReactNode } from 'react'
import { ModalLayout } from 'shared/ui/ModalLayout/ModalLayout'
import { Portal } from 'shared/ui/Portal/Portal'

interface ModalProps {
    title?: string
    isOpen?: boolean
    onClose?: () => void
    className?: string
    children?: ReactNode
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
            <ModalLayout {...restProps}>
                {children}
            </ModalLayout>
        </Portal>
    )
}
