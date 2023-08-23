import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MyPostService } from 'shared/api/post/myPostService'

interface Args {
    handleClose: () => void
}

export const useCreateMutation = ({ handleClose }: Args) => {
    const queryClient = useQueryClient()

    const { mutate, isSuccess } = useMutation({
        mutationFn: MyPostService.createNewPost,
        retry: false,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['post'])
        }
    })
    const onCreate = mutate
    return { onCreate, isSuccess }
}
