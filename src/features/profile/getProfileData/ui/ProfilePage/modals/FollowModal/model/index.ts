import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'features/common'
import { UsersService } from 'shared/api'
import { type User } from 'shared/types/auth'

export function useGetUsers (searchUser: string, userName: string) {
    const onOpen = useSnackbar(state => state.onOpen)

    return useQuery(['users', searchUser], async () => {
        const response = await UsersService.getFollowingUsers(userName, searchUser)

        if (response.status !== 200) {
            onOpen('Network response was not ok', 'danger', 'right')
        }
        return response.data.items
    })
}

export function useToggleFollowUser (debounceSearchUser: string) {
    const queryClient = useQueryClient()
    const onOpen = useSnackbar(state => state.onOpen)

    return useMutation(async (userToToggle: User) => {
        const response = await UsersService.follow(userToToggle.userId)

        if (response.status !== 201) {
            onOpen('Failed to process follow/unfollow action', 'danger', 'right')
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
        onError: () => {
            onOpen('Error while toggling follow/unfollow', 'danger', 'right')
        }
    })
}

export function useDeleteUser (debounceSearchUser: string) {
    const queryClient = useQueryClient()
    const onOpen = useSnackbar(state => state.onOpen)

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
        onError: () => {
            onOpen('Error while deleting user:', 'danger', 'right')
        }
    })
}
