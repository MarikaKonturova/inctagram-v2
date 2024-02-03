import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { ProfileService, UsersService } from 'shared/api'
import { type UserError } from 'shared/types/auth'

import { useAuth } from '../../../auth'

export function useGetUserProfileData(userName: string) {
  return useQuery(['userByName', userName], async () => {
    return await UsersService.getUserByName(userName)
  })
}

/*export const useGetUserProfileData = (userName: string) => {
  const { setAuth } = useAuth()
  const onOpen = useSnackbar(state => state.onOpen)

  const { data: response, isLoading } = useQuery(
    ['userByName'],
    () => UsersService.getUserByName(userName),
    {
      onError: (error: AxiosError<UserError>) => {
        onOpen(error?.response?.data.messages[0].message || 'some error', 'danger', 'left')
      },
      onSuccess: ({ data }) => {
        setAuth(true)
      },
    }
  )

  return { isLoading, response }
}*/
