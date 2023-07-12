import clsx from 'clsx'
import React, { type SelectHTMLAttributes, useState } from 'react'
import ArrowDown from 'shared/assets/icons/general/arrow-Down.svg'
import ArrowUp from 'shared/assets/icons/general/arrow-Up.svg'
import cls from './Select.module.scss'

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
    options: string[]
    selectedItem?: string
    disabled?: boolean
}
export const Select = (props: SelectProps) => {
    const {
        options,
        selectedItem,
        disabled,
        ...otherProps
    } = props
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(selectedItem)

    const toggling = () => { setIsOpen(!isOpen) }

    const onOptionClicked = (value: string) => () => {
        setSelectedOption(value)
        setIsOpen(false)
    }

    const mods = {
        [cls.active]: isOpen,
        [cls.disabled]: disabled
    }

    return (
        <div className={clsx(cls.DropDownContainer)}>
            <button type='button' className={clsx(cls.DropDownHeader, mods)} disabled={disabled} onClick={toggling} >
                {selectedOption || options[0]}
                {isOpen ? <ArrowUp className={clsx(cls.Icon)} /> : <ArrowDown className={clsx(cls.Icon)} />}
            </button>
            {isOpen && (
                <div>
                    <div className={clsx(cls.DropDownList)}>
                        {options.map(option => (
                            <li className={clsx(cls.ListItem)} onClick={onOptionClicked(option)} key={Math.random()}>
                                {option}
                            </li>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
