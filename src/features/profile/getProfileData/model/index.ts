import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'widgets/SnackBar/model/store/snackbarStore'
import { profileService } from 'shared/api/profile'
import { useAuth } from '../../../auth'

export const useGetProfileData = () => {
    const { setAuth } = useAuth()
    const onOpen = useSnackbar((state) => state.onOpen)
    const { data: response, isLoading } = useQuery(['getProfileData'],
        () => profileService.getProfileData(), {
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
