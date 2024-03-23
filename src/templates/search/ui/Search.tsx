import { useGetSearchUsers } from 'entities/Search'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import userPhoto from 'shared/assets/images/user.png'
import { AppRoutes } from 'shared/constants/path'
import { useDebounce } from 'shared/hooks'
import { Input, Loader } from 'shared/ui'

import cls from './Search.module.scss'

export const SearchPage = () => {
  const { inView, ref } = useInView()
  const { t } = useTranslation('profile')
  const { t: tr } = useTranslation('common')
  const [searchUserValue, setSearchUserValue] = useState<string>()
  const debounceSearchUserValue = useDebounce(searchUserValue, 500)

  const [searchUserData, setSearchUserData] = useState<any>()

  const {
    dataUsers: usersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isUsersLoading,
    isSuccess,
  } = useGetSearchUsers(debounceSearchUserValue)
  const onSearchUserValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUserValue(e.target.value)
    setSearchUserData(usersData)
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <div className={cls.searchPage}>
      <h2 className={cls.title}> {tr('search')} </h2>
      <Input
        className={cls.inputWrapper}
        inputClassName={cls.input}
        onChange={onSearchUserValueHandler}
        placeholder={`${t('search')}`}
        type={'search'}
        value={searchUserValue}
      />
      {!debounceSearchUserValue && searchUserData?.length > 0 && (
        <p className={cls.titleList}>Recent requests</p>
      )}

      {!debounceSearchUserValue && searchUserData == undefined && (
        <p className={cls.titleList}>Recent requests</p>
      )}

      {usersData?.length == 0 && <p className={cls.noResults}>No results found</p>}

      <div className={cls.usersList}>
        {!debounceSearchUserValue && searchUserData == undefined && (
          <div className={cls.emptyList}>
            <h3>Oops! This place looks empty!</h3>
            <p>No recent requests</p>
          </div>
        )}

        {!debounceSearchUserValue && usersData == undefined && searchUserData?.length == 0 && (
          <div className={cls.emptyList}>
            <h3>Oops! This place looks empty!</h3>
            <p>No recent requests</p>
          </div>
        )}

        {(debounceSearchUserValue ? usersData : searchUserData)?.map((user: any) => (
          <div className={cls.userCard} key={user.id}>
            <div className={cls.userBlock}>
              <p className={cls.userName}>
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
                <div className={cls.userInfoBox}>
                  <Link
                    href={{
                      pathname: `${AppRoutes.PROFILE.PROFILE}/${user.userName}`,
                    }}
                  >
                    {user.userName}
                  </Link>
                  <p className={cls.userInfo}>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </p>
            </div>
          </div>
        ))}

        {isSuccess && (
          <div className={cls.loaderContainer} ref={ref}>
            {isFetchingNextPage && <Loader />}
          </div>
        )}
      </div>
    </div>
  )
}
