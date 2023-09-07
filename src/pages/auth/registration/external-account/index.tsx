import React from 'react'
import MergeAccount from '../../../../features/auth/ui/MergeAccount/ui/MergeAccount'
import { getAuthLayout } from '../../../../layouts/Layout/AuthLayout/AuthLayout'

const MergeAccountPage = () => {
    return <MergeAccount />
}

MergeAccountPage.getLayout = getAuthLayout

export default MergeAccountPage
