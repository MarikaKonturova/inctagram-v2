import clsx from 'clsx'
import Image, { type StaticImageData } from 'next/image'
import React from 'react'
import { Button } from 'shared/ui/Button/Button'
import cls from './Info.module.scss'

interface InfoPageProps {
    title: string
    text: string
    image: StaticImageData
    buttonText: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function Info (props: InfoPageProps) {
    const {
        title,
        text,
        image,
        buttonText,
        onClick
    } = props
    return (
        <div className={clsx(cls.container)}>
            <h1 className={clsx(cls.title)}>{title}</h1>
            <p className={clsx(cls.text)}>{text}</p>
            <div className={clsx(cls.button)} ><Button block onClick={onClick}>{buttonText}</Button></div>
            <div className={clsx(cls.imageContainer)}><Image src={image} alt={'Img'} className={clsx(cls.image)}/></div>
        </div>
    )
}
