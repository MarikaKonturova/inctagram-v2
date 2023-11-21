
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
    years: number[]
    months: string[]
}
export const CustomHeader = (props: Pick<ReactDatePickerCustomHeaderProps,
'date' |
'decreaseMonth' |
'increaseMonth' |
'changeMonth' |
'changeYear'
> & CustomHeaderType) => {
    const {
        date,
        decreaseMonth,
        increaseMonth,
        changeMonth,
        changeYear,

        years,
        months,
        ...rest
    } = props
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const yearsString = years.map(year => year.toString())
    return (
        <div className={cls.header} {...rest} >
            <div className={cls.buttonBox}>
                <button type="button" className={cls.button} style={{ color: fill }} onClick={decreaseMonth}>
                    {'<'}
                </button>
                <div className={cls.selectBox}>
                    <Select
                     className={cls.selectYears}
                     value={getYear(date).toString()}
                     onChange={(value) => { changeYear(+value) }}
                     options={yearsString}
                    />

                    <Select
                     className={cls.selectMonths}
                     value={months[getMonth(date)]}
                     onChange={(value) => { changeMonth(months.indexOf(value)) }}
                     options={months}
                    />

                </div>

                <button type="button" className={cls.button} style={{ color: fill }} onClick={increaseMonth}>
                    {'>'}
                </button>
            </div>
        </div>
    )
}
