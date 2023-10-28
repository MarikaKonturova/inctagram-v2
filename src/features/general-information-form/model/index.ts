import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useMemo } from 'react'
import { type UseFormSetError } from 'react-hook-form'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'
import { type ProfileDataModel, type UserError } from 'shared/types/auth'
import { type ValidateUnion } from '../lib/profileFormSchema'

export const useUpdateProfileData = (setError: UseFormSetError<ProfileDataModel>) => {
    const queryClient = useQueryClient()
    const onOpen = useSnackbar((state) => state.onOpen)

    const { mutate, data, error } =
        useMutation<any, AxiosError<UserError>, Omit<ProfileDataModel, 'id' | 'avatars'>, unknown>(
            ProfileService.updateProfileData, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(['getProfileData'])
                },
                onError: (err) => {
                    const error = err.response?.data.messages[0]

                    setError(error?.field as ValidateUnion, error || {})
                    onOpen('Error', 'danger', 'left')
                }
            })

    const responseError = useMemo(() => {
        return error?.response?.data?.messages.reduce((accum, item) => {
            accum[item.field] = item.message
            return accum
        }, {} as Record<string, string>)
    }, [error])

    return { mutate, data, responseError }
}
