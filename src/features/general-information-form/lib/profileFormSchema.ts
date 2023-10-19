import * as yup from 'yup'

export type ValidateUnion = 'userName' | 'firstName' | 'lastName' | 'city' | 'aboutMe'

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
