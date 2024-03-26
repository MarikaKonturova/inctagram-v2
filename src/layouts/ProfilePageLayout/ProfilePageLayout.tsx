import { useAuthMe } from 'features/auth/model'
import { type NextPage } from 'next'
import { type PropsWithChildren, type ReactElement } from 'react'

import { LayoutWithSidebar } from '../layoutWithSidebar/LayoutWithSidebar'
import { LayoutWithoutSidebar } from '../layoutWithoutSideBar/LayoutWithoutSidebar'

export const ProfilePageLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useAuthMe()

  return (
    <>
      {isAuth ? (
        <LayoutWithSidebar>{children}</LayoutWithSidebar>
      ) : (
        <LayoutWithoutSidebar withAuth={false}>{children}</LayoutWithoutSidebar>
      )}
    </>
  )
}

export const getProfilePageLayout = (page: ReactElement) => {
  return <ProfilePageLayout>{page}</ProfilePageLayout>
}
