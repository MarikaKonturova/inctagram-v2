import clsx from 'clsx'
import React from 'react'
import ArrowForwardBackIcon from 'shared/assets/icons/general/arrow-back.svg'
import ArrowForwardNextIcon from 'shared/assets/icons/general/arrow-forward.svg'
import CloseIcon from 'shared/assets/icons/general/close.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Modal } from 'shared/ui'

import cls from './PostModal.module.scss'

interface IProps {
  content: React.ReactNode
  firstElement?: boolean
  handleClick?: (direction: 'back' | 'next') => void
  handleClose: () => void
  id?: number
  isOpen: boolean
  isPublic?: boolean
  lastElement?: boolean
}

export const PostModal: React.FC<IProps> = props => {
  const {
    content,
    firstElement,
    handleClick,
    handleClose,
    id,
    isOpen,
    isPublic = false,
    lastElement,
  } = props
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

  const closeButton = (
    <div className={cls.closeIconContainer} onClick={handleClose}>
      <CloseIcon fill={'#ffffff'} />
    </div>
  )

  const previousArrowButton = !isPublic && (
    <button
      className={clsx(cls.backIconContainer, cls.iconContainer)}
      onClick={() => handleClick && handleClick('back')}
      style={{
        visibility: !firstElement ? 'visible' : 'hidden',
      }}
    >
      <ArrowForwardBackIcon fill={fill} />
    </button>
  )

  const nextArrowButton = !isPublic && (
    <button
      className={clsx(cls.nextIconContainer, cls.iconContainer)}
      onClick={() => handleClick && handleClick('next')}
      style={{
        visibility: !lastElement ? 'visible' : 'hidden',
      }}
    >
      <ArrowForwardNextIcon fill={fill} />
    </button>
  )

  return (
    <Modal id={id} isOpen={isOpen} onClose={handleClose} withHeader={false} withStyles={false}>
      <div className={cls.container}>
        {closeButton}
        {previousArrowButton}
        {content}
        {nextArrowButton}
      </div>
    </Modal>
  )
}
