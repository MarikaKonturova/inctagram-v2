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
        retry: false,
        onSuccess: async () => {
            handleClose()
            await queryClient.invalidateQueries(['post'])
        }
    })
    const onDelete = () => { mutate() }

    return { onDelete }
}
