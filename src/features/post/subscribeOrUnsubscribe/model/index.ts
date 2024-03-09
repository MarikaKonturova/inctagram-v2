import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'

export const useSubscribeOrUnsubscribe = (selectedUserId: number) => {
  const onOpen = useSnackbar(state => state.onOpen)
  const queryClient = useQueryClient()
  const { mutate: subscribeOrUnsubscribe } = useMutation({
    mutationFn: () => ProfileService.subscribeOrUnsubscribe(selectedUserId),
    onError: () => {
      onOpen('Error while toggling follow/unfollow', 'danger', 'right')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['publicationsData'])
      onOpen('You have follow/unfollow', 'success', 'right')
    },
  })

  return { subscribeOrUnsubscribe }
}
