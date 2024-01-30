import clsx from 'clsx'

import cls from './NumberBoard.module.scss'

interface NumberBoardProps {
  className?: string
  number: number | string
}

export const NumberBoard = ({ className, number }: NumberBoardProps) => {
  const classNames = clsx(cls.container, className)

  return (
    <div className={classNames}>
      <Number number={0} />
      <Separator />
      <Number number={0} />
      {number
        .toString()
        .split('')
        .map(n => (
          <>
            <Separator />
            <Number number={n} />
          </>
        ))}
    </div>
  )
}

const Number = ({ number }: NumberBoardProps) => {
  return <div className={cls.number}>{number}</div>
}
const Separator = () => {
  return <div className={cls.separator} />
}
