import Image from 'next/image'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useGetUsers, useToggleFollowUser } from 'features/profile/getProfileData/ui/modals/FollowModal/model'
import { useDebounce } from 'shared/hooks/useDebounce'
import { type User } from 'shared/types/auth'
import { Input, Loader, Modal } from 'shared/ui'

import 'react-toastify/dist/ReactToastify.css'
import styles from './styles.module.scss'

interface SubscribersModalPropsTypes {
    onClose: () => void
    userName?: string
    onFollowingChange?: (action: 'follow' | 'unfollow') => void
}

export const SubscribersModal: React.FC<SubscribersModalPropsTypes> = ({ onClose, userName, onFollowingChange }) => {
    const [searchUser, setSearchUser] = useState<string>('')
    const debounceSearchUser = useDebounce(searchUser, 500)
    const { data: usersData, isLoading: isUsersLoading } = useGetUsers(debounceSearchUser, userName || '')
    const toggleFollowUser = useToggleFollowUser(debounceSearchUser)
    const followingCount = usersData?.filter((user: User) => user.isFollowing).length || 0

    const handleToggleFollow = (user: User) => {
        toggleFollowUser.mutate(user, {
            onSuccess: () => {
                toast.success(`You have ${user.isFollowing ? 'unfollowed' : 'followed'} ${user.userName}!`)
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
        <Modal title={`Subscribed to: ${String(followingCount)}`} isOpen={true} onClose={onClose}>
            <ToastContainer />
            <div className={styles.searchContainer}>
                <div className={styles.modalHeaderSeparator}></div>
                {isUsersLoading && <Loader />}
                <Input
                    type="search"
                    value={searchUser}
                    onChange={(e) => { setSearchUser(e.target.value) }}
                    placeholder="Search..."
                    variant="standard"
                    className={styles.modalCustomSize}
                />
            </div>

            <div className={styles.usersList}>
                <div className={styles.usersAndbuttons}>
                    {usersData?.map((user: User) => (
                        <div key={user.id} className={styles.userCard}>
                            <Image
                                src={user.avatars?.medium?.url || '/user.png'}

                                alt={user.userName}
                                className={styles.userAvatar}
                                width={100}
                                height={100}
                            />
                            <p className={styles.userName}>{user.userName}</p>
                            <div className={styles.FollowButton}>
                                <button
                                    type="button"
                                    onClick={() => { handleToggleFollow(user) }}
                                >
                                    {user.isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                            <div className={styles.deleteButton}>
                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}
