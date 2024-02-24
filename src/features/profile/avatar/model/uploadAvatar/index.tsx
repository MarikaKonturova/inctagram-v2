import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProfileService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'
import { type UserError } from 'shared/types/auth'
import { type AvatarPostModel } from 'shared/types/post'

export const useUploadAvatar = (
  setAvatar: (value: string) => void,
  setIsOpen: (value: boolean) => void
) => {
  const onOpen = useSnackbar(state => state.onOpen)
  const client = useQueryClient()
  const { t } = useTranslation('common')
  const [openButton, setOpenButton] = useState(false)

  const { mutate: uploadAvatar } = useMutation(ProfileService.uploadAvatar, {
    mutationKey: ['uploadAvatar'],
    onError: (res: AxiosError<UserError>) => {
      onOpen(res?.response?.data.messages[0].message || `${t('generalError')}`, 'danger', 'left')
    },
    onMutate: async () => {
      setOpenButton(true)
    },
    onSettled: () => {
      setOpenButton(false)
    },
    onSuccess: async (data: AxiosResponse<{ avatars: AvatarPostModel }>) => {
      setAvatar(data.data.avatars.medium.url)
      setIsOpen(false)
      onOpen(`${t('success')}`, 'success', 'left')
      await client.invalidateQueries(['getProfileData'])
    },
  })

  return {
    openButton,
    uploadAvatar,
  }
}
