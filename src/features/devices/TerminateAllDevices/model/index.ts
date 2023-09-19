import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { DeviceService } from 'shared/api'

export const useTerminateAllDevices = () => {
    const queryClient = useQueryClient()

    const { mutate: terminateAllDevices, isLoading: isDevicesLoading } = useMutation({
        mutationKey: ['terminate-all-session'],
        mutationFn: DeviceService.terminateAllDevices,
        retry: false,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['devices'])
        }
    })

    const onAllTerminate = useCallback(() => {
        terminateAllDevices()
    }, [terminateAllDevices])

    return {
        isDevicesLoading,
        onAllTerminate
    }
}
