import clsx from 'clsx'
import Image, { type StaticImageData } from 'next/image'
import React from 'react'
import { Button } from 'shared/ui/Button/Button'

import cls from './Info.module.scss'

interface InfoPageProps {
  buttonText: string
  image: StaticImageData
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  text: string
  title: string
}

export function Info(props: InfoPageProps) {
  const { buttonText, image, onClick, text, title } = props

  return (
    <div className={clsx(cls.container)}>
      <h1 className={clsx(cls.title)}>{title}</h1>
      <p className={clsx(cls.text)}>{text}</p>
      <div className={clsx(cls.button)}>
        <Button block onClick={onClick}>
          {buttonText}
        </Button>
      </div>
      <div className={clsx(cls.imageContainer)}>
        <Image alt={'Img'} className={clsx(cls.image)} src={image} />
      </div>
    </div>
  )
}
