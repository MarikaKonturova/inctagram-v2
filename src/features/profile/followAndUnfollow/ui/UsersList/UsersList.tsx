import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { FC, ReactNode } from 'react'
import userPhoto from 'shared/assets/images/user.png'
import { AppRoutes } from 'shared/constants/path'
import { useSnackbar } from 'shared/hooks'
import { User } from 'shared/types/auth'
import { Button } from 'shared/ui'

import { useToggleFollowUser } from '../../model'
import styles from './UsersListStyles.module.scss'

type PropsType = {
  debounceSearchUserValue: string
  followingCount: number
  onFollowingChange?: (action: 'follow' | 'unfollow') => void
  setCount: (count: number) => void
  usersData: User[]
}

export const UsersList: FC<PropsType> = ({
  debounceSearchUserValue,
  followingCount,
  onFollowingChange,
  setCount,
  usersData,
}) => {
  const onOpen = useSnackbar(state => state.onOpen)
  const { t } = useTranslation('profile')

  const toggleFollowUser = useToggleFollowUser(debounceSearchUserValue)
  const handleToggleFollow = (user: User) => {
    toggleFollowUser.mutate(user, {
      onSuccess: () => {
        setCount(followingCount)
        onOpen(
          `${user.isFollowing ? t('youHaveUnfollowed') : t('youHaveFollowed')} ${user.userName}!`,
          'success',
          'right'
        )
        if (onFollowingChange) {
          if (user.isFollowing) {
            onFollowingChange('unfollow')
          } else {
            onFollowingChange('follow')
          }
        }
      },
    })
  }

  return (
    <div className={styles.usersList}>
      {usersData?.map((user: User) => {
        const toggleHandler = () => handleToggleFollow(user)

        return (
          <div className={styles.userCard} key={user.id}>
            <div className={styles.rightBlock}>
              <Image
                alt={user.userName}
                className={styles.userAvatar}
                height={50}
                src={user.avatars?.medium?.url || userPhoto}
                width={50}
              />
              <p className={styles.userName}>
                <Link
                  href={{
                    pathname: `${AppRoutes.PROFILE.PROFILE}/${user.userName}`,
                  }}
                >
                  {user.userName}
                </Link>
              </p>
            </div>
            <div className={styles.leftBlock}>
              <Button className={styles.button} onClick={toggleHandler} type={'button'}>
                {user.isFollowing ? `${t('unfollow')}` : `${t('follow')}`}
              </Button>
              <Button className={styles.button} theme={'secondary'} type={'button'}>
                {t('delete')}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
