import { useSnackbar } from 'features/common'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import userPhoto from 'shared/assets/images/user.png'
import { useDebounce } from 'shared/hooks/useDebounce'
import { type User } from 'shared/types/auth'
import { Button, Input, Loader, Modal } from 'shared/ui'

import { useGetUsers, useToggleFollowUser } from '../model'
import styles from './styles.module.scss'

interface FollowingAndFollowersModalPropsTypes {
  fetchDataName: string
  isOpen: boolean
  onClose: () => void
  onFollowingChange?: (action: 'follow' | 'unfollow') => void
  userName?: string
}

export const FollowingAndFollowersModal: React.FC<FollowingAndFollowersModalPropsTypes> = props => {
  const { fetchDataName, isOpen, onClose, onFollowingChange, userName } = props
  const [searchUser, setSearchUser] = useState<string>('')
  const [count, setCount] = useState<number>(0)
  const debounceSearchUser = useDebounce(searchUser, 500)
  const {
    data: usersData,
    isLoading: isUsersLoading,
    refetch,
  } = useGetUsers(debounceSearchUser, userName || '', fetchDataName, count)
  const toggleFollowUser = useToggleFollowUser(debounceSearchUser)
  const followingCount =
    usersData?.filter((user: User) =>
      fetchDataName === 'following' ? user.isFollowing : user.isFollowedBy
    ).length || 0
  const onOpen = useSnackbar(state => state.onOpen)
  const title = fetchDataName === 'following' ? 'Subscription' : 'Subscribed'

  useEffect(() => {
    void refetch()
  }, [count])

  const handleToggleFollow = (user: User) => {
    toggleFollowUser.mutate(user, {
      onSuccess: () => {
        setCount(followingCount)
        onOpen(
          `You have ${user.isFollowing ? 'unfollowed' : 'followed'} ${user.userName}!`,
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
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClose={onClose}
      title={`${title} to: ${String(followingCount)}`}
    >
      <Input
        className={styles.inputWrapper}
        inputClassName={styles.input}
        onChange={e => {
          setSearchUser(e.target.value)
        }}
        placeholder={'Search...'}
        type={'search'}
        value={searchUser}
      />
      {isUsersLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      <div className={styles.usersList}>
        {usersData?.map((user: User) => (
          <div className={styles.userCard} key={user.id}>
            <div className={styles.rightBlock}>
              <Image
                alt={user.userName}
                className={styles.userAvatar}
                height={50}
                src={user.avatars?.medium?.url || userPhoto}
                width={50}
              />
              <p className={styles.userName}>{user.userName}</p>
            </div>
            <div className={styles.leftBlock}>
              <Button
                className={styles.button}
                onClick={() => {
                  handleToggleFollow(user)
                }}
                type={'button'}
              >
                {user.isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
              <Button className={styles.button} theme={'secondary'} type={'button'}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
