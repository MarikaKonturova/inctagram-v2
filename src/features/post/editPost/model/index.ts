import { useMutation } from '@tanstack/react-query'
import { MyPostService } from 'shared/api'

export const useEditPost = (postId: number) => {
  const { mutate } = useMutation({
    mutationFn: ({ data, postId }: { data: Record<'description', string>; postId: number }) =>
      MyPostService.editPost(postId, data),
    retry: false,
  })

  const saveChanges = (data: Record<'description', string>) => {
    mutate({ data, postId })
  }

  return { saveChanges }
}
