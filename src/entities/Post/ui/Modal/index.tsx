import React from 'react'
import ArrowForwardIcon from 'shared/assets/icons/general/arrow-forward.svg'
import CloseIcon from 'shared/assets/icons/general/close.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Modal } from 'shared/ui'

import cls from './styles.module.scss'

interface IProps {
  content: React.ReactNode
  handleClose: () => void
  id: number
  isOpen: boolean
}

export const PostModal: React.FC<IProps> = props => {
  const { content, handleClose, id, isOpen } = props
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

  return (
    <Modal id={id} isOpen={isOpen} onClose={handleClose} withHeader={false} withStyles={false}>
      <div className={cls.container}>
        <div className={cls.closeIconContainer} onClick={handleClose}>
          <CloseIcon fill={fill} />
        </div>
        {content}
        <div className={cls.nextIconContainer}>
          <ArrowForwardIcon fill={fill} />
        </div>
      </div>
    </Modal>
  )
}
