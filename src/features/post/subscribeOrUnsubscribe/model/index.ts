import { useMutation } from '@tanstack/react-query'
import { profileService } from 'shared/api/profile'

export const useSubscribeOrUnsubscribe = (userId: string) => {
    // const queryClient = useQueryClient()

    const { mutate: subscribeOrUnsubscribe } = useMutation({
        mutationFn: () => profileService.subscribeOrUnsubscribe(userId),
        onSuccess: async () => {
            // TODO:  улучшить код (см. доп задачи Jira) по апдейту информации о юзере (setQueryData)
            // await queryClient.invalidateQueries(['post']).then((res) => { })
        }
    })
    return { subscribeOrUnsubscribe }
}
