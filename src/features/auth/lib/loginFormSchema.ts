import { useTranslation } from 'next-i18next'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup

export type ValidateUnion = 'confPassword' | 'email' | 'password' | 'recaptcha' | 'userName'

const passwordRegExp =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/
const specialCharactersRegExp = /^[A-Za-z0-9-_]+$/
// eslint-disable-next-line max-len
const emailRegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/

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
      case 'email': {
        accum[type] = yup
          .string()
          .matches(emailRegExp, `${t('email_val')} example@example.com`)
          .required(`${t('field_required')}`)
          .max(320, `${t('email_max')}`)

        return accum
      }
      case 'password': {
        accum[type] = yup
          .string()
          .matches(passwordRegExp, {
            message: `${t('passwordValidMessage')}`,
          })
          .minLowercase(1)
          .minUppercase(1)
          .min(6, `${t(`${type}`)} ${t('atLeast6CharPass')}`)
          .max(20, `${t(`${type}`)} ${t('noMoreThan30CharPass')}`)
          .required(`${t('field_required')}`)

        return accum
      }
      case 'recaptcha': {
        accum[type] = yup.string().required(`${t('recaptcha_msg')}`)

        return accum
      }
      default: {
        return accum
      }
    }
  }, {})

  return yup.object().shape({
    ...validationObject,
    confPassword: yup.string().oneOf([yup.ref('password')], `${t('passwords_notMatch')}`),
  })
}
