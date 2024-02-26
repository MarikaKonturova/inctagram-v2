import { getLayoutWithSidebar } from 'layouts'
import React from 'react'
import { ProfileSettingsPage } from 'templates/profile-settings'

export default function ProfileSettings() {
  return <ProfileSettingsPage />
}

ProfileSettings.getLayout = getLayoutWithSidebar
