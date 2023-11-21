import clsx from 'clsx'
import { addDays, format, getYear } from 'date-fns'
import { range } from 'lodash'
import Link from 'next/link'
import LibDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { type UseFormSetValue } from 'react-hook-form'
import { type GeneralInformationFormValues } from 'features/general-information-form/lib/useValidationForm'
import IconCalendar from 'shared/assets/icons/light/calendar.svg'
import { AppRoutes } from 'shared/constants/path'
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
const years = range(+getYear(new Date()) - 100, +getYear(new Date()) + 1, 1)
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
        <div className={clsx(cls.calendarContainer, errorText && cls.calendarContainerError)}>
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
            className={clsx(cls.libCalendar, errorText && cls.libCalendarError)}
            calendarStartDay={1}
            calendarClassName={cls.day}
            dayClassName={ () => clsx(cls.day, cls.dayWhite)}
            onKeyDown={(e) => { e.preventDefault() }}
            maxDate={addDays(new Date(), 0)}
            dateFormat={'dd/MM/yyyy'}
            />
            <IconCalendar className={clsx(cls.icon)} fill={fill}/>
        </div>
        {errorText && <div className={cls.errorBlockInfo}>
            <p>{errorText}. </p>
            <Link href={AppRoutes.AUTH.PRIVACY_POLICY} className={cls.link}>
                Privacy Policy
            </Link>
        </div>}

    </div>

    )
}
