import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'
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
            onError: (error: AxiosError<{ message: string }>) => {
                onOpen(error.message, 'danger', 'left')
            }
        }
    )
    return { isLoading, response }
}
