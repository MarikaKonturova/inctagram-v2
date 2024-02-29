import { memo } from 'react'
import { GoogleAndGitHubAuthProps } from 'shared/types/auth'

import { GoogleGitHubAuth } from '../components'
import cls from './SocialIcons.module.scss'

export const SocialIcons = memo(({ type }: GoogleAndGitHubAuthProps) => {
  return (
    <div className={cls.social}>
      <GoogleGitHubAuth type={type} />
    </div>
  )
})
