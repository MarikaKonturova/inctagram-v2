import { ProfilePage } from 'features/profile'
import { getLayoutWithSidebar } from 'layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'

export default function Profile() {
  return <ProfilePage />
}

Profile.getLayout = getLayoutWithSidebar
