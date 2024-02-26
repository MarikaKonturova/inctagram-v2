import { $api } from 'shared/api'
import { type AllDevicesScheme } from 'shared/types/device'

export const DeviceService = {
  getDevices() {
    return $api.get<AllDevicesScheme>('sessions').then(data => data)
  },
  terminateAllDevices() {
    return $api.delete('sessions')
  },
  terminateDevice(deviceId: string) {
    return $api.delete(`sessions/${deviceId}`)
  },
}
