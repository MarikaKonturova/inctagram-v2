/* eslint-disable import/extensions */

import clsx from 'clsx'
import { ReactNode } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'

import cls from './styles.module.scss'

interface IProps {
  children: ReactNode
  className?: string
}
export const SwiperApp = ({ children, className, ...rest }: IProps & any) => {
  return (
    <Swiper
      allowTouchMove={false}
      className={clsx(cls.swiper, [className])}
      modules={[Navigation, Pagination]}
      navigation
      pagination
      {...rest}
    >
      {children}
    </Swiper>
  )
}
