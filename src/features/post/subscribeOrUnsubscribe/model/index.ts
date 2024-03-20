import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { ProfileService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'

export const useSubscribeOrUnsubscribe = (
  selectedUserId: number,
  userName: string | undefined,
  isFollowed: boolean | undefined
) => {
  const { t } = useTranslation('profile')
  const onOpen = useSnackbar(state => state.onOpen)
  const queryClient = useQueryClient()
  const { mutate: subscribeOrUnsubscribe } = useMutation({
    mutationFn: () => ProfileService.subscribeOrUnsubscribe(selectedUserId),
    onError: () => {
      onOpen('Error while toggling follow/unfollow', 'danger', 'right')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['publicationsData'])
      onOpen(
        `${isFollowed ? t('youHaveUnfollowed') : t('youHaveFollowed')} ${userName}!`,
        'success',
        'right'
      )
    },
  })

  return { subscribeOrUnsubscribe }
}
