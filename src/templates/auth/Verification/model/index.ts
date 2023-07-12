import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'widgets/SnackBar/model/store/snackbarStore'
import { useAuth } from 'features/auth'
import { SelectSetEmail } from 'features/auth/model/selectors'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/config/routeConfig/path'
import { confirmEmailLink } from 'shared/constants/confirm-email'
import { useModal } from 'shared/hooks/useModal'
import { routerPush } from 'shared/lib/routerPush/routerPush'

export const useResendEmailMutation = () => {
    const [emailInLocalStorage, setEmailInLocalStorage] = useState('')
    const setEmail = useAuth(SelectSetEmail)
    const onOpen = useSnackbar((state) => state.onOpen)
    const { setIsOpen } = useModal()

    const { mutate: resendEmail } = useMutation(AuthService.resendEmail, {
        mutationKey: ['resendEmail'],
        onSuccess: () => {
            routerPush(AppRoutes.AUTH.LOGIN)
            setIsOpen(true)
        },
        onError: () => {
            onOpen('Email already confirmed or doesnt exist', 'danger', 'left')
            // routerPush(AppRoutes.AUTH.FORGOT_PASSWORD)
        }
    })

    const verifyEmailHandler = () => {
        if (emailInLocalStorage) {
            setEmail(emailInLocalStorage)
            resendEmail({ email: emailInLocalStorage })
        }
    }

    useEffect(() => {
        setEmailInLocalStorage(localStorage.getItem('email') || '')
    }, [])

    return { verifyEmailHandler }
}
