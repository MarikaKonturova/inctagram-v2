
import { format } from 'date-fns'
import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
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

    const headerText = format(date, 'LLLL Y')

    return (
        <div className={cls.header} {...rest} >
            <div>{headerText}</div>
            <div className={cls.buttonBox}>
                <button type="button" className={cls.button} style={{ color: fill }} onClick={decreaseMonth}>
                    {'<'}
                </button>
                <button type="button" className={cls.button} style={{ color: fill }} onClick={increaseMonth}>
                    {'>'}
                </button>
            </div>
        </div>
    )
}
