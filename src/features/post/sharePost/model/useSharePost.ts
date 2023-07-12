import { useMutation } from '@tanstack/react-query'
import { PostService } from '../../../../shared/api/post/postService'

export const useSharePost = () => {
    const { mutate: share } = useMutation({
        mutationFn: PostService.share,
        onSuccess: async () => {

        }
    })
    return { share }
}
