import clsx from 'clsx'
import { type CSSProperties } from 'react'
import cls from './Skeleton.module.scss'

interface SkeletonProps {
    className?: string
    height?: string | number
    width?: string | number
    border?: string
}

export const Skeleton = (props: SkeletonProps) => {
    const {
        className,
        width,
        border,
        height
    } = props

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border
    }

    return <div className={clsx(cls.Skeleton, {}, [className])} style={styles}></div>
}
