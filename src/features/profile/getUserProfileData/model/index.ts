import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { UsersService } from 'shared/api'
import { type UserError } from 'shared/types/auth'

import { useAuth } from '../../../auth'

export function useGetUserProfileData(userName: string) {
  const { setAuth } = useAuth()
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
      onSuccess: () => {
        setAuth(true)
      },
    }
  )
}
