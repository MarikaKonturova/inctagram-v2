export interface DeviceScheme {
  ip: string;
  userAgent: string;
  lastVisit: string;
  deviceId: string;
}

export interface AllDevicesScheme {
  devices: DeviceScheme[];
  currentDeviceId: string;
}
