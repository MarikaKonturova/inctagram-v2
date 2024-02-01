import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { DeviceService } from 'shared/api'

export const useTerminateAllDevices = () => {
  const queryClient = useQueryClient()

  const { isLoading: isDevicesLoading, mutate: terminateAllDevices } = useMutation({
    mutationFn: DeviceService.terminateAllDevices,
    mutationKey: ['terminate-all-session'],
    onSuccess: async () => {
      await queryClient.invalidateQueries(['devices'])
    },
    retry: false,
  })

  const onAllTerminate = useCallback(() => {
    terminateAllDevices()
  }, [terminateAllDevices])

  return {
    isDevicesLoading,
    onAllTerminate,
  }
}
