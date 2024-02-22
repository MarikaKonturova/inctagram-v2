import { NextPageContext } from 'next'
import React from 'react'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

import { useConfirmEmailMutation } from '../model'

interface IProps {
  queryParams: NextPageContext['query']
}

export const EmailConfirmation: React.FC<IProps> = ({ queryParams }) => {
  useConfirmEmailMutation(queryParams)

  return <PageLoader />
}
