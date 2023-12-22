import Image from 'next/image'
import React from 'react'
import cls from './styles.module.scss'
// TODO: export ?
const filters = {
    normal: { name: 'Normal', class: 'filter-normal' },
    amaro: { name: 'Amaro', class: 'filter-amaro' },
    ashby: { name: 'Ashby', class: 'filter-ashby' },
    brannan: { name: 'Brannan', class: 'filter-brannan' },
    1977: { name: '1977', class: 'filter-1977' },
    brooklyn: { name: 'Brooklyn', class: 'filter-brooklyn' },
    poprocket: { name: 'Poprocket', class: 'filter-poprocket' },
    moon: { name: 'Moon', class: 'filter-moon' },
    inkwell: { name: 'Inkwell', class: 'filter-inkwell' }
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
    filters.inkwell
]

interface IProps {
    image: string
    setImageFilter: (newFilter: string) => void
}

export const Filters = ({ image, setImageFilter }: IProps) => {
    return (
        <div className={cls.container}>
            {filtersArray.map((filter, index) =>
                <div key={index} className={cls.imageGroup} onClick={() => { setImageFilter(filter.class) }}>
                    <Image
                    style={{
                        objectFit: 'cover'
                    }}
                    width={108}
                    height={108}
                    src={image} alt={filter.name} className={filter.class} />
                    <p>{filter.name}</p>
                </div>

            )}
        </div>
    )
}
