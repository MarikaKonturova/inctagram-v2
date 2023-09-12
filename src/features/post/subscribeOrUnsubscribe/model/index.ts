import { useMutation } from '@tanstack/react-query'
import { ProfileService } from 'shared/api'

export const useSubscribeOrUnsubscribe = (userId: string) => {
    // const queryClient = useQueryClient()

    const { mutate: subscribeOrUnsubscribe } = useMutation({
        mutationFn: () => ProfileService.subscribeOrUnsubscribe(userId),
        onSuccess: async () => {
            // TODO:  улучшить код (см. доп задачи Jira) по апдейту информации о юзере (setQueryData)
            // await queryClient.invalidateQueries(['post']).then((res) => { })
        }
    })
    return { subscribeOrUnsubscribe }
}
