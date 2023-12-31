import { useQueryClient, useMutation } from '@tanstack/react-query'

import { PostService } from 'shared/api'
import { type LikeStatus } from 'shared/types/likeStatus'

export const useLikeComment = (postId: number, commentId: number) => {
    const queryClient = useQueryClient()

    const { mutate: likeComment } = useMutation({
        mutationFn: ({ likeStatus }: { likeStatus: LikeStatus }) =>
            PostService.likeComment({ postId, commentId, likeStatus }),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['postComments'])
        }
    })

    return { likeComment }
}
