import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostService } from 'shared/api'
import { type LikeStatus } from 'shared/types/likeStatus'

export const useLikePost = (postId: number) => {
    const queryClient = useQueryClient()

    const { mutate: like } = useMutation({
        mutationFn: ({ likeStatus }:
        { likeStatus: LikeStatus }) => PostService.like({ postId, likeStatus }),
        onSuccess: async () => {
            // TODO: сделать перезапрос на getPost & улучшить код (см. доп задачи Jira)
            await queryClient.invalidateQueries(['post', postId])
        }
    })
    return { like }
}
