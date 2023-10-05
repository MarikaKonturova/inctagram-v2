import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { PostService } from 'shared/api'

export const useCommentPost = () => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const queryClient = useQueryClient()
    const { mutate: addComment, isSuccess } = useMutation({
        mutationFn: ({ postId, commentContent }: { postId: number, commentContent: Record<'content', string> }) =>
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

export const useAnswerForComment = () => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const queryClient = useQueryClient()
    const { mutate: addAnswerForComment, isSuccess } = useMutation({
        mutationFn: ({ postId, commentId, answerContent }: { postId: number
            commentId: number
            answerContent: Record<'content', string> }) =>
            PostService.answerForComment(postId, commentId, answerContent),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['postComments', 'postAnswers'])
        },
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        }
    })
    return { addAnswerForComment, isSuccess }
}
