import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { MyPostService } from 'shared/api'

export const useGetPostComments = (postId: number) => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const { isLoading, error, data } = useQuery({
        queryKey: ['postComments', postId],
        queryFn: () => MyPostService.getPostCommnets(postId),
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        },
        enabled: !!postId
    })

    const comments = data?.data

    return { comments, isLoading, error }
}
