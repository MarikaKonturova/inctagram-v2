import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { PostService } from 'shared/api'
import { type Comment } from 'shared/types/comment'

export const useAnswerForComment = () => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const queryClient = useQueryClient()
    const { mutate: addAnswerForComment, isSuccess } = useMutation({
        mutationFn: ({ postId, commentId, answerContent }: { postId: number
            commentId: number
            answerContent: Pick<Comment, 'content'> }) =>
            PostService.answerForComment(postId, commentId, answerContent),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['postAnswers'])
        },
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        }
    })
    return { addAnswerForComment, isSuccess }
}
