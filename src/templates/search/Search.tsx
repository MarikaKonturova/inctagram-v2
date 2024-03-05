import { useTranslation } from 'next-i18next'
import React, { ChangeEvent, useState } from 'react'

import { useGetUserProfileData } from '../../entities/Profile'
import styles from '../../features/profile/followAndUnfollow/ui/followingAndFollowersModal/FollowingAndFollowersModal.module.scss'
import cls from '../../features/profile/followAndUnfollow/ui/usersList/UsersList.module.scss'
import { useDebounce } from '../../shared/hooks'
import { Input, Loader } from '../../shared/ui'

export const SearchPage = () => {
  const { t } = useTranslation('profile')
  const [searchUserValue, setSearchUserValue] = useState<string>('')
  const debounceSearchUserValue = useDebounce(searchUserValue, 500)

  const { data: usersData, isLoading: isUsersLoading } =
    useGetUserProfileData(debounceSearchUserValue)
  const onSearchUserValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUserValue(e.target.value)
  }

  return (
    <div>
      <p> SearchPage SearchPage SearchPage SearchPage SearchPage SearchPage </p>

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
      <div className={cls.usersList}>
        {usersData?.data && usersData.data.name}
        <h1>{usersData?.data?.firstName}</h1>
        <h1>{usersData?.data?.id}</h1>
        {/*      {usersData?.map((user: User) => {
          return (
            <div className={cls.userCard} key={user.id}>
              <div className={cls.rightBlock}>
                <Image
                  alt={user.userName}
                  className={cls.userAvatar}
                  height={50}
                  src={user.avatars?.medium?.url || userPhoto}
                  width={50}
                />
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
            </div>
          )
        })} */}
      </div>
    </div>
  )
}
