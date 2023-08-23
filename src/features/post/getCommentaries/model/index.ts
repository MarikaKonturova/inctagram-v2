import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'widgets/SnackBar/model/store/snackbarStore'
import { MyPostService } from 'shared/api/post/myPostService'

export const useGetPostComments = (postId: number) => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const { isLoading, error, data } = useQuery({
        queryKey: ['postComments'],
        queryFn: () => MyPostService.getPostCommnets(postId),
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        }
    })

    const comments = data?.data

    return { comments, isLoading, error }
}
