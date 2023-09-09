import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'widgets/SnackBar/model/store/snackbarStore'
import { UsersService } from 'shared/api/users'

export const useAddToFavouritesPost = () => {
    const queryClient = useQueryClient()
    const onOpen = useSnackbar((state) => state.onOpen)

    const { mutate: addToFavourites } = useMutation({
        mutationFn: (postId: number) => UsersService.addToFavourites(postId),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['post'])
        },
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        }
    })
    return { addToFavourites }
}
