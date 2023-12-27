import React from 'react'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

import { useConfirmEmailMutation } from '../model'

interface IProps {
  code: string
}

export const EmailConfirmation: React.FC<IProps> = ({ code }) => {
  useConfirmEmailMutation(code)

  return <PageLoader />
}
