import clsx from 'clsx'
import React from 'react'
import { NumberBoard, Title } from 'shared/ui'

import cls from './RegisteredUsers.module.scss'

interface RegisteredUsersProps {
  className?: string
  userCount?: number
}

export const RegisteredUsers = ({ className, userCount = 0 }: RegisteredUsersProps) => {
  const classNames = clsx(cls.container, className)

  const displayCount =
    userCount >= 1000000 ? userCount : '0'.repeat(6 - userCount.toString().length) + userCount

  const digits = displayCount.toString().split('')

  return (
    <div className={classNames}>
      <Title as={'h2'} className={cls.title}>
        Registered users:
      </Title>

      <NumberBoard.Root>
        {digits.map((n, i) => (
          <React.Fragment key={i}>
            {i !== 0 && <NumberBoard.Separator />}
            <NumberBoard.Number>{n}</NumberBoard.Number>
          </React.Fragment>
        ))}
      </NumberBoard.Root>
    </div>
  )
}
