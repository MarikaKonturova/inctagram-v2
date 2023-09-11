import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'

export const useGetProfileData = () => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const { data: response, isLoading } = useQuery(['getProfileData'],
        () => ProfileService.getProfileData(), {
            onSuccess: ({ data }) => {
                console.log(data)
            },
            onError: (error: AxiosError<{ message: string }>) => {
                onOpen(error.message, 'danger', 'left')
            }
        }
    )
    return { isLoading, response }
}
