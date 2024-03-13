import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { MyPostService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'

type ParamsType = {
  handleClose: () => void
  postId: number
}

export const useEditPost = ({ handleClose, postId }: ParamsType) => {
  const queryClient = useQueryClient()
  const onOpen = useSnackbar(state => state.onOpen)

  const { mutate } = useMutation({
    mutationFn: ({ data, postId }: { data: Record<'description', string>; postId: number }) =>
      MyPostService.editPost(postId, data),
    onError: (error: AxiosError<{ message: string }>) => {
      onOpen(error.message, 'danger', 'left')
    },
    onSuccess: () => {
      onOpen('Your changes are saved', 'success', 'left')
      handleClose()
      queryClient.invalidateQueries(['post', postId])
    },
    retry: false,
  })

  const saveChanges = (data: Record<'description', string>) => {
    mutate({ data, postId })
  }

  return { saveChanges }
}
