import * as yup from 'yup'

export type ValidateUnion = 'userName' | 'firstName' | 'lastName'

const specialCharactersRegExp = /^[A-Za-z0-9-_]+$/

export const createValidationSchema = (arr: ValidateUnion[]): any => {
    const validationObject = arr.reduce((accum: any, type) => {
        switch (type) {
        case 'userName': {
            accum[type] = yup
                .string()
                .required('Field is required!')
                .matches(specialCharactersRegExp,
                    'Only Latin letters, numbers, dashes and underscores are allowed')
                .required('Password is required')
                .min(6, `${type} must be at least 6 characters`)
                .max(30, `${type} must be no more than 30 characters`)

            return accum
        }
        case 'firstName':
        case 'lastName':
        default: {
            return accum
        }
        }
    }, {})

    return yup.object().shape(validationObject)
}
