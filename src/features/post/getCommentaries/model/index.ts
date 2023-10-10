import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { MyPostService, PostService } from 'shared/api'
import { useBearStore } from '../../../profile/getPosts/model'

export const useGetPostComments = (postId: number) => {
    const onOpen = useSnackbar((state) => state.onOpen)
    const { refetch, setRefetch } = useBearStore()
    const { isLoading, error, data } = useQuery({
        queryKey: ['postComments', 'postAnswers'],
        queryFn: () => MyPostService.getPostComments(postId),
        onSuccess: () => { setRefetch({ doRefetch: false }) },
        refetchInterval: refetch ? 100 : false,
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        }
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
