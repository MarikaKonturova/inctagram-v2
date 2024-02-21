import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostService } from 'shared/api'
import { type LikeStatus } from 'shared/types/likeStatus'

export const useLikePost = (postId: number) => {
  const queryClient = useQueryClient()

  const { isLoading, mutate: like } = useMutation({
    mutationFn: ({ likeStatus }: { likeStatus: LikeStatus }) =>
      PostService.like({ likeStatus, postId }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(['post', postId]),
        queryClient.invalidateQueries(['publicationsData']),
      ])
    },
  })

  return { isLoading, like }
}
