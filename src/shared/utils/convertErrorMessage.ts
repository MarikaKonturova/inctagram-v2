import { type AxiosError } from 'axios'

export const convertErrorMessage = (error: AxiosError<{ messages: Array<{ message: string, field: string }> }>) => {
    return error?.response?.data?.messages.reduce((accum, item) => {
        accum[item.field] = item.message
        return accum
    }, {} as Record<string, string>)
}
