import { useMutation } from '@tanstack/react-query'
import { type AxiosResponse, type AxiosError } from 'axios'

import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'
import { type UserError } from 'shared/types/auth'
import { type AvatarPostModel } from 'shared/types/post'

export const useUploadAvatar = (setAvatar: (value: string) => void, setIsOpen: (value: boolean) => void) => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const { mutate: uploadAvatar } = useMutation(ProfileService.uploadAvatar, {
        mutationKey: ['uploadAvatar'],
        onSuccess: (data: AxiosResponse<{ avatars: AvatarPostModel }>) => {
            setAvatar(data.data.avatars.medium.url)
            setIsOpen(false)
            onOpen('Your photo has been updated successfully', 'success', 'left')
        },
        onError: (res: AxiosError<UserError>) => {
            onOpen(res?.response?.data.messages[0].message || 'some error', 'danger', 'left')
        }
    })
    return {
        uploadAvatar
    }
}
