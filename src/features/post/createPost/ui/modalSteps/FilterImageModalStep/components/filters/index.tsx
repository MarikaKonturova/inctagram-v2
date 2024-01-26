import Image from 'next/image'
import React from 'react'

import cls from './styles.module.scss'
// TODO: export ?
const filters = {
  1977: { class: 'filter-1977', name: '1977' },
  amaro: { class: 'filter-amaro', name: 'Amaro' },
  ashby: { class: 'filter-ashby', name: 'Ashby' },
  brannan: { class: 'filter-brannan', name: 'Brannan' },
  brooklyn: { class: 'filter-brooklyn', name: 'Brooklyn' },
  inkwell: { class: 'filter-inkwell', name: 'Inkwell' },
  moon: { class: 'filter-moon', name: 'Moon' },
  normal: { class: 'filter-normal', name: 'Normal' },
  poprocket: { class: 'filter-poprocket', name: 'Poprocket' },
} as const

const filtersArray = [
  filters.normal,
  filters.amaro,
  filters.ashby,
  filters.brannan,
  filters['1977'],
  filters.brooklyn,
  filters.poprocket,
  filters.moon,
  filters.inkwell,
]

interface IProps {
  image: string
  setImageFilter: (newFilter: string) => void
}

export const Filters = ({ image, setImageFilter }: IProps) => {
  return (
    <div className={cls.container}>
      {filtersArray.map((filter, index) => (
        <div
          className={cls.imageGroup}
          key={index}
          onClick={() => {
            setImageFilter(filter.class)
          }}
        >
          <Image
            alt={filter.name}
            className={filter.class}
            height={108}
            src={image}
            style={{
              objectFit: 'cover',
            }}
            width={108}
          />
          <p>{filter.name}</p>
        </div>
      ))}
    </div>
  )
}
