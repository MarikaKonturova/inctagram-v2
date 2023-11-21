import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'features/common'
import userPhoto from 'shared/assets/images/user.png'
import { useDebounce } from 'shared/hooks/useDebounce'
import { type User } from 'shared/types/auth'
import { Button, Input, Loader, Modal } from 'shared/ui'

import { useGetUsers, useToggleFollowUser } from '../model'
import styles from './styles.module.scss'

interface FollowingAndFollowersModalPropsTypes {
    isOpen: boolean
    onClose: () => void
    userName?: string
    fetchDataName: string
    onFollowingChange?: (action: 'follow' | 'unfollow') => void
}

export const FollowingAndFollowersModal: React.FC<FollowingAndFollowersModalPropsTypes> = (props) => {
    const { isOpen, onClose, userName, onFollowingChange, fetchDataName } = props
    const [searchUser, setSearchUser] = useState<string>('')
    const [count, setCount] = useState<number>(0)
    const debounceSearchUser = useDebounce(searchUser, 500)
    const { data: usersData, isLoading: isUsersLoading, refetch } =
        useGetUsers(debounceSearchUser, userName || '', fetchDataName, count)
    const toggleFollowUser = useToggleFollowUser(debounceSearchUser)
    const followingCount = usersData?.filter((user: User) =>
        fetchDataName === 'following' ? user.isFollowing : user.isFollowedBy).length || 0
    const onOpen = useSnackbar(state => state.onOpen)
    const title = fetchDataName === 'following' ? 'Subscription' : 'Subscribed'

    useEffect(() => {
        void refetch()
    }, [count])

    const handleToggleFollow = (user: User) => {
        toggleFollowUser.mutate(user, {
            onSuccess: () => {
                setCount(followingCount)
                onOpen(`You have ${user.isFollowing ? 'unfollowed' : 'followed'} ${user.userName}!`, 'success', 'right')
                if (onFollowingChange) {
                    if (user.isFollowing) {
                        onFollowingChange('unfollow')
                    } else {
                        onFollowingChange('follow')
                    }
                }
            }
        })
    }

    return (
        <Modal
         title={`${title} to: ${String(followingCount)}`}
         isOpen={isOpen}
         onClose={onClose}
         className={styles.modal}
        >
            <Input
                type="search"
                value={searchUser}
                onChange={(e) => { setSearchUser(e.target.value) }}
                placeholder="Search..."
                className={styles.inputWrapper}
                inputClassName={styles.input}
            />
            {isUsersLoading && <div className={styles.loader}><Loader /></div>}
            <div className={styles.usersList}>
                {usersData?.map((user: User) => (
                    <div key={user.id} className={styles.userCard}>
                        <div className={styles.rightBlock}>
                            <Image
                                src={user.avatars?.medium?.url || userPhoto}
                                alt={user.userName}
                                className={styles.userAvatar}
                                width={50}
                                height={50}
                            />
                            <p className={styles.userName}>{user.userName}</p>
                        </div>
                        <div className={styles.leftBlock}>
                            <Button
                                type="button"
                                className={styles.button}
                                onClick={() => { handleToggleFollow(user) }}>
                                {user.isFollowing ? 'Unfollow' : 'Follow'}
                            </Button>
                            <Button
                                type="button"
                                theme="secondary"
                                className={styles.button}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    )
}
