import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { type FC } from 'react'
import CheckedIcon from 'shared/assets/icons/general/radio-button-checked.svg'
import UncheckedIcon from 'shared/assets/icons/general/radio-button-unchecked.svg'
import cls from './RadioButtons.module.scss'

export interface OptionType {
    description: string
    disabled?: boolean
}

interface PropsType {
    label: string
    options: OptionType[]
    selectedValue?: OptionType
    selected?: OptionType
    setSelected?: (selected: OptionType) => void
}

export const RadioButtons: FC<PropsType> = ({ label, options, selectedValue, selected, setSelected }) => (
    <RadioGroup value={isEmpty(selected) ? selectedValue : selected} onChange={setSelected}>
        <RadioGroup.Label className={cls.label}>{label}</RadioGroup.Label>
        <div className={cls.rootContainer}>
            {options.map((option) => {
                const iconDisabledMode = { [cls.iconDisabled]: option.disabled }

                return (
                    <RadioGroup.Option
                        key={option.description}
                        value={option}
                        className={clsx(cls.option, { [cls.disabled]: option.disabled })}
                        disabled={option.disabled}
                    >
                        {state => (
                            <div className={cls.optionContainer}>
                                {state.checked
                                    ? <CheckedIcon className={clsx(iconDisabledMode)} />
                                    : <UncheckedIcon className={clsx(iconDisabledMode)} />}
                                <RadioGroup.Label as="p">
                                    {option.description}
                                </RadioGroup.Label>
                            </div>
                        )}
                    </RadioGroup.Option>
                )
            })}
        </div>
    </RadioGroup>
)
