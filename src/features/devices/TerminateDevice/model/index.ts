import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { DeviceService } from 'shared/api'

export const useTerminateDevice = () => {
    const queryClient = useQueryClient()

    const { mutate: terminateDevice, isLoading: isDeviceLoading } = useMutation({
        mutationKey: ['terminate-session-by-id'],
        mutationFn: DeviceService.terminateDevice,
        retry: false,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['devices'])
        }
    })

    const onTerminate = useCallback(
        (deviceId: string) => {
            return () => {
                terminateDevice(deviceId)
            }
        },
        [terminateDevice]
    )

    return {
        isDeviceLoading,
        onTerminate
    }
}
