import { useInfiniteQuery } from '@tanstack/react-query'
import { HomeService } from 'shared/api/home'

export const useGetPublications = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess, status } =
    useInfiniteQuery(
      ['publicationsData'],
      ({ pageParam = 1 }) => HomeService.getProfileData(pageParam),
      {
        getNextPageParam: lastPage => {
          return lastPage.data.page < lastPage.data.pagesCount ? lastPage.data.page + 1 : undefined
        },
      }
    )

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess, status }
}
