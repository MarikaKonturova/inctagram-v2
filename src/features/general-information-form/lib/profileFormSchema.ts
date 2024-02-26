import { parse } from 'date-fns'
import differenceInYears from 'date-fns/differenceInYears'
import { useTranslation } from 'next-i18next'
import * as yup from 'yup'

export type ValidateUnion = 'aboutMe' | 'dateOfBirth' | 'firstName' | 'lastName' | 'userName'

const specialCharactersRegExp = /^[A-Za-z0-9-_]+$/
const firstAndLastNameRegExp = /^(?! )(?![\s\S]* $)[A-Za-zА-Яа-я'-]+(?:\s[A-Za-zА-Яа-я'-]+)*$/

export const createValidationSchema = (arr: ValidateUnion[]): any => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('validation')
  const validationObject = arr.reduce((accum: any, type) => {
    switch (type) {
      case 'userName': {
        accum[type] = yup
          .string()
          .required(`${t('field_required')}`)
          .matches(specialCharactersRegExp, `${t('latin_letters_numbers_etc')}`)
          .min(6, `${t(`${type}`)} ${t('atLeast6Char')}`)
          .max(30, `${t(`${type}`)} ${t('noMoreThan30Char')}`)

        return accum
      }
      case 'firstName':
      case 'lastName': {
        accum[type] = yup
          .string()
          .required(`${t('field_required')}`)
          .matches(firstAndLastNameRegExp, `${t('firstAndLastNameVal')}`)
          .max(50, `${t('firstAndLastNameMax')}`)

        return accum
      }
      case 'aboutMe': {
        accum[type] = yup.string().max(200, `${t('aboutMeMax')}`)

        return accum
      }
      case 'dateOfBirth': {
        const currentDate = new Date()

        accum[type] = yup
          .date()
          .required(`${t('field_required')}`)
          .max(currentDate, `${t('dateOfBirthMax')}`)
          .test(
            'dob',
            `${t('ageMin')}`,
            value => differenceInYears(currentDate, new Date(value)) >= 13
          )

        return accum
      }
      default: {
        return accum
      }
    }
  }, {})

  return yup.object().shape(validationObject)
}
