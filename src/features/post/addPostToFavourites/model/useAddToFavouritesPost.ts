import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useSnackbar } from 'features/common'
import { UsersService } from 'shared/api'

export const useAddToFavouritesPost = () => {
  const queryClient = useQueryClient()
  const onOpen = useSnackbar(state => state.onOpen)

  const { mutate: addToFavourites } = useMutation({
    mutationFn: (postId: number) => UsersService.addToFavourites(postId),
    onError: (error: AxiosError<{ message: string }>) => {
      onOpen(error.message, 'danger', 'left')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['post'])
    },
  })

  return { addToFavourites }
}
