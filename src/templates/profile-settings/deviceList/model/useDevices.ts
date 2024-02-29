import { useQuery } from '@tanstack/react-query'
import { type AxiosResponse } from 'axios'
import { DeviceService } from 'shared/api'
import { type AllDevicesScheme } from 'shared/types/device'

export const useDevices = () => {
  return useQuery<AxiosResponse<AllDevicesScheme>>(['devices'], {
    queryFn: DeviceService.getDevices,
    retry: false,
  })
}
