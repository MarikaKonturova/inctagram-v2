import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'
import { type UserError } from 'shared/types/auth'
import { type AvatarPostModel } from 'shared/types/post'

export const useUploadAvatar = (
  setAvatar: (value: string) => void,
  setIsOpen: (value: boolean) => void
) => {
  const onOpen = useSnackbar(state => state.onOpen)
  const client = useQueryClient()

  const { mutate: uploadAvatar } = useMutation(ProfileService.uploadAvatar, {
    mutationKey: ['uploadAvatar'],
    onError: (res: AxiosError<UserError>) => {
      onOpen(res?.response?.data.messages[0].message || 'some error', 'danger', 'left')
    },
    onSuccess: async (data: AxiosResponse<{ avatars: AvatarPostModel }>) => {
      setAvatar(data.data.avatars.medium.url)
      setIsOpen(false)
      onOpen('Your photo has been updated successfully', 'success', 'left')
      await client.invalidateQueries(['getProfileData'])
    },
  })

  return {
    uploadAvatar,
  }
}
