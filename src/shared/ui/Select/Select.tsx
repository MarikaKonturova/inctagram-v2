import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import React, { type SelectHTMLAttributes, forwardRef, memo } from 'react'
import ArrowDown from 'shared/assets/icons/general/arrow-Down.svg'
import ArrowUp from 'shared/assets/icons/general/arrow-Up.svg'
import cls from './Select.module.scss'

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLInputElement>, 'onChange'> {
    options: string[]
    disabled?: boolean
    label?: string
    value: string
    onChange: (value: string) => void
}

export const Select = memo(forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
    const {
        options,
        label,
        disabled,
        value,
        onChange
    } = props

    return (
        <Listbox ref={ref} value={value || ''} onChange={onChange}>
            {({ open, value }) => (
                <div className={`${cls.dropDownContainer} ${props.className ?? ''}`}>
                    <label className={cls.labelClassName}>{label}</label>
                    <Listbox.Button
                        type='button'
                        className={clsx(cls.dropDownHeader, {
                            [cls.active]: open,
                            [cls.disabled]: disabled
                        })}
                    >
                        {value}
                        {open ? <ArrowUp className={clsx(cls.Icon)} /> : <ArrowDown className={clsx(cls.icon)} />}
                    </Listbox.Button>

                    <Listbox.Options className={clsx(cls.dropDownList)}>
                        {options.map(option => (
                            <Listbox.Option
                                value={option}
                                className={clsx(cls.listItem)}
                                key={option}>
                                {option}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            )}
        </Listbox>
    )
}))
