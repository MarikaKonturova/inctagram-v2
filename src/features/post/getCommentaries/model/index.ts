import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { MyPostService, PostService } from 'shared/api'

export const useGetPostComments = (postId: number) => {
    const onOpen = useSnackbar((state) => state.onOpen)
    const { isLoading, error, data } = useQuery({
        queryKey: ['postComments', 'postAnswers'],
        queryFn: () => MyPostService.getPostComments(postId),
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        },
        enabled: !!postId
    })

    const comments = data?.data

    return { comments, isLoading, error }
}

export const useGetPostAnswersForComments = (postId: number, commentId: number) => {
    const { data } = useQuery({
        queryKey: ['postAnswers', 'postComments', commentId],
        queryFn: () => PostService.getAnswerForComment(postId, commentId),
        enabled: commentId != null
    })

    const answerForComment = data?.data

    return { answerForComment }
}
