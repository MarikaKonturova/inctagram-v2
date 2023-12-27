import { useRouter } from 'next/router'
import React, { type FC } from 'react'
import ArrowBackOutlineIcon from 'shared/assets/icons/outline/arrow-back-outline.svg'
import { AppRoutes } from 'shared/constants/path'
import { Button } from 'shared/ui'

import cls from './LegalContent.module.scss'

interface PropsType {
  content: string
  label: string
  title: string
}

export const LegalContent: FC<PropsType> = ({ content, label, title }) => {
  const router = useRouter()
  const goToBack = () => router.push(AppRoutes.AUTH.REGISTRATION)

  return (
    <div className={cls.rootContainer}>
      <Button className={cls.button} onClick={goToBack} theme={'clear'} type={'button'}>
        <ArrowBackOutlineIcon className={cls.icon} />
        {label}
      </Button>
      <div className={cls.main}>
        <h1 className={cls.title}>{title}</h1>
        <div className={cls.contentContainer}>
          <p className={cls.paragraph}>{content}</p>
        </div>
      </div>
    </div>
  )
}
