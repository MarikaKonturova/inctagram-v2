import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'
import { type UserError } from 'shared/types/auth'
import { useAuth } from '../../../auth'

export const useGetProfileData = () => {
    const { setAuth } = useAuth()
    const onOpen = useSnackbar((state) => state.onOpen)

    const { data: response, isLoading } = useQuery(['getProfileData'],
        () => ProfileService.getProfileData(), {
            onSuccess: ({ data }) => {
                console.log(data)
                setAuth(true)
            },
            onError: (error: AxiosError<UserError>) => {
                onOpen(error?.response?.data.messages[0].message || 'some error', 'danger', 'left')
            }
        }
    )
    return { isLoading, response }
}
