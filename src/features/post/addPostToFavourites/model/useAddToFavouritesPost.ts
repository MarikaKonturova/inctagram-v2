import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'widgets/SnackBar/model/store/snackbarStore'
import { UsersService } from 'shared/api/users'

export const useAddToFavouritesPost = (postId: number) => {
    const onOpen = useSnackbar((state) => state.onOpen)

    const { mutate: addToFavourites } = useMutation({
        mutationFn: () => UsersService.addToFavourites(postId),
        onSuccess: async () => {
        },
        onError: (error: AxiosError<{ message: string }>) => {
            onOpen(error.message, 'danger', 'left')
        }
    })
    return { addToFavourites }
}
