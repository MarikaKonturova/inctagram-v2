import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'

export const useUpdateProfileData = () => {
    const queryClient = useQueryClient()
    const onOpen = useSnackbar((state) => state.onOpen)

    const { mutate, data, error } = useMutation(ProfileService.updateProfileData, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['getProfileData'])
        },
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        }
    })

    return { mutate, data, error }
}
