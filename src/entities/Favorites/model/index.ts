import { useInfiniteQuery } from '@tanstack/react-query'
import { UsersService } from 'shared/api'

export const useGetFavoritesData = (userName: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess, status } =
    useInfiniteQuery<any>({
      /* TODO: FIX ANY */
      enabled: !!userName,
      getNextPageParam: (lastPage, pages) => {
        if ((lastPage.pageParam as number) + 1 > lastPage.pagesCount) {
          return false
        }

        return (lastPage.pageParam as number) + 1
      },
      queryFn: ({ pageParam = 1 }) => {
        return UsersService.getFavoritesPosts({ pageParam, userName })
      },
      queryKey: ['favorites', userName],
    })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    status,
  }
}
