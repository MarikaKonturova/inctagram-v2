import { useTranslation } from 'next-i18next'
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { useDebounce } from 'shared/hooks'
import { type User } from 'shared/types/auth'
import { Input, Loader, Modal } from 'shared/ui'

import { useGetUsers } from '../../model'
import { UsersList } from '../usersList/UsersList'
import styles from './FollowingAndFollowersModal.module.scss'

interface PropsType {
  fetchDataName: string
  isOpen: boolean
  onClose: () => void
  onFollowingChange?: (action: 'follow' | 'unfollow') => void
  userName?: string
}

export const FollowingAndFollowersModal: React.FC<PropsType> = props => {
  const { fetchDataName, isOpen, onClose, onFollowingChange, userName } = props
  const [searchUserValue, setSearchUserValue] = useState<string>('')
  const [count, setCount] = useState<number>(0)
  const debounceSearchUserValue = useDebounce(searchUserValue, 500)
  const { t } = useTranslation('profile')

  const {
    data: usersData,
    isLoading: isUsersLoading,
    refetch,
  } = useGetUsers(debounceSearchUserValue, userName || '', fetchDataName, count)

  const followingCount =
    usersData?.filter((user: User) =>
      fetchDataName === 'following' ? user.isFollowing : user.isFollowedBy
    ).length || 0

  const title = fetchDataName === 'following' ? `${t('subscriptions')}` : `${t('subscribers')}`

  const onSearchUserValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUserValue(e.target.value)
  }

  useEffect(() => {
    void refetch()
  }, [count])

  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClose={onClose}
      title={`${title}: ${String(followingCount)}`}
    >
      <Input
        className={styles.inputWrapper}
        inputClassName={styles.input}
        onChange={onSearchUserValueHandler}
        placeholder={`${t('search')}`}
        type={'search'}
        value={searchUserValue}
      />
      {isUsersLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      <UsersList
        debounceSearchUserValue={debounceSearchUserValue}
        followingCount={followingCount}
        onFollowingChange={onFollowingChange}
        setCount={setCount}
        usersData={usersData}
      />
    </Modal>
  )
}
