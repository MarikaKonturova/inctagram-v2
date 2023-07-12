import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'widgets/SnackBar/model/store/snackbarStore'
import { MyPostService } from '../../../../shared/api/post/myPostService'

export const useDeleteMyPost = (postId: string) => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const { mutate: deletePost } = useMutation({
        mutationFn: () => MyPostService.delete(postId),
        onSuccess: async () => {
        },
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        }
    })
    return { deletePost }
}
