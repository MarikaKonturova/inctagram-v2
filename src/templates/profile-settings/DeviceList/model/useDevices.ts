import { useQuery } from '@tanstack/react-query'
import { type AxiosResponse } from 'axios'
import { deviceService } from 'shared/api/devices/deviceService'
import { type AllDevicesScheme } from 'shared/types/device'

export const useDevices = () => {
    return useQuery<AxiosResponse<AllDevicesScheme>>(['devices'], {
        queryFn: deviceService.getDevices,
        retry: false
    })
}
