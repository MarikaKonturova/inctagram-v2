import { getLayoutWithSidebar } from 'layouts'
import { ProfilePage } from 'templates/profile'

export default function Profile() {
  return <ProfilePage />
}

Profile.getLayout = getLayoutWithSidebar
