import { usePathname } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from 'shared/hooks'
import { Input, Loader, Modal, Pagination } from 'shared/ui'

import { useGetUsers } from '../../model'
import { UsersList } from '../UsersList/UsersList'
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
  const [currentPage, setCurrentPage] = useState(1)
  const pathname = usePathname()

  const currentUserName =
    pathname.split('/').at(-1) === 'myprofile' ? userName : pathname.split('/').at(-1)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const {
    data: usersData,
    isLoading: isUsersLoading,
    refetch,
  } = useGetUsers(debounceSearchUserValue, currentUserName || '', fetchDataName, count, currentPage)

  const followingCount = usersData?.totalCount || 0

  const title = fetchDataName === 'following' ? `${t('subscriptions')}` : `${t('subscribers')}`

  const onSearchUserValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUserValue(e.target.value)
  }

  useEffect(() => {
    void refetch()
  }, [currentUserName])

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
        fetchDataName={fetchDataName}
        followingCount={followingCount}
        onClose={onClose}
        onFollowingChange={onFollowingChange}
        setCount={setCount}
        usersData={usersData?.items}
      />
      {usersData?.pagesCount > 1 && (
        <Pagination
          className={styles.pagination}
          currentPage={currentPage}
          onChangePage={onPageChange}
          pageSize={usersData?.pageSize}
          totalCount={usersData?.totalCount}
          value={usersData?.pageSize}
        />
      )}
    </Modal>
  )
}
