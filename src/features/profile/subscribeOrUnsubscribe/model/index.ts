import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { ProfileService } from 'shared/api'
import { useSnackbar } from 'shared/hooks'

interface ParamsType {
  isFollowing: boolean
  onSuccessCallback?: () => void
  userId: number
  userName: string
}

export const useSubscribeOrUnsubscribe = ({ isFollowing, userId, userName }: ParamsType) => {
  const { t } = useTranslation('profile')
  const onOpen = useSnackbar(state => state.onOpen)
  const queryClient = useQueryClient()

  const { mutate: subscribeOrUnsubscribe } = useMutation({
    mutationFn: () => ProfileService.subscribeOrUnsubscribe(userId),
    onError: () => {
      onOpen('Error while toggling follow/unfollow', 'danger', 'right')
    },
    onSuccess: async () => {
      onOpen(
        `${isFollowing ? t('youHaveUnfollowed') : t('youHaveFollowed')} ${userName}!`,
        'success',
        'right'
      )
      await queryClient.invalidateQueries(['publicationsData'])
      await queryClient.invalidateQueries(['getProfileData'])
      await queryClient.invalidateQueries(['userByName'])
    },
  })

  return { subscribeOrUnsubscribe }
}
