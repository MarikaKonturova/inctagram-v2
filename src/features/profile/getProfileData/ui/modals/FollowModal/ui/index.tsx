import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import {
    useToggleFollowUser,
    useGetUsers,
    useDeleteUser, type User
} from 'features/profile/getProfileData/ui/modals/FollowModal/model'
import { useDebounce } from 'shared/hooks/useDebounce'
import { Input, Loader, Modal } from 'shared/ui'
import 'react-toastify/dist/ReactToastify.css'
import styles from './styles.module.scss'

interface SubscribersModalPropsTypes {
    onClose: () => void
    userName?: string
}

export const SubscribersModal: React.FC<SubscribersModalPropsTypes> = ({ onClose, userName }) => {
    const [searchUser, setSearchUser] = useState<string>('')
    const debounceSearchUser = useDebounce(searchUser, 500)
    const { data: usersData, isLoading: isUsersLoading } = useGetUsers(debounceSearchUser, userName || '')
    const toggleFollowUser = useToggleFollowUser(debounceSearchUser)
    const deleteUser = useDeleteUser(debounceSearchUser)

    return (
        <Modal title={`Users: ${String(usersData?.length || 0)}`} isOpen={true} onClose={onClose}>
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
                            <img
                                src={user.avatars?.medium?.url}
                                alt={user.userName}
                                className={styles.userAvatar}
                            />
                            <p className={styles.userName}>{user.userName}</p>

                            <div className={styles.FollowButton}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        toggleFollowUser.mutate(user)
                                        toast.success(`Вы ${user.isFollowing
                                            ? 'отписались от'
                                            : 'подписались на'} ${user.userName}`)
                                    }}
                                >
                                    {user.isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>

                            <div className={styles.deleteButton}>
                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={() => {
                                        deleteUser.mutate(user)
                                        toast.success(`Пользователь ${user.userName} был удален.`)
                                    }}
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
