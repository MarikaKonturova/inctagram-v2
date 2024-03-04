import clsx from 'clsx'
import { addDays, format, getYear } from 'date-fns'
import i18next from 'i18next'
import { range } from 'lodash'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import LibDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { type UseFormSetValue } from 'react-hook-form'
import IconCalendar from 'shared/assets/icons/light/calendar.svg'
import { AppRoutes } from 'shared/constants/path'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'

import cls from './DatePicker.module.scss'
import { CustomHeader } from './components/CustomHeader'

interface DatePickerProps {
  errorText?: string
  onChange?: (value: string) => void
  setValue: UseFormSetValue<any>
  value?: string
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
  'December',
]

const months_ru = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Может',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

export const DatePicker = ({ errorText, onChange, setValue, value }: DatePickerProps) => {
  const { theme } = useTheme()
  const { t } = useTranslation('privacy-policy')
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const startDate = (value && new Date(Date.parse(value))) || new Date()
  const onDateChange = (date: Date) => {
    setValue('dateOfBirth', format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    onChange?.(format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"))
  }

  return (
    <div>
      <div className={clsx(cls.calendarContainer, errorText && cls.calendarContainerError)}>
        <LibDatePicker
          calendarClassName={cls.day}
          calendarStartDay={1}
          className={clsx(cls.libCalendar, errorText && cls.libCalendarError)}
          dateFormat={'dd/MM/yyyy'}
          dayClassName={() => clsx(cls.day, cls.dayWhite)}
          maxDate={addDays(new Date(), 0)}
          onChange={onDateChange}
          onKeyDown={e => {
            e.preventDefault()
          }}
          renderCustomHeader={({ changeMonth, changeYear, date, decreaseMonth, increaseMonth }) => (
            <CustomHeader
              changeMonth={changeMonth}
              changeYear={changeYear}
              date={date}
              decreaseMonth={decreaseMonth}
              increaseMonth={increaseMonth}
              months={i18next.language === 'ru' ? months_ru : months}
              years={years}
            />
          )}
          selected={startDate}
        />
        <IconCalendar className={clsx(cls.icon)} fill={fill} />
      </div>
      {errorText && (
        <div className={cls.errorBlockInfo}>
          <p>{errorText}. </p>
          <Link className={cls.link} href={AppRoutes.AUTH.PRIVACY_POLICY}>
            {t('title')}
          </Link>
        </div>
      )}
    </div>
  )
}
