import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useCommentStore } from 'entities/Comment/model/useCommentStore'
import { MyPostService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'

export const useGetPostComments = (postId: number) => {
  const onOpen = useSnackbar(state => state.onOpen)
  const { refetch, setRefetch } = useCommentStore()
  const { data, error, isLoading } = useQuery({
    enabled: !!postId,
    onError: (error: AxiosError<{ message: string }>) => {
      onOpen(error.message, 'danger', 'left')
    },
    onSuccess: () => {
      setRefetch({ doRefetch: false })
    },
    queryFn: () => MyPostService.getPostComments(postId),
    queryKey: ['postComments', 'postComments', postId],
    refetchInterval: refetch.doRefetch ? 100 : false,
  })

  const comments = data?.data

  return { comments, error, isLoading }
}
