import { memo } from 'react'
import Facebook from 'shared/assets/icons/general/facebook.svg'
import Google from 'shared/assets/icons/general/google.svg'
import cls from './SocialIcons.module.scss'

export const SocialIcons = memo(() => {
    return (
        <div className={cls.social}>
            <Google/>
            <Facebook/>
        </div>
    )
})
