import { MergeAccount } from 'features/auth'
import { getAuthLayout } from 'layouts/authLayout/AuthLayout'
import React from 'react'

const MergeAccountPage = () => {
  return <MergeAccount />
}

MergeAccountPage.getLayout = getAuthLayout

export default MergeAccountPage
