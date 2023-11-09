import clsx from 'clsx'
import { format, getYear } from 'date-fns'
import { range } from 'lodash'
import LibDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { type UseFormSetValue } from 'react-hook-form'
import { type GeneralInformationFormValues } from 'features/general-information-form/lib/useValidationForm'
import IconCalendar from 'shared/assets/icons/light/calendar.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { CustomHeader } from './components/CustomHeader'
import cls from './DatePicker.module.scss'

interface DatePickerProps {
    value?: string
    onChange?: (value: string) => void
    errorText?: string
    setValue: UseFormSetValue<GeneralInformationFormValues>
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
export const DatePicker = ({ value, onChange, errorText, setValue }: DatePickerProps) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const startDate = (value && new Date(Date.parse(value))) || new Date()
    const onDateChange = (date: Date) => {
        setValue('dateOfBirth', format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
            { shouldValidate: true, shouldTouch: true, shouldDirty: true })
        onChange?.(format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"))
    }

    return (<div>
        <div className={clsx(cls.calendar_icon_group)}>
            <LibDatePicker
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,

                increaseMonth
            }) => (
                <CustomHeader
                        date={date}

                        decreaseMonth={decreaseMonth}
                        increaseMonth={increaseMonth}
                        changeYear={changeYear}
                        years={years}
                        months={months}
                        changeMonth={changeMonth}
                />
            )}
            selected={startDate}
            onChange={onDateChange}
            calendarStartDay={1}
            calendarClassName={cls.day}
            dayClassName={(date) => date.getMonth() === startDate.getMonth()
                ? clsx(cls.day, cls.dayWhite)
                : clsx(cls.day, cls.dayGray) }
            wrapperClassName ={clsx(cls.calendar)}
            onKeyDown={(e) => { e.preventDefault() }}
            /* maxDate={addDays(new Date(), 0)} */
            dateFormat={'dd/MM/yyyy'}
            />
            <IconCalendar className={clsx(cls.icon)} fill={fill}/>
        </div>
        <p style={{ color: 'red' }}>{errorText}</p>
    </div>

    )
}
