import { type FC, memo } from 'react'
import Facebook from 'shared/assets/icons/general/facebook.svg'
import { type GoogleAndGitHubAuthProps, GoogleAuth } from '../../../features/auth/ui/GoogleAuth/ui/GoogleAuth'
import cls from './SocialIcons.module.scss'

export const SocialIcons: FC<GoogleAndGitHubAuthProps> = memo(({ type }) => {
    return (
        <div className={cls.social}>
            <GoogleAuth type={type}/>
            <Facebook/>
        </div>
    )
})
