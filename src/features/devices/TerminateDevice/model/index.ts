import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { deviceService } from 'shared/api/devices/deviceService'

export const useTerminateDevice = () => {
    const queryClient = useQueryClient()

    const { mutate: terminateDevice, isLoading: isDeviceLoading } = useMutation({
        mutationKey: ['terminate-session-by-id'],
        mutationFn: deviceService.terminateDevice,
        retry: false,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['devices'])
        }
    })

    const onTerminate = useCallback((deviceId: string) => {
        return () => { terminateDevice(deviceId) }
    }, [terminateDevice])

    return {
        isDeviceLoading,
        onTerminate
    }
}
