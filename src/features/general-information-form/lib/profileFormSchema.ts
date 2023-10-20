import * as yup from 'yup'

export type ValidateUnion = 'userName' | 'firstName' | 'lastName'

export const createValidationSchema = (arr: ValidateUnion[]): any => {
    const validationObject = arr.reduce((accum: any, type) => {
        switch (type) {
        case 'userName':
        case 'firstName':
        case 'lastName':
        default: {
            return accum
        }
        }
    }, {})

    return yup.object().shape(validationObject)
}
