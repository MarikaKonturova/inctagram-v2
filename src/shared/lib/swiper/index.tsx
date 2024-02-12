/* eslint-disable import/extensions */

import { ReactNode } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'

import cls from './styles.module.scss'

interface IProps {
  children: ReactNode
}
export const SwiperApp = ({ children }: IProps) => {
  return (
    <Swiper
      allowTouchMove={false}
      className={cls.swiper}
      modules={[Navigation, Pagination]}
      navigation
      pagination
    >
      {children}
    </Swiper>
  )
}
