import * as yup from 'yup'

export type ValidateUnion = 'userName' | 'firstName' | 'lastName' | 'city' | 'aboutMe'

export const createValidationSchema = (arr: ValidateUnion[]): any => {
    const validationObject = arr.reduce((accum: any, type) => {
        switch (type) {
        case 'userName':
        case 'firstName':
        case 'lastName':{
            accum[type] = yup
                .string()
                .required('Field is required!')
                .max(50, 'Maximum number of characters 50')
            return accum
        }
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
