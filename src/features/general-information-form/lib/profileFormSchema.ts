import * as yup from 'yup'

export type ValidateUnion = 'userName' | 'firstName' | 'lastName' | 'city' | 'aboutMe'

// eslint-disable-next-line no-useless-escape
const specialCharactersRegExp = /^[^~`!@#$%^&*()+=\[{}\|;:'",.<>\/?]+$/

export const createValidationSchema = (arr: ValidateUnion[]): any => {
    const validationObject = arr.reduce((accum: any, type) => {
        switch (type) {
        case 'userName': {
            accum[type] = yup
                .string()
                .matches(specialCharactersRegExp,
                    'Only Latin letters, numbers, dashes and underscores are allowed')
                .required('Password is required')
                .min(6, `${type} must be at least 6 characters`)
                .max(30, `${type} must be no more than 30 characters`)
                .required('Field is required!')

            return accum
        }
        case 'firstName':
        case 'lastName':
        case 'city':
        case 'aboutMe': {
            accum[type] = yup
                .string()
                .required('Field is required!')
            return accum
        }
        default: {
            return accum
        }
        }
    }, {})

    return yup.object().shape(validationObject)
}
