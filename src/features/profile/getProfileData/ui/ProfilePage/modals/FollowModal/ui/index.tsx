import Image from 'next/image'
import React, { useState } from 'react'
import { useSnackbar } from 'features/common'
import userPhoto from 'shared/assets/images/user.png'
import { useDebounce } from 'shared/hooks/useDebounce'
import { type User } from 'shared/types/auth'
import { Button, Input, Loader, Modal } from 'shared/ui'

import { useGetUsers, useToggleFollowUser } from '../model'
import styles from './styles.module.scss'

interface SubscribersModalPropsTypes {
    isOpen: boolean
    onClose: () => void
    userName?: string
    onFollowingChange?: (action: 'follow' | 'unfollow') => void
}

export const SubscribersModal: React.FC<SubscribersModalPropsTypes> = (props) => {
    const { isOpen, onClose, userName, onFollowingChange } = props
    const [searchUser, setSearchUser] = useState<string>('')
    const debounceSearchUser = useDebounce(searchUser, 500)
    const { data: usersData, isLoading: isUsersLoading } = useGetUsers(debounceSearchUser, userName || '')
    const toggleFollowUser = useToggleFollowUser(debounceSearchUser)
    const followingCount = usersData?.filter((user: User) => user.isFollowing).length || 0
    const onOpen = useSnackbar(state => state.onOpen)

    const handleToggleFollow = (user: User) => {
        toggleFollowUser.mutate(user, {
            onSuccess: () => {
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
         title={`Subscribed to: ${String(followingCount)}`}
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
