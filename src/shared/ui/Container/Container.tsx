import { clsx } from 'clsx'
import { type FC, type PropsWithChildren } from 'react'
import cls from './Container.module.scss'

interface ContainerProps {
    className?: string
    maxWidth?: 'large' | 'medium'
}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({ maxWidth = 'large', className, children }) => {
    return <div className={clsx(cls.container, cls[maxWidth], className)}>{children}</div>
}
