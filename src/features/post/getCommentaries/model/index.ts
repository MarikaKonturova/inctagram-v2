import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { useCommentStore } from 'features/profile/getPosts/model'
import { MyPostService, PostService } from 'shared/api'

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

export const useGetPostAnswersForComments = (postId: number, commentId: number) => {
  const { data } = useQuery({
    enabled: !!commentId,
    queryFn: () => PostService.getAnswerForComment(postId, commentId),
    queryKey: ['postAnswers', 'postComments', commentId],
  })

  const answerForComment = data?.data

  return { answerForComment }
}
