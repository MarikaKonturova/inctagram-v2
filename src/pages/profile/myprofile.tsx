import { ProfilePage } from 'templates/profile'
import { getLayoutWithSidebar } from 'layouts'

export default function Profile() {
  return <ProfilePage />
}

Profile.getLayout = getLayoutWithSidebar
