import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UsersService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'
export const useGetSearchUsers = (searchUser: string) => {
  const onOpen = useSnackbar(state => state.onOpen)

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess } =
    useInfiniteQuery(
      ['postComments', searchUser],
      ({ pageParam = 1 }) => UsersService.getSearchUsers(searchUser, pageParam),
      {
        getNextPageParam: lastPage => {
          return lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined
        },
        onError: (error: AxiosError<{ message: string }>) => {
          onOpen(error.message, 'danger', 'left')
        },
      }
    )

  const dataUsers = data?.pages.flatMap(page => page.items)

  return {
    dataUsers,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
  }
}
