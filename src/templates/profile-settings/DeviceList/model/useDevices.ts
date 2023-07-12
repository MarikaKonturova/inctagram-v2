import { useQuery } from '@tanstack/react-query'
import { type AxiosResponse } from 'axios'
import { deviceService } from 'shared/api/devices/deviceService'
import { type DeviceScheme } from 'shared/types/device'

export const useDevices = () => {
    return useQuery<AxiosResponse<DeviceScheme[]>>(['devices'], {
        queryFn: deviceService.getDevices,
        retry: false
    })
}
