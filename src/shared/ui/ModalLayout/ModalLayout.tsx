import clsx from 'clsx'
import { type FC, type PropsWithChildren, useEffect } from 'react'
import CloseIcon from 'shared/assets/icons/outline/cross.svg'
import cls from './ModalLayout.module.scss'

interface ModalLayoutProps {
    title?: string
    className?: string
    onClose?: () => void
}

export const ModalLayout: FC<PropsWithChildren<ModalLayoutProps>> = ({ onClose, title, className, children }) => {
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
        <div className={cls.container}>
            <div className={cls.overlay} onClick={onClose} />
            <div className={clsx(cls.content, {}, [className])}>
                <header className={cls.header}>
                    <h2>{title}</h2>
                    <button type={'button'} onClick={onClose}>
                        <CloseIcon/>
                    </button>
                </header>
                {children}
            </div>
        </div>
    )
}
