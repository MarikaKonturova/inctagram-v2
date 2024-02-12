import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import CheckedIcon from 'shared/assets/icons/general/radio-button-checked.svg'
import UncheckedIcon from 'shared/assets/icons/general/radio-button-unchecked.svg'

import cls from './RadioButtons.module.scss'

interface OptionType {
  description: string
  disabled?: boolean
}

interface PropsType<T> {
  label: string
  options: Array<T & OptionType>
  selectHandler?: () => void
  selected?: T
  selectedValue?: T
  setSelected?: (selected: T) => void
}

export const RadioButtons = <T,>({
  label,
  options,
  selectHandler,
  selected,
  selectedValue,
  setSelected,
}: PropsType<T>) => (
  <RadioGroup
    onChange={setSelected}
    onClick={selectHandler}
    value={isEmpty(selected) ? selectedValue : selected}
  >
    <RadioGroup.Label className={cls.label}>{label}</RadioGroup.Label>
    <div className={cls.rootContainer}>
      {options.map(option => {
        return (
          <RadioGroup.Option className={clsx(cls.option)} key={option.description} value={option}>
            {state => (
              <div className={cls.optionContainer}>
                {state.checked ? <CheckedIcon /> : <UncheckedIcon />}
                <RadioGroup.Label as={'p'}>{option.description}</RadioGroup.Label>
              </div>
            )}
          </RadioGroup.Option>
        )
      })}
    </div>
  </RadioGroup>
)
