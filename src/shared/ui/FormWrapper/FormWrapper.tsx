import clsx from 'clsx'
import { type FC, type FormEvent, type PropsWithChildren, memo } from 'react'

import cls from './FormWrapper.module.scss'

interface FormWrapperProps {
  className?: string
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}

export const FormWrapper: FC<PropsWithChildren<FormWrapperProps>> = memo(
  ({ children, className, onSubmit }) => {
    return (
      <div className={cls.wrapper}>
        <form className={clsx(cls.form, className)} onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    )
  }
)
