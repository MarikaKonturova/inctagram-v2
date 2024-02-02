import { useInfiniteQuery } from '@tanstack/react-query'
import { FavoritesService } from 'shared/api/favorites'

export const useGetFavoritesData = (userName: string | undefined) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess, status } =
    useInfiniteQuery<any>({
      /* TODO: FIX ANY */
      enabled: !!userName,
      getNextPageParam: lastPage => {
        if ((lastPage.pageParam as number) + 1 > lastPage.pageCount) {
          return false
        }

        return (lastPage.pageParam as number) + 1
      },
      queryFn: ({ pageParam = 1 }) => {
        return FavoritesService.getFavoritesPosts({ pageParam, userName })
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
