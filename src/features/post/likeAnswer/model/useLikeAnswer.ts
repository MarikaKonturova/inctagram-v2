import { useQueryClient, useMutation } from '@tanstack/react-query'

import { type LikeStatus } from 'shared/types/likeStatus'
import { PostService } from '../../../../shared/api'

export const useLikeAnswer = (postId: number, commentId: number, answerId: number) => {
    const queryClient = useQueryClient()

    const { mutate: likeAnswer } = useMutation({
        mutationFn: ({ likeStatus }: { likeStatus: LikeStatus }) =>
            PostService.likeAnswer({ postId, commentId, answerId, likeStatus }),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['postAnswers', commentId])
        }
    })

    return { likeAnswer }
}
