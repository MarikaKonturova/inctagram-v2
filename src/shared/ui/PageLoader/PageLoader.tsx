import clsx from 'clsx'
import React, { type FC } from 'react'
import { Loader } from 'shared/ui/Loader/Loader'
import cls from './PageLoader.module.scss'

interface PageLoaderProps {
    className?: string
}

export const PageLoader: FC<PageLoaderProps> = ({ className = '' }) => {
    return (
        <div className={clsx(cls.PageLoader, {}, [className])}>
            <Loader/>
        </div>
    )
}
