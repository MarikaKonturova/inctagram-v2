import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { ProfileService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'
import { type UserError } from 'shared/types/auth'

// import { useAuth } from '../../../features/auth'

export const useGetProfileData = () => {
  // const { setAuth } = useAuth()
  const onOpen = useSnackbar(state => state.onOpen)

  const { data: response, isLoading } = useQuery(
    ['getProfileData'],
    () => ProfileService.getProfileData(),
    {
      onError: (error: AxiosError<UserError>) => {
        onOpen(error?.response?.data.messages[0].message || 'some error', 'danger', 'left')
      },
      onSuccess: ({ data }) => {
        // setAuth(true)
      },
    }
  )

  return { isLoading, response }
}
