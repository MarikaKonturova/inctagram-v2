export interface DeviceScheme {
  deviceId: string
  ip: string
  lastVisit: string
  userAgent: string
}

export interface AllDevicesScheme {
  currentDeviceId: string
  devices: DeviceScheme[]
}
