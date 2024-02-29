import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { type UseFormSetError } from 'react-hook-form'
import { ProfileService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'
import { type ProfileDataModel, type UserError } from 'shared/types/auth'

import { type ValidateUnion } from '../lib/profileFormSchema'

export const useUpdateProfileData = (setError: UseFormSetError<ProfileDataModel>) => {
  const queryClient = useQueryClient()
  const onOpen = useSnackbar(state => state.onOpen)

  const { t } = useTranslation('validation')

  const { data, error, mutate, variables } = useMutation<
    any,
    AxiosError<UserError>,
    Omit<ProfileDataModel, 'avatars' | 'id'>,
    unknown
  >(ProfileService.updateProfileData, {
    onError: err => {
      const error = err.response?.data.messages[0]

      const localizedError =
        error?.field === 'userName'
          ? {
              ...error,
              message: t('profileSettingsErrorBackUserName', {
                userName: variables?.userName || '',
              }),
            }
          : error

      setError(error?.field as ValidateUnion, localizedError || {})
      onOpen('Error', 'danger', 'left')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['getProfileData'])
      onOpen('Your settings are saved', 'success', 'left')
    },
  })

  const responseError = useMemo(() => {
    return error?.response?.data?.messages.reduce(
      (accum, item) => {
        accum[item.field] = item.message

        return accum
      },
      {} as Record<string, string>
    )
  }, [error])

  return { data, mutate, responseError }
}
