import { getLayoutWithSidebar } from 'layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'
import { DeviceList } from 'templates/profile-settings'

export default function Devices () {
    return <DeviceList />
}

Devices.getLayout = getLayoutWithSidebar
