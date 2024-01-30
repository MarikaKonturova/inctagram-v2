import clsx from 'clsx'
import { NumberBoard, Title } from 'shared/ui'

import cls from './RegisteredUsers.module.scss'

interface RegisteredUsersProps {
  className?: string
  count?: number
}

export const RegisteredUsers = ({ className, count = 0 }: RegisteredUsersProps) => {
  const classNames = clsx(cls.container, className)

  return (
    <div className={classNames}>
      <Title as={'h2'} className={cls.title}>
        Registered users:
      </Title>
      <NumberBoard number={count} />
    </div>
  )
}
