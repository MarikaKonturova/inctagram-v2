import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'widgets/SnackBar/model/store/snackbarStore'
import { useAuth } from 'features/auth'
import { SelectSetEmail } from 'features/auth/model/selectors'
import { AuthService } from 'shared/api/auth/authService'
import { AppRoutes } from 'shared/constants/routePath'
import useLocale from 'shared/hooks/useLocale'
import { useModal } from 'shared/hooks/useModal'

export const useResendEmailMutation = () => {
    const [emailInLocalStorage, setEmailInLocalStorage] = useState('')
    const setEmail = useAuth(SelectSetEmail)
    const onOpen = useSnackbar((state) => state.onOpen)
    const { setIsOpen } = useModal()
    const { push, query, asPath } = useRouter()
    const { locale } = useLocale()

    const { mutate: resendEmail } = useMutation(AuthService.resendEmail, {
        mutationKey: ['resendEmail'],
        onSuccess: () => {
            void push({ pathname: AppRoutes.AUTH.LOGIN, query }, asPath, { locale })
            setIsOpen(true)
        },
        onError: () => {
            onOpen('Email already confirmed or doesnt exist', 'danger', 'left')
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
