import * as yup from 'yup'

export type ValidateUnion =
  | 'userName'
  | 'email'
  | 'password'
  | 'confPassword'
  | 'recaptcha'

const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/
const specialCharactersRegExp = /^[A-Za-z0-9-_]+$/
const emailRegExp = /^[a-zA-Z0-9.!#$%&():;'"’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passwordValidMassage =
  'Password should include one uppercase Latin letter, one lowercase Latin letter, one number and one special character'

export const createValidationSchema = (arr: ValidateUnion[]): any => {
    const validationObject = arr.reduce((accum: any, type) => {
        switch (type) {
        case 'userName': {
            accum[type] = yup
                .string()
                .required('Field is required!')
                .matches(specialCharactersRegExp,
                    'Only Latin letters, numbers, dashes and underscores are allowed')
                .min(6, `${type} must be at least 6 characters`)
                .max(30, `${type} must be no more than 30 characters`)
            return accum
        }
        case 'email': {
            accum[type] = yup
                .string()
                .matches(emailRegExp, 'The email must match the format example@example.com')
                .required('Field is required!')
                .max(320)
            return accum
        }
        case 'password': {
            accum[type] = yup
                .string()
                .matches(passwordRegExp, {
                    message: passwordValidMassage
                })
                .min(6, `${type} must be at least 6 characters`)
                .max(20, `${type} must be no more than 20 characters`)
                .required('Field is required!')
            return accum
        }
        case 'recaptcha': {
            accum[type] = yup
                .string()
                .required('Please verify that you are not a robot.')
            return accum
        }
        default: {
            return accum
        }
        }
    }, {})

    return yup.object().shape({
        ...validationObject,
        confPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords does not match')
    })
}
