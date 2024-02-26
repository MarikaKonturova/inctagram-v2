import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useCommentStore } from 'entities/Comment/model/useCommentStore'
import { MyPostService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'

export const useGetPostComments = (postId: number) => {
  const onOpen = useSnackbar(state => state.onOpen)
  const { setRefetch } = useCommentStore()

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess } =
    useInfiniteQuery(
      ['postComments', postId],
      ({ pageParam = 1 }) => MyPostService.getPostComments(postId, pageParam),
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

  const comments = data?.pages.flatMap(page => page.items)

  return {
    comments,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
  }
}
