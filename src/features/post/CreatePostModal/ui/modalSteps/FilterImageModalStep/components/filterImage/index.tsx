import React from 'react'
import cls from './styles.module.scss'
interface IProps {
    image: string
    imageFilter: string
}
export const FilterImage = ({ image, imageFilter }: IProps) => {
    return (
        <div className={cls.nextContainer} >
            <img src={image} style={{ width: '100%' }} className={imageFilter} id='modified-image'/>
        </div>
    )
}
