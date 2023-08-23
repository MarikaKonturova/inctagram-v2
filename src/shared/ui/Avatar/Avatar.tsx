import clsx from 'clsx'
import { type StaticImageData } from 'next/image'
import { type CSSProperties, useMemo } from 'react'
import IconImg from 'shared/assets/icons/light/image.svg'
import cls from './Avatar.module.scss'
interface AvatarProps {
    className?: string
    src?: string | StaticImageData
    size?: number
    alt?: string
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size,
        alt
    } = props

    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size || 100,
            height: size || 100
        }
    }, [size])
    console.log(src)
    return (
        <div className={clsx(cls.wrapperAvatar, [className])}>
            {src && <img src={src as string}
                         className={cls.Avatar}
                         style={styles}
                         alt={alt}
            />}
            {!src && <div className={cls.Avatar} style={styles}>
                <IconImg className={clsx(cls.icon)}/>
            </div>}

        </div>
    )
}
