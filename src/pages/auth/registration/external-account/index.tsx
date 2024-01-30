import { MergeAccount } from 'features/auth'
import React from 'react'
import { getAuthLayout } from 'layouts/AuthLayout/AuthLayout'

const MergeAccountPage = () => {
  return <MergeAccount />
}

MergeAccountPage.getLayout = getAuthLayout

export default MergeAccountPage
