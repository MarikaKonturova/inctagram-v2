import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { UsersService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'

export const useAddToFavouritesPost = () => {
  const queryClient = useQueryClient()
  const onOpen = useSnackbar(state => state.onOpen)

  const { isLoading, mutate: addToFavourites } = useMutation({
    mutationFn: (postId: number) => UsersService.addToFavourites(postId),
    onError: (error: AxiosError<{ message: string }>) => {
      onOpen(error.message, 'danger', 'left')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['post'])
      await queryClient.invalidateQueries(['publicationsData'])
    },
  })

  return { addToFavourites, isLoading }
}
