import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useCommentStore } from 'entities/Comment'
import { UsersService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'

/*export function useGetSearchUsers(searchUser: string) {
  const onOpen = useSnackbar(state => state.onOpen)

  return useQuery(['usersSearch'], async () => {
    const response = await UsersService.getUserSearch(searchUser)

    if (response.status !== 200) {
      onOpen('Network response was not ok', 'danger', 'right')
    }

    return response.data.items
  })
}*/

export const useGetSearchUsers = (searchUser: string) => {
  const onOpen = useSnackbar(state => state.onOpen)
  const { setRefetch } = useCommentStore()
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess } =
    useInfiniteQuery(
      ['postComments', searchUser],
      ({ pageParam = 1 }) => UsersService.getUserSearch(searchUser, pageParam),
      {
        getNextPageParam: lastPage => {
          return lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined
        },
        onError: (error: AxiosError<{ message: string }>) => {
          onOpen(error.message, 'danger', 'left')
        },
        onSuccess: () => {
          setRefetch({ doRefetch: true })
        },
      }
    )

  const dataUsers = data?.pages.flatMap(page => page.items)

  return {
    dataUsers,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    status,
  }
}
