import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { UsersService } from 'shared/api/users'
import { type User } from 'shared/types/auth'

export function useGetUsers (searchUser: string, userName: string) {
    return useQuery(['users', searchUser], async () => {
        const response = await UsersService.getFollowingUsers(userName, searchUser)

        if (response.status !== 200) throw new Error('Network response was not ok')
        return response.data.items
    })
}

export function useToggleFollowUser (debounceSearchUser: string) {
    const queryClient = useQueryClient()

    return useMutation(async (userToToggle: User) => {
        const response = await UsersService.follow(userToToggle.userId)

        if (response.status !== 201) {
            throw new Error('Failed to process follow/unfollow action')
        }

        return {
            id: userToToggle.id,
            newFollowingState: !userToToggle.isFollowing
        }
    }, {
        onSuccess: ({ id, newFollowingState }) => {
            queryClient.setQueriesData(['users', debounceSearchUser], (oldData: User[] | undefined) => {
                return oldData?.map(user => {
                    if (user.id === id) {
                        return { ...user, isFollowing: newFollowingState }
                    }
                    return user
                })
            })
        },
        onError: (error) => {
            console.error('Error while toggling follow:', error)
            toast.error('Ошибка при попытке подписаться/отписаться')
        }
    })
}

export function useDeleteUser (debounceSearchUser: string) {
    const queryClient = useQueryClient()
    return useMutation(async (userToDelete: User) => {
        const response = await UsersService.unfollow(userToDelete.userId)

        if (response.status !== 204) throw new Error('Failed to process unfollow action')
        return userToDelete.id
    }, {
        onSuccess: (id) => {
            queryClient.setQueriesData(['users', debounceSearchUser], (oldData: User[] | undefined) => {
                return oldData?.filter(user => user.id !== id)
            })
        },
        onError: (error) => {
            console.error('Error while deleting user:', error)
        }
    })
}
