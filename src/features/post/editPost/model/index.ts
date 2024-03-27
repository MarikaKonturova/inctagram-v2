import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { MyPostService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'
import { useSnackbar } from 'shared/hooks'

type ParamsType = {
  handleClose: () => void
  postId: number
}

export const useEditPost = ({ handleClose, postId }: ParamsType) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const onOpen = useSnackbar(state => state.onOpen)

  const { isSuccess, mutate } = useMutation({
    mutationFn: ({ data, postId }: { data: Record<'description', string>; postId: number }) =>
      MyPostService.editPost(postId, data),
    onError: (error: AxiosError<{ message: string }>) => {
      onOpen(error.message, 'danger', 'left')
    },
    onSuccess: () => {
      onOpen('Your changes are saved', 'success', 'left')
      handleClose()
      queryClient.invalidateQueries(['post', postId])
      router.push(`${AppRoutes.PROFILE.MY_PROFILE}/?postId=${postId}`)
    },
    retry: false,
  })

  const saveChanges = (data: Record<'description', string>) => {
    mutate({ data, postId })
  }

  return { isSuccess, saveChanges }
}
