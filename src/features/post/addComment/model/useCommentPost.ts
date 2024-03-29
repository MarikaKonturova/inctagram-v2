import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useCommentStore } from 'entities/Comment/model/useCommentStore'
import { PostService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'

export const useCommentPost = () => {
  const onOpen = useSnackbar(state => state.onOpen)
  const { setRefetch } = useCommentStore()

  const queryClient = useQueryClient()
  const { isSuccess, mutate: addComment } = useMutation({
    mutationFn: ({
      commentContent,
      postId,
    }: {
      commentContent: Record<'content', string>
      postId: number
    }) => PostService.comment(postId, commentContent),
    mutationKey: ['postComments'],
    onError: (error: AxiosError<{ message: string }>) => {
      onOpen(error.message, 'danger', 'left')
    },
    onSuccess: async () => {
      setRefetch({ doRefetch: true })
      await Promise.all([
        queryClient.invalidateQueries(['publicationsData']),
        queryClient.invalidateQueries(['postComments']),
      ])
    },
  })

  return { addComment, isSuccess }
}

export const useAnswerForComment = () => {
  const onOpen = useSnackbar(state => state.onOpen)
  const { setRefetch } = useCommentStore()

  const queryClient = useQueryClient()
  const { isSuccess, mutate: addAnswerForComment } = useMutation({
    mutationFn: ({
      answerContent,
      commentId,
      postId,
    }: {
      answerContent: Record<'content', string>
      commentId: number
      postId: number
    }) => PostService.answerForComment(postId, commentId, answerContent),
    onError: (error: AxiosError<{ message: string }>) => {
      onOpen(error.message, 'danger', 'left')
    },
    onSuccess: async () => {
      setRefetch({ doRefetch: true })

      await Promise.all([
        queryClient.invalidateQueries(['postAnswers', 'postComments']),
        queryClient.invalidateQueries(['postComments']),
      ])
    },
  })

  return { addAnswerForComment, isSuccess }
}
