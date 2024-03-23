import { useRouter } from 'next/router'
import React, { type FC } from 'react'
import ArrowBackOutlineIcon from 'shared/assets/icons/outline/arrow-back-outline.svg'
import { BUTTON_VARIANTS } from 'shared/constants'
import { Button } from 'shared/ui'

import cls from './LegalContent.module.scss'

interface PropsType {
  content: string
  label: string
  title: string
}

export const LegalContent: FC<PropsType> = ({ content, label, title }) => {
  const router = useRouter()
  const goToBack = () => window.history.back()

  return (
    <div className={cls.rootContainer}>
      <Button
        className={cls.button}
        onClick={goToBack}
        theme={BUTTON_VARIANTS.CLEAR}
        type={'button'}
      >
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
