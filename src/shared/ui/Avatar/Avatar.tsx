import clsx from 'clsx'
import { type CSSProperties, useMemo } from 'react'
import IconImg from 'shared/assets/icons/light/image.svg'
import userImg from 'shared/assets/images/user.png'
import cls from './Avatar.module.scss'
interface AvatarProps {
    className?: string
    src?: string
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

    return (
        <div className={clsx(cls.wrapperAvatar, [className])}>
            {src
                ? <img src={src || userImg.src}
                       className={cls.avatar}
                       style={styles}
                       alt={alt}
                />
                : <div className={cls.Avatar} style={styles}>
                    <IconImg className={clsx(cls.icon)}/>
                </div>}
        </div>
    )
}
