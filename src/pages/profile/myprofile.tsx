import { getLayoutWithSidebar } from 'layouts'
import { ProfilePage } from 'templates/ProfilePage'

export default function Profile() {
  return <ProfilePage />
}

Profile.getLayout = getLayoutWithSidebar
