import * as yup from 'yup'

export type ValidateUnion =
  | 'userName'
  | 'email'
  | 'password'
  | 'confPassword'
  | 'recaptcha'

const passwordRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/g

const passwordValidMassage =
  'Password should include one uppercase letter, one lowercase letter, one number and one special character'

export const createValidationSchema = (arr: ValidateUnion[]): any => {
    const validationObject = arr.reduce((accum: any, type) => {
        switch (type) {
        case 'userName': {
            accum[type] = yup
                .string()
                .min(6, `${type} must be at least 6 characters`)
                .max(30, `${type} must be no more than 30 characters`)
                .required('Field is required!')
            return accum
        }
        case 'email': {
            accum[type] = yup
                .string()
                .email('Email is not valid!')
                .required('Field is required!')
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
