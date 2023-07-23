import clsx from 'clsx'
import { type FC, type PropsWithChildren, useEffect } from 'react'
import CloseIcon from 'shared/assets/icons/outline/cross.svg'
import cls from './ModalLayout.module.scss'

interface ModalLayoutProps {
    title?: string
    id?: number
    withHeader?: boolean
    withStyles?: boolean
    className?: string
    onClose?: () => void
}

export const ModalLayout: FC<PropsWithChildren<ModalLayoutProps>> = (props) => {
    const { id, onClose, title, className, children, withHeader = true, withStyles = true } = props
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
        <div id={id?.toString()} className={cls.container}>
            <div className={cls.overlay} onClick={onClose} />
            <div className={contentClassName}>
                {withHeader && <header className={cls.header}>
                    <h2>{title}</h2>
                    <button type={'button'} onClick={onClose}>
                        <CloseIcon/>
                    </button>
                </header>}
                {children}
            </div>
        </div>
    )
}
