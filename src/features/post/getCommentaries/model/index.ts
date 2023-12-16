import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { useCommentStore } from 'features/profile/getPosts/model'
import { MyPostService, PostService } from 'shared/api'

export const useGetPostComments = (postId: number) => {
    const onOpen = useSnackbar((state) => state.onOpen)
    const { refetch, setRefetch } = useCommentStore()
    const { isLoading, error, data } = useQuery({
        queryKey: ['postComments', 'postComments', postId],
        queryFn: () => MyPostService.getPostComments(postId),
        onSuccess: () => { setRefetch({ doRefetch: false }) },
        refetchInterval: refetch.doRefetch ? 100 : false,
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
        enabled: !!commentId
    })

    const answerForComment = data?.data

    return { answerForComment }
}
