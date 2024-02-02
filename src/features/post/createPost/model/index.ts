import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MyPostService } from 'shared/api'

interface Args {
  handleClose: () => void
}

export const useCreateMutation = ({ handleClose }: Args) => {
  const queryClient = useQueryClient()

  const { isSuccess, mutate } = useMutation({
    mutationFn: MyPostService.createNewPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['post'])
    },
    retry: false,
  })
  const onCreate = mutate

  return { isSuccess, onCreate }
}
