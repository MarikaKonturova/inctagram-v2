import { useMutation } from '@tanstack/react-query'
import { ProfileService } from 'shared/api'

export const useSubscribeOrUnsubscribe = (userId: string) => {
  const { mutate: subscribeOrUnsubscribe } = useMutation({
    mutationFn: () => ProfileService.subscribeOrUnsubscribe(userId),
    onSuccess: async () => {},
  })

  return { subscribeOrUnsubscribe }
}
