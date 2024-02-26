import { type AxiosError } from 'axios'

export const convertErrorMessage = (
  error: AxiosError<{ messages: Array<{ field: string; message: string }> }>
) => {
  return error?.response?.data?.messages.reduce(
    (accum, item) => {
      accum[item.field] = item.message

      return accum
    },
    {} as Record<string, string>
  )
}
