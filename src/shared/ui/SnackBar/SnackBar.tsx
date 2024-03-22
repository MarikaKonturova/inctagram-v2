import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { BUTTON_VARIANTS } from 'shared/constants'
import { Button, Portal } from 'shared/ui'

import { useSnackbar } from '../../hooks/useSnackbar'
import cls from './SnackBar.module.scss'

interface SnackBarProps {
  className?: string
}

export const SnackBar = (props: SnackBarProps) => {
  const timeout = 3000
  const isOpen = useSnackbar(state => state.isOpen)
  const message = useSnackbar(state => state.message)
  const type = useSnackbar(state => state.type)
  const position = useSnackbar(state => state.position)
  const onClose = useSnackbar(state => state.onClose)
  const [close, setClose] = useState(false)

  let TIMER: ReturnType<typeof setTimeout>

  useEffect(() => {
    if (isOpen) {
      handleTimeout()
    }

    return () => {
      clearTimeout(TIMER)
      setClose(false)
    }
  }, [isOpen])

  const handleClose = () => {
    clearTimeout(TIMER)
    setClose(true)
    setTimeout(() => {
      setClose(false)
      onClose()
    }, 400)
  }
  const handleTimeout = () => {
    TIMER = setTimeout(() => {
      handleClose()
    }, timeout)
  }

  return (
    <Portal>
      {isOpen && (
        <div className={clsx(cls.container, cls[type], cls[position], { [cls.close]: close })}>
          <p>{message}</p>
          <Button className={clsx(cls.button)} onClick={handleClose} theme={BUTTON_VARIANTS.CLEAR}>
            X
          </Button>
        </div>
      )}
    </Portal>
  )
}
