import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostService } from '../../../../shared/api/post/postService'

export const useLikePost = () => {
    const queryClient = useQueryClient()

    const { mutate: like } = useMutation({
        mutationFn: PostService.like,
        onSuccess: async () => {
            // TODO: сделать перезапрос на getPost & улучшить код (см. доп задачи Jira)
            // await queryClient.invalidateQueries(['post']).then((res) => { })
        }
    })
    return { like }
}
