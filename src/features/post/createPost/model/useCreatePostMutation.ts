import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MyPostService } from 'shared/api'

interface Args {
  onSuccess: () => void
}

export const useCreatePostMutation = ({ onSuccess }: Args) => {
  const queryClient = useQueryClient()

  const { isSuccess, mutate } = useMutation({
    mutationFn: MyPostService.createNewPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['post', 'getProfileData'])
      onSuccess()
    },
    retry: false,
  })
  const onCreate = mutate

  return { isSuccess, onCreate }
}
