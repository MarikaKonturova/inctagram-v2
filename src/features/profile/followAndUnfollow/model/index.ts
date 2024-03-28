import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { UsersService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'
import { type User } from 'shared/types/auth'

export function useGetUsers(
  searchUser: string,
  userName: string,
  fetchDataName: string,
  count: number,
  pageNumber: number
) {
  const onOpen = useSnackbar(state => state.onOpen)

  return useQuery(['users', pageNumber, searchUser, fetchDataName, count], async () => {
    const response =
      fetchDataName === 'following'
        ? await UsersService.getFollowersUsers(userName, searchUser, pageNumber)
        : await UsersService.getFollowingUsers(userName, searchUser, pageNumber)

    if (response.status !== 200) {
      onOpen('Network response was not ok', 'danger', 'right')
    }

    return response.data
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
        queryClient.invalidateQueries(['users'])
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

interface Args {
  handleClose: () => void
  userId?: number
  userName?: string
}

export function useDeleteUser({ handleClose, userId, userName }: Args) {
  const { t } = useTranslation(['profile'])
  const queryClient = useQueryClient()
  const onOpen = useSnackbar(state => state.onOpen)

  const { mutate } = useMutation({
    mutationFn: () => {
      if (userId) {
        return UsersService.unfollow(userId)
      } else {
        return Promise.reject(new Error('userId is undefined'))
      }
    },
    onSuccess: async () => {
      handleClose()
      await queryClient.invalidateQueries(['users'])
      await queryClient.invalidateQueries(['userByName'])
      await queryClient.invalidateQueries(['getProfileData'])
      onOpen(`${t('deleteSubscriber')} ${userName}`, 'success', 'right')
    },
    retry: false,
  })
  const onDelete = () => {
    mutate()
  }

  return { onDelete }
}
