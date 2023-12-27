import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import React, { type SelectHTMLAttributes, forwardRef, memo } from 'react'
import ArrowDown from 'shared/assets/icons/general/arrow-Down.svg'
import ArrowUp from 'shared/assets/icons/general/arrow-Up.svg'

import cls from './Select.module.scss'

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLInputElement>, 'onChange'> {
  disabled?: boolean
  label?: string
  onChange: (value: string) => void
  options: string[]
  value: string
}

export const Select = memo(
  forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
    const { disabled, label, onChange, options, value } = props

    return (
      <Listbox onChange={onChange} ref={ref} value={value || ''}>
        {({ open, value }) => (
          <div className={`${cls.dropDownContainer} ${props.className ?? ''}`}>
            <label className={cls.labelClassName}>{label}</label>
            <Listbox.Button
              className={clsx(cls.dropDownHeader, {
                [cls.active]: open,
                [cls.disabled]: disabled,
              })}
              type={'button'}
            >
              {value}
              {open ? (
                <ArrowUp className={clsx(cls.Icon)} />
              ) : (
                <ArrowDown className={clsx(cls.icon)} />
              )}
            </Listbox.Button>

            <Listbox.Options className={clsx(cls.dropDownList)}>
              {options.map(option => (
                <Listbox.Option
                  className={({ active }) => clsx(cls.listItem, active && cls.activeListItem)}
                  key={option}
                  value={option}
                >
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    )
  })
)
