import clsx from 'clsx'
import { PropsWithChildren } from 'react'

import cls from './NumberBoard.module.scss'

interface RootProps extends PropsWithChildren {
  className?: string
}

const Root = ({ children, className }: RootProps) => {
  const classNames = clsx(cls.container, className)

  return <div className={classNames}>{children}</div>
}

interface NumberProps extends PropsWithChildren {
  className?: string
}

const Number = ({ children, className }: NumberProps) => {
  const classNames = clsx(cls.number, className)

  return <div className={classNames}>{children}</div>
}
const Separator = () => {
  return <div className={cls.separator} />
}

export const NumberBoard = { Number, Root, Separator }
