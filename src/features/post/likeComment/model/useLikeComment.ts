import { useQueryClient, useMutation } from '@tanstack/react-query'

import { type LikeStatus } from 'shared/types/likeStatus'
import { PostService } from '../../../../shared/api'

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
