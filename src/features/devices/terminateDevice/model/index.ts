import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { DeviceService } from 'shared/api'

export const useTerminateDevice = () => {
  const queryClient = useQueryClient()

  const { isLoading: isDeviceLoading, mutate: terminateDevice } = useMutation({
    mutationFn: DeviceService.terminateDevice,
    mutationKey: ['terminate-session-by-id'],
    onSuccess: async () => {
      await queryClient.invalidateQueries(['devices'])
    },
    retry: false,
  })

  const onTerminate = useCallback(
    (deviceId: string) => {
      terminateDevice(deviceId)
    },
    [terminateDevice]
  )

  return {
    isDeviceLoading,
    onTerminate,
  }
}
