import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { PostService } from 'shared/api'
import { type Comment } from 'shared/types/comment'

export const useCommentPost = () => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const queryClient = useQueryClient()
    const { mutate: addComment, isSuccess } = useMutation({
        mutationFn: ({ postId, commentContent }: { postId: number, commentContent: Pick<Comment, 'content'> }) =>
            PostService.comment(postId, commentContent),
        onSuccess: async () => {
            // TODO: сделать перезапрос на getPost & улучшить код (см. доп задачи Jira)
            await queryClient.invalidateQueries(['postComments'])
        },
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        }
    })
    return { addComment, isSuccess }
}
