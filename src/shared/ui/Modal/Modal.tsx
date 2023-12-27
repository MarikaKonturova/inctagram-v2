import { type ReactNode } from 'react'
import { ModalLayout } from 'shared/ui/ModalLayout/ModalLayout'
import { Portal } from 'shared/ui/Portal/Portal'

interface ModalProps {
  children?: ReactNode
  className?: string
  id?: number
  isOpen?: boolean
  onClose?: () => void
  title?: string
  withHeader?: boolean
  withStyles?: boolean
}

export const Modal = (props: ModalProps) => {
  const { children, isOpen, ...restProps } = props

  if (!isOpen) {
    return null
  }

  return (
    <Portal>
      <ModalLayout {...restProps}>{children}</ModalLayout>
    </Portal>
  )
}
