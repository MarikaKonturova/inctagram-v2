import clsx from 'clsx'
import { type CSSProperties } from 'react'

import cls from './Skeleton.module.scss'

interface SkeletonProps {
  border?: string
  className?: string
  height?: number | string
  width?: number | string
}

export const Skeleton = (props: SkeletonProps) => {
  const { border, className, height, width } = props

  const styles: CSSProperties = {
    borderRadius: border,
    height,
    width,
  }

  return <div className={clsx(cls.Skeleton, {}, [className])} style={styles}></div>
}
