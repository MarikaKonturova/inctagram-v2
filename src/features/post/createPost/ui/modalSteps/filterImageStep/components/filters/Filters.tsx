import clsx from 'clsx'
import { IImage, useUploadImagePostStore } from 'features/post/createPost/model'
import { SwiperClass } from 'swiper/react'
import { shallow } from 'zustand/shallow'

import { getModifiedImageSrc } from '../../lib/getModifiedImageSrc '
import cls from './Filters.module.scss'

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
  className?: string
  currentIndex: number
  image: IImage
  imageId: string
  swiperElement: SwiperClass
}

export const Filters = ({ className, currentIndex, image, imageId, swiperElement }: IProps) => {
  const { setConvertedImages, setFilter } = useUploadImagePostStore(
    ({ setConvertedImages, setFilter }) => ({ setConvertedImages, setFilter }),
    shallow
  )

  const onClickHandler = async (filter: string) => {
    if (swiperElement) {
      setFilter({ filter, imageId })

      const currentImg = swiperElement.slides[currentIndex].children[0]

      const modifiedSrc = await getModifiedImageSrc(currentImg as HTMLImageElement)

      const convertedImage = {
        [imageId]: { src: modifiedSrc },
      }

      setConvertedImages(convertedImage)
    }
  }

  return (
    <div className={clsx(cls.container, className)}>
      {filtersArray.map((filter, index) => (
        <div
          className={cls.imageGroup}
          key={index}
          onClick={() => {
            onClickHandler(filter.class)
          }}
        >
          <img
            alt={filter.name}
            className={filter.class}
            height={108}
            src={image.croppedSrc}
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
