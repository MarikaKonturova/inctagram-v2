import clsx from 'clsx'
import { format, getYear } from 'date-fns'
import { range } from 'lodash'
import { useState } from 'react'
import LibDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import IconCalendar from 'shared/assets/icons/light/calendar.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { CustomHeader } from './components/CustomHeader'
import cls from './DatePicker.module.scss'

interface DatePickerProps {
    value?: string
    onChange?: (value: string) => void
}
const years = range(1990, +getYear(new Date()) + 1, 1)
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
export const DatePicker = ({ value, onChange }: DatePickerProps) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const dateFromProps = value && new Date(Date.parse(value))
    const [startDate, setStartDate] = useState(dateFromProps || new Date())
    const onDateChange = (date: Date) => {
        setStartDate(date)
        onChange?.(format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"))
    }

    return (
        <>
            {' '}
            <div className={clsx(cls.calendar_icon_group)}>
                <LibDatePicker
          renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, ...rest }) => (
              <CustomHeader
              date={date}
              decreaseMonth={decreaseMonth}
              increaseMonth={increaseMonth}
              changeYear={changeYear}
              years={years}
              months={months}
              changeMonth={changeMonth}
              {...rest}
              />
          )}
          selected={startDate}
          onChange={onDateChange}
          calendarClassName={cls.day}
          dayClassName={(date) =>
              date.getMonth() === startDate.getMonth() ? clsx(cls.day, cls.dayWhite) : clsx(cls.day, cls.dayGray)
          }
          wrapperClassName={clsx(cls.calendar)}
                />
                <IconCalendar className={clsx(cls.icon)} fill={fill} />
            </div>
        </>
    )
}
