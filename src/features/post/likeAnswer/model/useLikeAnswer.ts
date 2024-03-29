import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostService } from 'shared/api'
import { type LikeStatus } from 'shared/types/likeStatus'

export const useLikeAnswer = (postId: number, commentId: number, answerId: number) => {
  const queryClient = useQueryClient()

  const { isLoading, mutate: likeAnswer } = useMutation({
    mutationFn: ({ likeStatus }: { likeStatus: LikeStatus }) =>
      PostService.likeAnswer({ answerId, commentId, likeStatus, postId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['postAnswers'])
    },
  })

  return { isLoading, likeAnswer }
}
