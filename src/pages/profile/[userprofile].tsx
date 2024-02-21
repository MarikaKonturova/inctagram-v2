import { getLayoutWithSidebar } from 'layouts'
import { UserProfilePage } from 'templates/profile'

export default function Profile() {
  return <UserProfilePage />
}

Profile.getLayout = getLayoutWithSidebar
