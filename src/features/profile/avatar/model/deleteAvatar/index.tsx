import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'
import { type UserError } from 'shared/types/auth'

export const useDeleteAvatar = (setIsOpen: any) => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const { mutate: deleteAvatar } = useMutation(ProfileService.deleteAvatar, {
        mutationKey: ['deleteAvatar'],
        onSuccess: (data) => {
            setIsOpen(false)
        },
        onError: (res: AxiosError<UserError>) => {
            onOpen(res?.response?.data.messages[0].message || 'some error', 'danger', 'left')
        }
    })
    return {
        deleteAvatar
    }
}
