import { useTranslation } from 'next-i18next'
import React, { FC, useCallback } from 'react'
import { BUTTON_VARIANTS } from 'shared/constants'
import { Button } from 'shared/ui'

import { useSubscribeOrUnsubscribe } from '../../model'
import cls from './FollowAndUnfollowButton.module.scss'

type PropsType = {
  isFollowing: boolean
  userId: number
  userName: string
}

export const FollowAndUnfollowButton: FC<PropsType> = ({ isFollowing, userId, userName }) => {
  const { t } = useTranslation('profile')
  const { subscribeOrUnsubscribe } = useSubscribeOrUnsubscribe({ isFollowing, userId, userName })

  const followAndFollowHandler = useCallback(async () => {
    subscribeOrUnsubscribe()
  }, [])

  return (
    <Button
      className={cls.button}
      onClick={followAndFollowHandler}
      theme={isFollowing ? BUTTON_VARIANTS.OUTLINE : BUTTON_VARIANTS.PRIMARY}
    >
      {t(isFollowing ? 'unfollow' : 'follow')}
    </Button>
  )
}
