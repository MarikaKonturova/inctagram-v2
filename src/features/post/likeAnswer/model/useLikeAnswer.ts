import { useQueryClient, useMutation } from '@tanstack/react-query'

import { PostService } from 'shared/api'
import { type LikeStatus } from 'shared/types/likeStatus'

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
