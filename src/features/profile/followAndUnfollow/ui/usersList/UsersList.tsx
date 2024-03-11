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
import cls from './UsersList.module.scss'

type PropsType = {
  debounceSearchUserValue: string
  fetchDataName: string
  followingCount: number
  onFollowingChange?: (action: 'follow' | 'unfollow') => void
  setCount: (count: number) => void
  usersData: User[]
}

export const UsersList: FC<PropsType> = ({
  debounceSearchUserValue,
  fetchDataName,
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
    <div className={cls.usersList}>
      {usersData?.map((user: User) => {
        const toggleHandler = () => handleToggleFollow(user)

        return (
          <div className={cls.userCard} key={user.id}>
            <div className={cls.rightBlock}>
              <Link
                href={{
                  pathname: `${AppRoutes.PROFILE.PROFILE}/${user.userName}`,
                }}
              >
                <Image
                  alt={user.userName}
                  className={cls.userAvatar}
                  height={50}
                  src={user.avatars?.medium?.url || userPhoto}
                  width={50}
                />
              </Link>
              <p className={cls.userName}>
                <Link
                  href={{
                    pathname: `${AppRoutes.PROFILE.PROFILE}/${user.userName}`,
                  }}
                >
                  {user.userName}
                </Link>
              </p>
            </div>
            <div className={cls.leftBlock}>
              {fetchDataName === 'following' && (
                <Button className={cls.button} onClick={toggleHandler} type={'button'}>
                  {user.isFollowing ? `${t('unfollow')}` : `${t('follow')}`}
                </Button>
              )}
              {fetchDataName === 'followers' && (
                <>
                  <Button
                    className={user.isFollowing ? cls.invisible : cls.button}
                    onClick={toggleHandler}
                    type={'button'}
                  >
                    {t('follow')}
                  </Button>
                  <Button className={cls.deleteButton} theme={'secondary'} type={'button'}>
                    {t('delete')}
                  </Button>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
