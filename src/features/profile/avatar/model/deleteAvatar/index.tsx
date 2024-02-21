import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { ProfileService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'
import { type UserError } from 'shared/types/auth'

export const useDeleteAvatar = (
  setIsOpen: (value: boolean) => void,
  setAvatar: (value: string | undefined) => void
) => {
  const onOpen = useSnackbar(state => state.onOpen)
  const { t } = useTranslation('common')
  const client = useQueryClient()

  const { isLoading, mutate: deleteAvatar } = useMutation(ProfileService.deleteAvatar, {
    mutationKey: ['deleteAvatar'],
    onError: (res: AxiosError<UserError>) => {
      onOpen(res?.response?.data.messages[0].message || `${t('generalError')}`, 'danger', 'left')
    },
    onSuccess: async () => {
      setIsOpen(false)
      setAvatar(undefined)
      onOpen(`${t('success')}`, 'success', 'left')
      await client.invalidateQueries(['getProfileData'])
    },
  })

  return {
    deleteAvatar,
    isLoading,
  }
}
