import { getMonth, getYear } from 'date-fns'
import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Select } from 'shared/ui/Select/Select'

import cls from './CustomHeader.module.scss'
export const capitalizeFirstLetter = (text: string) => {
  return text[0].toUpperCase() + text.slice(1)
}

interface CustomHeaderType {
  months: string[]
  years: number[]
}
export const CustomHeader = (
  props: Pick<
    ReactDatePickerCustomHeaderProps,
    'changeMonth' | 'changeYear' | 'date' | 'decreaseMonth' | 'increaseMonth'
  > &
    CustomHeaderType
) => {
  const {
    changeMonth,
    changeYear,
    date,
    decreaseMonth,
    increaseMonth,

    months,
    years,
    ...rest
  } = props
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const yearsString = years.map(year => year.toString())

  return (
    <div className={cls.header} {...rest}>
      <div className={cls.buttonBox}>
        <button
          className={cls.button}
          onClick={decreaseMonth}
          style={{ color: fill }}
          type={'button'}
        >
          {'<'}
        </button>
        <div className={cls.selectBox}>
          <Select
            className={cls.selectYears}
            onChange={value => {
              changeYear(+value)
            }}
            options={yearsString}
            value={getYear(date).toString()}
          />

          <Select
            className={cls.selectMonths}
            onChange={value => {
              changeMonth(months.indexOf(value))
            }}
            options={months}
            value={months[getMonth(date)]}
          />
        </div>

        <button
          className={cls.button}
          onClick={increaseMonth}
          style={{ color: fill }}
          type={'button'}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}
