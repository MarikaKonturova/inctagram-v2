import { UserProfilePage } from 'features/profile'
import { getLayoutWithSidebar } from 'layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'

export default function Profile() {
  return <UserProfilePage />
}

Profile.getLayout = getLayoutWithSidebar
