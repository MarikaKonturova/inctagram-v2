import clsx from 'clsx'
import { type FC, type PropsWithChildren, useEffect } from 'react'
import CloseIcon from 'shared/assets/icons/outline/cross.svg'

import cls from './ModalLayout.module.scss'

interface ModalLayoutProps {
  className?: string
  id?: number
  onClose?: () => void
  title?: string
  withHeader?: boolean
  withStyles?: boolean
}

export const ModalLayout: FC<PropsWithChildren<ModalLayoutProps>> = props => {
  const { children, className, id, onClose, title, withHeader = true, withStyles = true } = props
  const contentClassName = clsx(cls.content, withStyles ? cls.withStyles : '', {}, [className])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      event.key === 'Escape' && onClose?.()
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div className={cls.container} id={id?.toString()}>
      <div className={cls.overlay} onClick={onClose} />
      <div className={contentClassName}>
        {withHeader && (
          <header className={cls.header}>
            <h2>{title}</h2>
            <button onClick={onClose} type={'button'}>
              <CloseIcon />
            </button>
          </header>
        )}
        {children}
      </div>
    </div>
  )
}
