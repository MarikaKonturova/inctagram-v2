import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { MyPostService } from 'shared/api'

export const useGetPosts = (userName: string) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess } =
    useInfiniteQuery(
      ['post', userName],
      ({ pageParam = 1 }) => MyPostService.getPosts(userName, pageParam),
      {
        getNextPageParam: lastPage => {
          return lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined
        },
      }
    )

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
  }
}
