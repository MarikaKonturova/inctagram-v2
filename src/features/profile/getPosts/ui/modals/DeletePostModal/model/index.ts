import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MyPostService } from 'shared/api'

interface Args {
  handleClose: () => void
  postId: number
}

export const useDeleteMutation = ({ handleClose, postId }: Args) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => MyPostService.deletePost(postId),
    onSuccess: async () => {
      handleClose()
      await queryClient.invalidateQueries(['post'])
    },
    retry: false,
  })
  const onDelete = () => {
    mutate()
  }

  return { onDelete }
}
