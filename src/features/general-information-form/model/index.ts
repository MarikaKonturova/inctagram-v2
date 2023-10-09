import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useMemo } from 'react'
import { useSnackbar } from 'features/common'
import { ProfileService } from 'shared/api'
import { type ProfileDataModel, type UserError } from 'shared/types/auth'

export const useUpdateProfileData = () => {
    const queryClient = useQueryClient()
    const onOpen = useSnackbar((state) => state.onOpen)

    const { mutate, data, error } =
        useMutation<any, AxiosError<UserError>, Omit<ProfileDataModel, 'id' | 'avatars'>, unknown>(
            ProfileService.updateProfileData, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(['getProfileData'])
                },
                onError: () => {
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
