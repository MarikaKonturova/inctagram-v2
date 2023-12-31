import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'
import { type UserError } from 'shared/types/auth'

export const useDeleteAvatar = (setIsOpen: (value: boolean) => void,
    setAvatar: (value: string | undefined) => void) => {
    const onOpen = useSnackbar((state) => state.onOpen)
    const client = useQueryClient()

    const { mutate: deleteAvatar, isLoading } = useMutation(ProfileService.deleteAvatar, {
        mutationKey: ['deleteAvatar'],
        onSuccess: async () => {
            setIsOpen(false)
            setAvatar(undefined)
            onOpen('Your photo has been deleted successfully', 'success', 'left')
            await client.invalidateQueries(['getProfileData'])
        },
        onError: (res: AxiosError<UserError>) => {
            onOpen(res?.response?.data.messages[0].message || 'some error', 'danger', 'left')
        }
    })
    return {
        deleteAvatar,
        isLoading
    }
}
