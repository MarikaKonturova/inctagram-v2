import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'features/common'
import { UsersService } from 'shared/api'
import { type User } from 'shared/types/auth'

export function useGetUsers(
  searchUser: string,
  userName: string,
  fetchDataName: string,
  count: number
) {
  const onOpen = useSnackbar(state => state.onOpen)

  return useQuery(['users', searchUser, fetchDataName, count], async () => {
    const response =
      fetchDataName === 'following'
        ? await UsersService.getFollowersUsers(userName, searchUser)
        : await UsersService.getFollowingUsers(userName, searchUser)

    if (response.status !== 200) {
      onOpen('Network response was not ok', 'danger', 'right')
    }

    return response.data.items
  })
}

export function useToggleFollowUser(debounceSearchUser: string) {
  const queryClient = useQueryClient()
  const onOpen = useSnackbar(state => state.onOpen)

  return useMutation(
    async (userToToggle: User) => {
      const response = await UsersService.follow(userToToggle.userId)

      if (response.status !== 201) {
        onOpen('Failed to process follow/unfollow action', 'danger', 'right')
      }

      return {
        id: userToToggle.id,
        newFollowingState: !userToToggle.isFollowing,
      }
    },
    {
      onError: () => {
        onOpen('Error while toggling follow/unfollow', 'danger', 'right')
      },
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
    }
  )
}

export function useDeleteUser(debounceSearchUser: string) {
  const queryClient = useQueryClient()
  const onOpen = useSnackbar(state => state.onOpen)

  return useMutation(
    async (userToDelete: User) => {
      const response = await UsersService.unfollow(userToDelete.userId)

      if (response.status !== 204) {
        throw new Error('Failed to process unfollow action')
      }

      return userToDelete.id
    },
    {
      onError: () => {
        onOpen('Error while deleting user:', 'danger', 'right')
      },
      onSuccess: id => {
        queryClient.setQueriesData(['users', debounceSearchUser], (oldData: User[] | undefined) => {
          return oldData?.filter(user => user.id !== id)
        })
      },
    }
  )
}
