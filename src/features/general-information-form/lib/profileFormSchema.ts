import * as yup from 'yup'

export type ValidateUnion = 'userName' | 'firstName' | 'lastName' | 'aboutMe'

const specialCharactersRegExp = /^[A-Za-z0-9-_]+$/
const firstAndLastNameRegExp = /^[A-Za-zА-Яа-я\s' -]+$/

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
        case 'firstName':
        case 'lastName':{
            accum[type] = yup
                .string()
                .required('Field is required!')
                .matches(firstAndLastNameRegExp,
                    'Only Latin and Cyrillic letters, spaces, apostrophes and dashes are allowed')
                .max(50, 'Maximum number of characters 50')
            return accum
        }
        case 'aboutMe': {
            accum[type] = yup.string().max(200, 'Maximum number of characters 200')
            return accum
        }
        default: {
            return accum
        }
        }
    }, {})

    return yup.object().shape(validationObject)
}
