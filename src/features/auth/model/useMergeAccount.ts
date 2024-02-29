import { useMutation } from '@tanstack/react-query'
import { useAuth } from 'features/auth/model/useAuth'
import { useRouter } from 'next/router'
import { $api } from 'shared/api/api'
import { AppRoutes } from 'shared/constants/path'

const externalAccount = {
  cancelMergeAccounts(code: string) {
    return $api.post('/auth/reject-adding-external-account', { confirmationCode: code })
  },
  confirmMergeAccounts(code: string) {
    return $api.post('/auth/confirm-external-account', { confirmationCode: code })
  },
}

export const useMergeAccount = () => {
  const { push } = useRouter()

  const { setPopUpForMerge } = useAuth()
  const { isLoading: isLoadingConfirm, mutate: confirmMerge } = useMutation({
    mutationFn: externalAccount.confirmMergeAccounts,
    onError: () => {
      setPopUpForMerge(true, 'Something went wrong')
    },
    onSuccess: data => {
      localStorage.setItem('token', data.data?.accessToken)
      setPopUpForMerge(true, 'You have successfully added an additional account.')
      setTimeout(() => push(AppRoutes.AUTH.LOGIN), 2000)
    },
  })

  const { isLoading: isLoadingCancel, mutate: cancelMerge } = useMutation({
    mutationFn: externalAccount.cancelMergeAccounts,
    onError: () => {
      setPopUpForMerge(true, 'Something went wrong')
    },
    onSuccess: () => {
      setPopUpForMerge(
        true,
        'You have successfully canceled adding an additional account.After a couple ' +
          'of seconds you will be automatically redirected to the login page'
      )
      setTimeout(() => push(AppRoutes.AUTH.LOGIN), 2000)
    },
  })

  const isLoading = isLoadingCancel || isLoadingConfirm

  return { cancelMerge, confirmMerge, isLoading }
}
