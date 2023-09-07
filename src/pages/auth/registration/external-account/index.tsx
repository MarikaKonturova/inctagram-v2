import { getAuthLayout } from 'layouts/Layout/AuthLayout/AuthLayout'
import React from 'react'
import { MergeAccount } from 'features/auth'

const MergeAccountPage = () => {
    return <MergeAccount />
}

MergeAccountPage.getLayout = getAuthLayout

export default MergeAccountPage
