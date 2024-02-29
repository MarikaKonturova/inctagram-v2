import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'
import { useSnackbar } from 'shared/hooks'

export const useCreatePassword = () => {
  const queryClient = useQueryClient()
  const { push } = useRouter()
  const onOpen = useSnackbar(state => state.onOpen)

  const {
    isError,
    isLoading,
    mutate: createPassword,
  } = useMutation({
    mutationFn: AuthService.createPassword,
    onError: () => {
      void push({ pathname: AppRoutes.AUTH.VERIFICATION })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['me']).then(res => {
        void push({ pathname: AppRoutes.AUTH.LOGIN })
      })
    },
  })

  return { createPassword, isError, isLoading }
}
