import clsx from 'clsx'
import { type CSSProperties, useMemo } from 'react'
import IconImg from 'shared/assets/icons/light/image.svg'
import userImg from 'shared/assets/images/user.png'

import cls from './Avatar.module.scss'
interface AvatarProps {
  alt?: string
  className?: string
  size?: number
  src?: string
}

export const Avatar = (props: AvatarProps) => {
  const { alt, className, size, src } = props

  const styles = useMemo<CSSProperties>(() => {
    return {
      height: size || 100,
      width: size || 100,
    }
  }, [size])

  return (
    <div className={clsx(cls.wrapperAvatar, [className])}>
      {src ? (
        <img alt={alt} className={cls.avatar} src={src || userImg.src} style={styles} />
      ) : (
        <div className={cls.Avatar} style={styles}>
          <IconImg className={clsx(cls.icon)} />
        </div>
      )}
    </div>
  )
}
