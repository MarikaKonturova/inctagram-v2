import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { UsersService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'
import { type UserError } from 'shared/types/auth'

export function useGetUserProfileData(userName: string) {
  const onOpen = useSnackbar(state => state.onOpen)

  return useQuery(
    ['userByName', userName],
    async () => {
      const { data } = await UsersService.getUserByName(userName)

      return { data }
    },
    {
      onError: (error: AxiosError<UserError>) => {
        onOpen(error?.response?.data.messages[0].message || 'some error', 'danger', 'left')
      },
    }
  )
}
