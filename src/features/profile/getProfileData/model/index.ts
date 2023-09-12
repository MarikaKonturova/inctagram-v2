import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'
import { type UserError } from 'shared/types/auth'

export const useGetProfileData = () => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const { data: response, isLoading } = useQuery(['getProfileData'],
        () => ProfileService.getProfileData(), {
            onSuccess: ({ data }) => {
                console.log(data)
            },
            onError: (error: AxiosError<UserError>) => {
                onOpen(error?.response?.data.messages[0].message || 'some error', 'danger', 'left')
            }
        }
    )
    return { isLoading, response }
}
