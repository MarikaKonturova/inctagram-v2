import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { PostService } from 'shared/api'
import { useCommentStore } from '../../../profile/getPosts/model'

export const useCommentPost = () => {
    const onOpen = useSnackbar((state) => state.onOpen)
    const { setRefetch } = useCommentStore()

    const queryClient = useQueryClient()
    const { mutate: addComment, isSuccess } = useMutation({
        mutationKey: ['postComments'],
        mutationFn: ({ postId, commentContent }: { postId: number, commentContent: Record<'content', string> }) =>
            PostService.comment(postId, commentContent),
        onSuccess: async () => {
            // TODO: сделать перезапрос на getPost & улучшить код (см. доп задачи Jira)
            setRefetch({ doRefetch: true })
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
    const { setRefetch } = useCommentStore()

    const queryClient = useQueryClient()
    const { mutate: addAnswerForComment, isSuccess } = useMutation({
        mutationFn: ({ postId, commentId, answerContent }: { postId: number
            commentId: number
            answerContent: Record<'content', string> }) =>
            PostService.answerForComment(postId, commentId, answerContent),
        onSuccess: async () => {
            setRefetch({ doRefetch: true })
            await queryClient.invalidateQueries(['postAnswers', 'postComments'])
        },
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        }
    })
    return { addAnswerForComment, isSuccess }
}
