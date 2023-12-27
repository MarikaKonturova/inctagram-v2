import { type FC, memo } from 'react'

import {
  type GoogleAndGitHubAuthProps,
  GoogleGitHubAuth,
} from './GoogleGitHubAuth/ui/GoogleGitHubAuth'
import cls from './SocialIcons.module.scss'

export const SocialIcons: FC<GoogleAndGitHubAuthProps> = memo(({ type }) => {
  return (
    <div className={cls.social}>
      <GoogleGitHubAuth type={type} />
    </div>
  )
})
